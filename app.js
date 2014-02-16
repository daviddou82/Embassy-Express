//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);

//Define Routing for app
//Uri /AddNewOrder -> template AddOrder.html and Controller AddOrderController
//Uri /ShowOrders -> template ShowOrders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/one', {
	templateUrl: 'views/one.html',
	controller: 'AddOrderController'
      }).
      when('/two', {
	templateUrl: 'views/two.html',
	controller: 'ShowOrdersController'
      }).
      otherwise({
	redirectTo: '/one'
      });
}]);


sampleApp.controller('AddOrderController', function($scope) {
	
	$scope.message = 'What up, I am the first view and it is a pleasure to make your aquaintance';
	
});


sampleApp.controller('ShowOrdersController', function($scope) {

	$scope.message = 'Hello there my dear chap, I am number two, what can i do for you';

});

