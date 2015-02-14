(ns om-crud.core
  (:require [cljs.reader :as reader]
            [goog.events :as events]
            [goog.dom :as gdom]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
  (:import [goog.net XhrIo]
           goog.net.EventType
           [goog.events EventType]))

;; TODO replace :fullname with something more general perhaps

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
  (atom {:entities []}))

(defn display [show]
  (if show
    #js {}
    #js {:display "none"}))

(defn handle-change [e data edit-key owner]
  (om/transact! data edit-key (fn [_] (.. e -target -value))))

(defn end-edit [text owner cb]
  (om/set-state! owner :editing false)
  (cb text))

(defn on-delete [uri]
  (edn-xhr
    {:method :delete
     :url (str "entity/delete")
     :data {:uri uri}
     :on-complete
     (fn [res]
       (println "server response:" res))}))

(defn editable [data owner {:keys [edit-key uri on-edit] :as opts}]
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
            "Edit")
          (dom/button
            #js {:onClick #(on-delete uri)}
            "X"))))))

(defn on-edit [uri fullname]
  (edn-xhr
    {:method :put
     :url (str "entity/update")
     :data {:uri uri :fullname fullname}
     :on-complete
     (fn [res]
       (println "server response:" res))}))

(defn entities-view [app owner]
  (reify
    om/IWillMount
    (will-mount [_]
      (edn-xhr
        {:method :get
         :url "entities"
         :on-complete #(om/transact! app :entities (fn [_] %))}))
    om/IRender
    (render [_]
      (dom/div #js {:id "entities"}
        (dom/h2 nil "Entities")
        (apply dom/ul nil
          (map
            (fn [entity]
              (let [uri (:uri entity)]
                (om/build editable entity
                  {:opts {:edit-key :fullname
                          :uri uri
                          :on-edit #(on-edit uri %)}})))
            (:entities app)))))))

(om/root entities-view app-state
  {:target (gdom/getElement "entities")})

