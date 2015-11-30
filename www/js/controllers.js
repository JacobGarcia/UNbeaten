(function () {
     var app = angular.module('myApp', ['onsen.directives', 'ngAnimate']);
    /* Angularn controller for lists logic */
    app.controller('MyCtrl', function ($scope) {
        $scope.groups = [];

        for (var i = 0; i < categories.length; i++) {
            $scope.groups[i] = {
                name: i,
                items: []
            };
            /* Categories */
            $scope.groups[0] = {
                name: "Unbeaten",
                items: []
            };

            $scope.groups[1] = {
                name: "Not 100%",
                items: []
            };

            $scope.groups[2] = {
                name: "Unplayed",
                items: []
            };

            $scope.groups[3] = {
                name: "Unbeatable",
                items: []
            };

            for (var i = 0; i < $scope.groups.length; i++) {
                for (var j = 0; j < 2; j++) {
                    $scope.groups[i].items.push(i + "-" + j);
                }
            }

            /* Set Unbeaten category as default list open */
            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

            /* Show the first group */
            $scope.shownGroup = $scope.groups[0];
            $isFirstTime = false;
        }

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function (group) {

            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function (group) {

            return $scope.shownGroup === group;
        }
    });
    
    app.controller('NotificationController', function ($scope, $compile) {
        $scope.alert = function () {
            ons.notification.alert({
                message: 'An error has occurred!'
            });
        }
        $scope.confirm = function () {
            ons.notification.confirm({
                title: "Load Photo",
                cancelable: true,
                message: 'You want to load a photo from your library?',
                callback: function (idx) {
                    switch (idx) {
                    case 1:
                        navigator.camera.getPicture(
                            camaraSuccess, errorDB, {
                                quality: 100,
                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                allowEdit: false,
                                encodingType: Camera.EncodingType.PNG,
                                saveToPhotoAlbum: false
                            });
                        break;
                    default:
                        break;
                    }
                }
            });
        }

        $scope.prompt = function () {
            ons.notification.prompt({
                message: "Please enter your age",
                callback: function (age) {
                    ons.notification.alert({
                        message: 'You are ' + parseInt(age || 0) + ' years old.'
                    });
                }
            });
        }

        $scope.load = function () {
            ons.notification.alert({
                message: 'An error has occurred!'
            });
        }
    });
})();