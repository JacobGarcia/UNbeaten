/* Define app as an angular module including onsenui and a framework of angular animations */
(function () {
    var app = angular.module('myApp', ['onsen.directives', 'ngAnimate']);

    /* OnDeviceReady definition including bootstrap of the application*/
    document.addEventListener('deviceready', function () {
       /* var existeDB;
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
*/     
        angular.bootstrap(document, ['myApp']);
        alert("Bootstrap!");
    }, false);

    /* Angular controller for lists logic */
    app.controller('MyCtrl', function ($scope) {
        $scope.groups = [];

        for (var i = 0; i < 4; i++) {
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

/* Bootstrap OnsenUI Framework */
ons.bootstrap();


ons.ready(function () {
    myNavigator.on('postpush', function (e) {
        document.getElementById("detail_image").style.background = "url('images/default4.png') white no-repeat fixed";
        document.getElementById("detail_image").style.backgroundSize = "100% 49%";
        document.getElementById("detail_image").style.backgroundPosition = "top top, top, top";
    });
});



/* 
 * variables de la aplicación
 */
var categories = new Array();
var games = new Array();

function setCategories(categories) {
    this.categories = categories;
}

function pushGame(game) {
    this.games[game.category] = {
        items: []
    };
    this.games[game.category].items.push(game);
    //alert(this.games[game.category].items[0].name);
}

function onBodyLoad() {}

function readToField(results) {

    for (var i = 0; i < results.rows.length; i++) {
        var game = results.rows.item(i);
        pushGame(game);
    }
}



/* Database management */

function camaraSuccess(imageURL) {
    $("#detail_image").style.background = "url('" + imageURL + "') white no-repeat fixed";
    $.imageURL = imageURL;
    document.getElementById("image").src = imageURL;
}

function onPageInsertGame() {
    alert("Page Insert");
    alert($("#detail_image").val());
    //document.getElementById("detail_image").style.background = "url('images/default4.png') white no-repeat fixed" ;
    /*document.getElementById("detail_image").style.backgroundSize = "auto 100%" ;
    document.getElementById("detail_image").style.backgroundPosition = "center center, center top" ;*/
    document.getElementById("detail_image").style.backgroundSize = "100% 52%";
    document.getElementById("detail_image").style.backgroundPosition = "top top, top, top";
}

function NotificationController($scope) {
    angular.element(document).ready(function () {
        alert("Notification");
    });
}

$(document).on("pagebeforeshow", "#addgame.html", function () {
    alert("THIS IS AN ALERT");
});


/******** DATABASE LOGIC *************/
/* 
 * creación de ña base de datos
 */
function creaDB() {
    db.transaction(creaNuevaDB, errorDB, creaSuccess);
}

function creaNuevaDB(tx) {

    tx.executeSql('DROP TABLE IF EXISTS videogame');
    tx.executeSql('DROP TABLE IF EXISTS categoria');

    var sql = "CREATE TABLE IF NOT EXISTS videogame ( " +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "name VARCHAR(120), " +
        "players VARCHAR(3), " +
        "genres VARCHAR(100), " +
        "release_date DATETIME, " +
        "platform VARCHAR(10), " +
        "developer VARCHAR(100), " +
        "time_playing VARCHAR(8), " +
        "complete_time VARCHAR(8), " +
        "notes TEXT, " +
        "rating FLOAT, " +
        "banner VARCHAR(150), " +
        "date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
        "category VARCHAR(50), " +
        "FOREIGN KEY(category) REFERENCES categoria(name))";

    var categoriaSql = "CREATE TABLE IF NOT EXISTS categoria ( " +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "name VARCHAR(50))";

    tx.executeSql(categoriaSql);
    tx.executeSql(sql);

    alert("Both tables have been created");

    tx.executeSql("INSERT INTO categoria (id,name) VALUES (1,'Unbeaten')");
    tx.executeSql("INSERT INTO categoria (id,name) VALUES (2,'Not 100%')");
    tx.executeSql("INSERT INTO categoria (id,name) VALUES (3,'Unplayed')");
    tx.executeSql("INSERT INTO categoria (id,name) VALUES (4,'Unbeatable')");

    tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (1,'Silent Hills','No','Horror, Puzzle','2014-08-14 00:00:00','PS4','Kojima Productions','00h:00m','01h:39m','Sample Note',5.0,'http://static.giantbomb.com/uploads/scale_large/0/6087/2669677-2669609-2114550608-fropq.jpg','Unbeaten')");

    tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (2,'Resident Evil','No','Action-Adventure','1996-03-22 00:00:00','PS1','Capcom','00h:00m','06h:37m','Test',4.5,'http://static.giantbomb.com/uploads/scale_large/13/139866/2558376-3273635912-62096.png','Not 100%')");

    tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (3,'The Witcher 3: Wild Hunt','No','Role-Playing','2015-05-19 00:00:00','PC','CD Projekt RED Sp. z o.o.','00h:00m','43h:37m','Wolf Note',4.5,'http://static.giantbomb.com/uploads/scale_large/25/252703/2759851-2015-06-17_00004.jpg','Unplayed')");

    tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (4,'Bishi Bashi Special','Yes','Action','1998-12-31 00:00:00','PS1','Konami Computer Entertainment Sapporo Co., Ltd','00h:00m','01h:53m','Japan',-1.0,'http://static.giantbomb.com/uploads/scale_large/0/1220/213448-bishi_bashi_special_front.jpg','Unbeatable')");

    alert("All INSERTS are ok");

}

function creaSuccess() {
    //window.localStorage.setItem("existeDB", 1);
    cargaDatos();
}

function errorDB(err) {
    alert("Error processing SQL " + err.code);
}

function cargaDatos() {
    db.transaction(cargaRegistros, errorDB);
    db.transaction(loadCategories, errorDB);
}

function cargaRegistros(tx) {
    tx.executeSql('SELECT * FROM videogame;', [], cargaDatosSuccess, errorDB);
}

function loadCategories(tx) {
    tx.executeSql('SELECT * FROM categoria;', [], loadCategoriesSuccess, errorDB);
}

function cargaDatosSuccess(tx, results) {
    alert("Recieved " + results.rows.length + " from the DB");
    if (results.rows.length == 0) {
        alert("There are no registers in the DB");
    }

    window.readToField(results);
}

function loadCategoriesSuccess(tx, results) {
    alert("Recieved " + results.rows.length + " categories from the DB");
    window.setCategories(results.rows);
}