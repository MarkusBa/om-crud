(ns om-crud.core
  (:require [ring.util.response :refer [file-response]]
            [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.edn :refer [wrap-edn-params]]
            [compojure.core :refer [defroutes GET PUT DELETE]]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [clojure.tools.logging :as log]
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

(defn all-rdf []
  (let [sth (.begin ds (ReadWrite/READ))
        model (.getDefaultModel ds)
        qs "select ?s ?p ?o where { ?s ?p ?o }"
        entities (co/select-query model qs)]
    (.commit ds)
    (.end ds)
    entities))

;;{:p #<ResourceImpl http://www.example.comfullname>, :s #<ResourceImpl http://example.com/JohnSmith>, :o #<LiteralImpl John Smith>}
(defn flatten-rdf-triple [triple]
  (let [uri (.getURI (:s triple))
        fullname (.getValue (:o triple))]
    {:uri uri, :fullname fullname}))

(defn entities []
  (generate-response (vec (map flatten-rdf-triple (all-rdf)))))

(defn update
  "Receives {:uri 'http://www.example.com/something' :key 'Value'}"
  [{:keys [uri] :as params}]
  (do
    (.begin ds (ReadWrite/WRITE))
    (let [model (.getDefaultModel ds)
          params-to-iterate (dissoc params :uri)
          rs (co/get-resource model uri)]
      (doseq [keyval params-to-iterate]
        ;;keyval might be [:fullname "Albert Einstein"]
        (let [pro (co/get-property model "http://www.example.com" (name (first keyval)))]
          (co/update-property rs pro (second keyval))))
    (.commit ds)
    (.end ds))))

(defn update-entity [params]
  (update params)
  (generate-response {:status :ok}))

(defn delete [{:keys [uri] :as params}]
  (do
    (.begin ds (ReadWrite/WRITE))
    (let [model (.getDefaultModel ds)
          rs (co/get-resource model uri)]
        (co/remove-resource model rs)
    (.commit ds)
    (.end ds))))

(defn delete-entity [params]
  (delete params)
  (generate-response {:status :ok}))

(defroutes routes
  (GET "/" [] (index))
  (GET "/entities" [] (entities))
  (PUT "/entity/update"
    {params :params edn-params :edn-params}
    (update-entity edn-params))
  (DELETE "/entity/delete"
    {params :params edn-params :edn-params}
    (delete-entity edn-params))
  (route/files "/" {:root "resources/public"}))

(def app
  (-> routes
      wrap-edn-params))

(defonce server
  (run-jetty #'app {:port 8080 :join? false}))

