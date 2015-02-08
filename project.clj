(defproject om-crud "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :jvm-opts ^:replace ["-Xmx1g" "-server"]

  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-2173"]
                 [org.apache.jena/jena-core "2.12.1" :exclusions [[org.slf4j/slf4j-log4j12] [log4j/log4j]]]
                 [org.apache.jena/jena-tdb "1.1.1" :exclusions [[org.slf4j/slf4j-log4j12] [log4j/log4j]]]
                 [ring/ring "1.2.1"]
                 [org.clojure/core.async "0.1.267.0-0d7780-alpha"]
                 [om "0.5.3"]
                 [compojure "1.1.6"]
                 [fogus/ring-edn "0.2.0"]
                 [org.clojure/tools.logging "0.2.3"]
                 [com.datomic/datomic-free "0.9.4699"]]

  :plugins [[lein-cljsbuild "1.0.2"] [lein-deps-tree "0.1.2"]]

  :source-paths ["src/clj" "src/cljs"]
  :resource-paths ["resources"]

  :cljsbuild {
    :builds [{:id "dev"
              :source-paths ["src/clj" "src/cljs"]
              :compiler {
                :output-to "resources/public/js/main.js"
                :output-dir "resources/public/js/out"
                :optimizations :none
                :source-map true}}]})

;;:exclusions [org.slf4j/log4j-over-slf4j]
