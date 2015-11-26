
ons.bootstrap();
var app = angular.module('myApp', ['onsen', 'ngAnimate']);

ons.ready(function(){
  myNavigator.on('postpush', function(e){
  document.getElementById("detail_image").style.background = "url('images/default4.png') white no-repeat fixed" ;
  document.getElementById("detail_image").style.backgroundSize = "100% 49%" ;
  document.getElementById("detail_image").style.backgroundPosition = "top top, top, top" ;
  });
});

app.controller('NotificationController', function($scope, $compile) {
  $scope.alert = function() {
    ons.notification.alert({message: 'An error has occurred!'});
  }
  $scope.confirm = function() {
    ons.notification.confirm({
      title: "Load Photo",
      cancelable: true,
      message: 'You want to load a photo from your library?',
      callback: function(idx) {
        switch(idx) {
          case 1:
      navigator.camera.getPicture(
        camaraSuccess, errorDB, {quality: 100, destinationType: Camera.DestinationType.FILE_URI, sourceType: Camera.PictureSourceType.PHOTOLIBRARY, allowEdit : false, encodingType: Camera.EncodingType.PNG, saveToPhotoAlbum : false});
            break;
            default:
            break;
        }
      }
    });
  }

    $scope.prompt = function() {
      ons.notification.prompt({
        message: "Please enter your age",
        callback: function(age) {
          ons.notification.alert({
            message: 'You are ' + parseInt(age || 0) + ' years old.'
          });
        }
      });
    }

    $scope.load = function() {
    ons.notification.alert({message: 'An error has occurred!'});
  }
  });

/* 
* variables de la aplicación
*/
  var existeDB;
  var db;

function onBodyLoad(){
  alert("onBodyLoad");
  document.addEventListener("deviceready", onDeviceReady, false);
 
}

function onDeviceReady(){
  alert("Aplication ready!");

  existeDB = window.localStorage.getItem("existeDB");
    db = window.openDatabase("videogame", "1.0", "Database for local videogames list", 200000);
    if(existeDB == null){
      creaDB();
    }else{
      cargaDatos();
    }
    

}

/* Angular controller for lists logic */
app.controller('MyCtrl', function($scope) {
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

    for(var i = 0; i < $scope.groups.length; i++){
      for (var j = 0; j < 2; j++) {
        $scope.groups[i].items.push(i + '-' + j);
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

  angular.module('details', []).run(['$http', '$q', function ($http, $q) {

   // any code you want to run on app start/refresh, using any dependencies you've injected
}]);


    
/* 
* creación de ña base de datos
*/
function creaDB(){
  db.transaction(creaNuevaDB, errorDB, creaSuccess);
  
}


function creaNuevaDB(tx){
  alert("Creating data base");
  
  tx.executeSql('DROP TABLE IF EXISTS videogame');
  
  var sql = "CREATE TABLE IF NOT EXISTS videogame ( "+
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name VARCHAR(120), " +
    "players TINYINT, " +
    "genres VARCHAR(100), " +
    "release_date DATE, " +
    "platform VARCHAR(50), " + 
    "developer VARCHAR(50), " +
    "time_playing VARCHAR(8), " +
     "complete_time VARCHAR(8), " +
     "notes TEXT, " +
     "rating FLOAT, " + 
     "banner VARCHAR(150), "
     "date_added TIMESTAMP), " + 
     "category VARCHAR(50));";
    
  tx.executeSql(sql);
  
  tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer, time_playing, complete_time, notes, rating, banner, date_added) VALUES (1,'José','Pérez','+34566222666','amigo','','paco@paco.com');");
  
}

function creaSuccess(){
  window.localStorage.setItem("existeDB", 1);
  cargaDatos();
}

function errorDB(err){
  alert("Error processing SQL " + err.code);
}

/* 
* carga de datos desde la base de datos
*/
function cargaDatos(){
  db.transaction(cargaRegistros, errorDB);
}

function cargaRegistros(tx){
  alert("Loading registers from the database");
  tx.executeSql('SELECT * FROM videogame;', [], cargaDatosSuccess, errorDB);
}

function cargaDatosSuccess(tx, results){
  alert("Recieved " + results.rows.length + " from the DB");
  if(results.rows.length == 0){
    alert("There are no registers in the DB");
  }
  
   for(var i=0; i<results.rows.length; i++){
    var game = results.rows.item(i);
    $scope.groups[category].items.push(game);
    var foto = game.banner;
    if(foto == ""){
      foto = "assets/no_foto.png";
    }
    document.getElementById("name").innerHTML = game.name;
    document.getElementById("image").src = game.banner;
    document.getElementById("platform").innerHTML = game.platform;
    document.getElementById("date_added").innerHTML = game.date_added;
  }

}


  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {

    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };

  $scope.isGroupShown = function(group) {

     return $scope.shownGroup === group;
    }
  });

/* Database management */

function camaraSuccess(imageURL){
  $("#detail_image").style.background = "url('" + imageURL + "') white no-repeat fixed" ;
  $.imageURL = imageURL;
   document.getElementById("image").src = imageURL;
}

function onPageInsertGame(){
  alert("Page Insert");
  alert($("#detail_image").val());
   //document.getElementById("detail_image").style.background = "url('images/default4.png') white no-repeat fixed" ;
  /*document.getElementById("detail_image").style.backgroundSize = "auto 100%" ;
  document.getElementById("detail_image").style.backgroundPosition = "center center, center top" ;*/
  document.getElementById("detail_image").style.backgroundSize = "100% 52%" ;
  document.getElementById("detail_image").style.backgroundPosition = "top top, top, top" ;
}

function NotificationController($scope){
  angular.element(document).ready(function(){ alert("Notification");});
}

$(document).on("pagebeforeshow", "#addgame.html", function(){
  alert("THIS IS AN ALERT");
});

