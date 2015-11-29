/* Define app as an angular module including onsenui and a framework of angular animations */
(function () {
    var app = angular.module('myApp', ['onsen.directives','ngAnimate']);

    /* OnDeviceReady definition including bootstrap of the application*/
    document.addEventListener('deviceready', function () {
        angular.bootstrap(document, ['myApp']);
        alert("Bootstrap!");
    }, false);

    app.factory('Data', function () {
        var Data = {};
        Data.items = ['aa', 'bb', 'cc'];
        return Data;
    });

    /* Angular controller for lists logic */
    app.controller('Page1Ctrl', function ($scope, Data) {
        $scope.items = Data.items;

        $scope.next = function () {
            alert("Page being pushed");
            $scope.ons.navigator.pushPage('addgame.html', {
                animation: 'simpleslide'
            });
        };
    });
})();