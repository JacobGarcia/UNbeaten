/* This is used to check if the database in the application context */
var existeDB;

/* Define app as an angular module including onsenui and a framework of angular animations */
(function () {
    var app = angular.module('myApp', ['onsen.directives', 'ngAnimate']);

    /* OnDeviceReady definition including bootstrap of the application*/
    document.addEventListener('deviceready', function () {
        var existeDB;
        var db;
        alert("The device is OnReady!");

        function prueba() {
            alert("prueba!");
        }

        existeDB = window.localStorage.getItem("existeDB");
        db = window.openDatabase("videogame", "1.0", "Database for local videogames list", 200000);


        if (existeDB === null) {
            prueba();
        } else {
            cargaDatos();
        }
    
        angular.bootstrap(document, ['myApp']);
        alert("Bootstrap!");
    }, false);
})();