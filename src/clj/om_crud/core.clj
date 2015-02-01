(ns om-crud.core
  (:require [ring.util.response :refer [file-response]]
            [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.edn :refer [wrap-edn-params]]
            [compojure.core :refer [defroutes GET PUT]]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [om-crud.rdf :as co])
  (:import (com.hp.hpl.jena.tdb TDBFactory)
           (com.hp.hpl.jena.query ReadWrite)))

(def directory "/home/markus/tdb")
(def ds (TDBFactory/createDataset directory))

(defn index []
  (file-response "public/html/index.html" {:root "resources"}))

(defn generate-response [data & [status]]
  {:status (or status 200)
   :headers {"Content-Type" "application/edn"}
   :body (pr-str data)})

(defn persons-rdf []
  (let [sth (.begin ds (ReadWrite/READ))
        model (.getDefaultModel ds)
        qs "select ?s ?p ?o where { ?s ?p ?o }"
        persons (co/select-query model qs)]
    (.commit ds)
    (.end ds)
    persons))

;;{:p #<ResourceImpl http://www.example.comfullname>, :s #<ResourceImpl http://example.com/JohnSmith>, :o #<LiteralImpl John Smith>}
(defn flatten-rdf-triple [triple]
  (let [uri (.getURI (:s triple))
        fullname (.getValue (:o triple))]
    {:uri uri, :fullname fullname}))

(defn persons []
  (generate-response (vec (map flatten-rdf-triple (persons-rdf)))))

;; TODO: make general
(defn update [{:keys [uri fullname] :as params}]
  (do
    (.begin ds (ReadWrite/WRITE))
    (let [model (.getDefaultModel ds)
          rs (co/get-resource model uri)
          pro (co/get-property model "http://www.example.com" "fullname")]
        (co/update-property rs pro fullname)
    (.commit ds)
    (.end ds))))

(defn update-person [params]
  (update params)
  (generate-response {:status :ok}))

(defroutes routes
  (GET "/" [] (index))
  (GET "/persons" [] (persons))
  (PUT "/person/update"
    {params :params edn-params :edn-params}
    (update-person edn-params))
  (route/files "/" {:root "resources/public"}))

(def app
  (-> routes
      wrap-edn-params))

(defonce server
  (run-jetty #'app {:port 8080 :join? false}))

