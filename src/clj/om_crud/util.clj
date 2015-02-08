(ns om-crud.util
  (:require [om-crud.rdf :as co]
            [clojure.tools.logging :as log])
  (:import (com.hp.hpl.jena.tdb TDBFactory)
           (com.hp.hpl.jena.query ReadWrite)))

(def directory "/home/markus/tdb")
;; uri for some random resources
(def uri "http://example.com/JohnSmith")
(def uri2 "http://example.com/MarkusBa")
(def uri3 "http://example.com/JohnDoe")

;; the dataset we are operating on
(def ds (TDBFactory/createDataset directory))

(defn init-db []
  (do
    (log/error "something,something,dark side")
    ;; starts the transaction
    (.begin ds (ReadWrite/WRITE))
    ;; get the model to work with
    (let [model (.getDefaultModel ds)
          rs (co/create-resource model uri)
          rs2 (co/create-resource model uri2)
          rs3 (co/create-resource model uri3)
          pro (co/create-property model "http://www.example.com" "fullname")]
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
