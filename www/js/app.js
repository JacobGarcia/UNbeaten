/* This is used to check if the database in the application context */
var existsDB;

/* Define app as an angular module including onsenui and a framework of angular animations */
(function () {
    var app = angular.module('myApp', ['onsen.directives', 'ngAnimate']);
    /* OnDeviceReady definition including bootstrap of the application*/
    document.addEventListener('deviceready', function () {

        alert("The device is OnReady!");

        existsDB = window.localStorage.getItem("existsDB");
        db = window.openDatabase("unbeatendb", "1.0", "Database for local videogames list", 200000);

                
        function prueba(){
            createDB();
            return true;
        }

        if (existsDB === null) {
            prueba().then(bootstrapApplication());
        } else {
            loadData();
        }

        function bootstrapApplication() {
            angular.bootstrap(document, ['myApp']);
            alert("Bootstrap!");
        }

    }, false);
})();
