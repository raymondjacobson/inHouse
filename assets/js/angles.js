var inHouseApp = angular.module('inHouseApp', ['ngRoute']);

// angular routes
inHouseApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/_index',
      controller: 'IndexCtrl'
    })
    .otherwise({
      templateUrl: '/partials/_index',
      controller: 'IndexCtrl'
    });
});

// controllers
inHouseApp.controller('IndexCtrl', function($scope) {
  $scope.title = 'inHouse';
});