//Define an angular module for our app
var app = angular.module('app', ['ngRoute']);

app.config(
  function($routeProvider) {
    $routeProvider
    .when('/map/:obj', {
        templateUrl: 'views/mapview.html',
        controller: 'MapCtrl',
      })
    .when('/moreinfo/:obj', {
        templateUrl: 'views/moreinfo.html',
        controller: 'MoreInfoCtrl'
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

app.controller('InfoCtrl', function($scope){

    $scope.$on("$routeChangeSuccess", function(event, current, previous ){
        param = current.params.obj;
        $.getJSON('lib/data.json', function(data){
            office = data.data[param].offices;
            if (office.length > 0){
                lat = office[0].lat;
                lng = office[0].lng;
                if (lat != "" && lng != ""){
                    $scope.$apply(function(){
                        $scope.country = data.data[param].country.eng.name;
                        $scope.city = office[0].eng.city;
                        $scope.address = office[0].eng.address;
                        document.getElementById('changeinf').innerHTML = "<a href='#/moreinfo/"+param+"'>More Info...</a>"
                    });
                }
            }
        });
    });
});

app.controller('MoreInfoCtrl', function($scope, $routeParams){
    $scope.msg = "this is more info"
    param = $routeParams.obj;

    $('.moreinf').append(
        "<a href='#/map/"+param+"'>Less Info...</a>"
    );


    $.getJSON('lib/data.json', function(data){
        //console.log(data.data[param]);
    
        root = data.data[param].offices[0];
        
        $scope.type = root.eng.type;
        $scope.close = data.data[param].country['offices-help-abroad'].eng['closing-text']; 
        $scope.open = data.data[param].country['offices-help-abroad'].eng['opening-text'];

        passport = getAttributeByIndex(root, 7);
        consul = getAttributeByIndex(root, 6);
        email = root.eng['email-1'];
        
        $scope.info = ['Passport Service: '+passport, 'Honarary Consul: '+consul, 'Email: '+email];

    });
});

function getAttributeByIndex(obj, index){
    var i = 0;
    for (var attr in obj){
        if (index === i){
            return obj[attr];
        }
        i++;
    }
    return null;
}
