//Define an angular module for our app
var app = angular.module('app', ['ngRoute']);

app.config(
  function($routeProvider) {
    $routeProvider
    .when('/map/:obj', {
        templateUrl: 'views/mapview.html',
        controller: 'MapCtrl',
      })
      .otherwise({
          redirectTo: '/map'
      });
});

app.controller('OptCtrl', function($scope){
    $scope.message = 'All the embassies';
    
    $.getJSON('lib/data.json', function(data){
        var root = data.data;
        for (var i in root){
            dat = root[i].country.eng.name;
            $('.nav').append(
                "<li><a href='#/map/"+i+"'>"+dat+"</a></li>"
            );
        }
    });
});

app.controller('MapCtrl', function($scope) {

    $scope.message = 'Lets look at a map';
     
    $scope.$on("$routeChangeSuccess", function(event, current, previous ){
        param = current.params.obj;
        $.getJSON('lib/data.json', function(data){
            office = data.data[param].offices;
            if (office.length > 0){
                lat = office[0].lat;
                lng = office[0].lng;
                if (lat != "" && lng != ""){
                    pos = new google.maps.LatLng(lat, lng);
                    $scope.mrk.setPosition(pos);
                    $scope.map.setCenter(pos);
                }
            }
        });
    });

    // google map setup
    var mapOptions = {
        center: new google.maps.LatLng(45.42, -75.69),
        zoom: 10
    };

    // actually create map
    $scope.map = new google.maps.Map(
        document.getElementById("mapcanvas"),
        mapOptions
    );

    // set up marker for the map
    $scope.mrk = new google.maps.Marker({
        position: new google.maps.LatLng(45.42, -75.69),
        title: 'Ottawa'
    });

    // puts the marker on the map
    $scope.mrk.setMap($scope.map);

});

app.controller('MoreInfoCtrl', function($scope){
    function updateInfo(obj){
         $.getJSON('lib/data.json', function(data){
            root = data.data[obj];
        });       
    }
});
