//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);

sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/map', {
        templateUrl: 'views/mapview.html',
        controller: 'MapCtrl'
      })
      .otherwise({
          redirectTo: '/map'
      });
}]);

sampleApp.controller('OptCtrl', function($scope){
    $scope.message = 'All the embassies';
    
    $.getJSON('lib/data.json', function(data){
        var root = data.data;
        for (var i in root){
            dat = root[i].country.eng.name;
            console.log(dat)
            
            $('.nav').append(
                "<li><a href='#/map'=>"+dat+"</a></li>"
            );
        }
    });
});

sampleApp.controller('MapCtrl', function($scope) {
	$scope.message = 'Lets look at a map';

    var mapOptions = {
        center: new google.maps.LatLng(45.42, -75.69),
        zoom: 10
    };
    $scope.map = new google.maps.Map(
        document.getElementById("mapcanvas"),
        mapOptions
    );
    
});
