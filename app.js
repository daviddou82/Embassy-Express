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
    $scope.countries = getCountries(); 
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
