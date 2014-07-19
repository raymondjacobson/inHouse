var inHouseApp = angular.module('inHouseApp', ['ngRoute']);

// angular routes
inHouseApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/_index',
      controller: 'IndexCtrl'
    })
    .when('/featured', {
      templateUrl: '/partials/_featured',
      controller: 'FeaturedCtrl'
    })
    .otherwise({
      templateUrl: '/partials/_index',
      controller: 'IndexCtrl'
    });
});

// controllers
inHouseApp.controller('IndexCtrl', function($scope) {
  $scope.app = 'inHouse';
});
inHouseApp.controller('FeaturedCtrl', function($scope) {
  console.log('asdf');
  $scope.app = 'mengmeng';
});