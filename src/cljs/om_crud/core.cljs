(ns om-crud.core
  (:require [cljs.reader :as reader]
            [goog.events :as events]
            [goog.dom :as gdom]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
  (:import [goog.net XhrIo]
           goog.net.EventType
           [goog.events EventType]))

(enable-console-print!)

(def ^:private meths
  {:get "GET"
   :put "PUT"
   :post "POST"
   :delete "DELETE"})

(defn edn-xhr [{:keys [method url data on-complete]}]
  (let [xhr (XhrIo.)]
    (events/listen xhr goog.net.EventType.COMPLETE
      (fn [e]
        (on-complete (reader/read-string (.getResponseText xhr)))))
    (. xhr
      (send url (meths method) (when data (pr-str data))
        #js {"Content-Type" "application/edn"}))))

(def app-state
  (atom {:persons []}))

(defn display [show]
  (if show
    #js {}
    #js {:display "none"}))

(defn handle-change [e data edit-key owner]
  (om/transact! data edit-key (fn [_] (.. e -target -value))))

(defn end-edit [text owner cb]
  (om/set-state! owner :editing false)
  (cb text))

(defn editable [data owner {:keys [edit-key on-edit] :as opts}]
  (reify
    om/IInitState
    (init-state [_]
      {:editing false})
    om/IRenderState
    (render-state [_ {:keys [editing]}]
      (let [text (get data edit-key)]
        (dom/li nil
          (dom/span #js {:style (display (not editing))} text)
          (dom/input
            #js {:style (display editing)
                 :value text
                 :onChange #(handle-change % data edit-key owner)
                 :onKeyPress #(when (== (.-keyCode %) 13)
                                (end-edit text owner on-edit))
                 :onBlur (fn [e]
                           (when (om/get-state owner :editing)
                             (end-edit text owner on-edit)))})
          (dom/button
            #js {:style (display (not editing))
                 :onClick #(om/set-state! owner :editing true)}
            "Edit"))))))

;;TODO: http://www.example.com should not be part of the path
(defn on-edit [uri fullname]
  (edn-xhr
    {:method :put
     :url (str "person/" uri "/update")
     :data {:fullname fullname}
     :on-complete
     (fn [res]
       (println "server response:" res))}))

(defn persons-view [app owner]
  (reify
    om/IWillMount
    (will-mount [_]
      (edn-xhr
        {:method :get
         :url "persons"
         :on-complete #(om/transact! app :persons (fn [_] %))}))
    om/IRender
    (render [_]
      (dom/div #js {:id "persons"}
        (dom/h2 nil "Persons")
        (apply dom/ul nil
          (map
            (fn [person]
              (let [uri (:uri person)]
                (om/build editable person
                  {:opts {:edit-key :fullname
                          :on-edit #(on-edit uri %)}})))
            (:persons app)))))))

(om/root persons-view app-state
  {:target (gdom/getElement "persons")})

