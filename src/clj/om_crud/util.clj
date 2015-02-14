(ns om-crud.util
  (:require [om-crud.rdf :as co]
            [clojure.java.io :as io]
            [clojure.tools.logging :as log])
  (:import (com.hp.hpl.jena.tdb TDBFactory)
           (java.io PushbackReader)
           (com.hp.hpl.jena.query ReadWrite)))

(defn load-config [filename]
  (with-open [r (io/reader filename)]
    (read (java.io.PushbackReader. r))))

(def configuration (load-config "resources/data/configuration.clj"))
(def directory (configuration :directory ))

;; uri for some random resources
(def uri "http://example.com/JohnSmith")
(def uri2 "http://example.com/MarkusBa")
(def uri3 "http://example.com/JohnDoe")

;; the dataset we are operating on
(def ds (TDBFactory/createDataset directory))

(defn init-db []
  (do
    (log/info "importing data")
    ;; starts the transaction
    (.begin ds (ReadWrite/WRITE))
    ;; get the model to work with
    (let [model (.getDefaultModel ds)
          rs (co/create-resource model uri)
          rs2 (co/create-resource model uri2)
          rs3 (co/create-resource model uri3)
          pro (co/create-property model "http://www.example.com/" "fullname")]
        ;; add the property to the resorce with some object
        (co/add-object rs pro "John Smith")
        (co/add-object rs2 pro "Markus Ba")
        (co/add-object rs3 pro "John Doe")
    (.commit ds)
    (.end ds))))

(defn test-logging[]
  (log/error "test"))

(comment
  ;; quick test
  (require '[om-crud.rdf :as co])
  (import '[com.hp.hpl.jena.tdb TDBFactory])
  (def directory "/home/markus/tdb")
  (def qs "select ?s ?p ?o where { ?s ?p ?o }")
  (def ds (TDBFactory/createDataset directory))
  (def model (.getDefaultModel ds))
  (def result (co/select-query model qs))
  (.getValue (:o (first result)))
  (require '[om-crud.rdf :as rdf])
  (def r (rdf/get-resource model "http://example.com/JohnDoe"))
  (rdf/remove-resource model r)

)
