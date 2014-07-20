var inHouseApp = angular.module('inHouseApp', ['ngRoute']);

// angular routes
inHouseApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/_featured',
      controller: 'FeaturedCtrl'
    })
    .when('/popular', {
      templateUrl: '/partials/_popular',
      controller: 'PopularCtrl'
    })
    .when('/recent', {
      templateUrl: '/partials/_recent',
      controller: 'RecentCtrl'
    })
    .when('/search', {
      templateUrl: '/partials/_search',
      controller: 'SearchCtrl'
    })
    .when('/profile/:id', {
      templateUrl: '/partials/_profile',
      controller: 'ProfileCtrl'
    })
    .when('/concept/add', {
      templateUrl: '/partials/_concept_add',
      controller: 'ConceptAddCtrl'
    })
    .when('/concept/:id', {
      templateUrl: '/partials/_concept_view',
      controller: 'ConceptViewCtrl'
    })
    .when('/concept/:id/edit', {
      templateUrl: '/partials/_concept_edit',
      controller: 'ConceptEditCtrl'
    })
    .otherwise({
      templateUrl: '/partials/_featured',
      controller: 'FeaturedCtrl'
    });
});

// controllers
inHouseApp.controller('Ctrl', function($scope) {});//default scope

inHouseApp.controller('FeaturedCtrl', function($scope) {
  var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ],
        types: {
          data1: 'area',
          data2: 'area'
        }
      },
      size: {
        height: 300,
        width: 300
      }
  });
  $scope.reference_name = 'featured';
});
inHouseApp.controller('PopularCtrl', function($scope) {
  $scope.reference_name = 'popular';
});
inHouseApp.controller('RecentCtrl', function($scope) {
  $scope.reference_name = 'recent';
});
inHouseApp.controller('SearchCtrl', function($scope) {
  $scope.reference_name = 'results';
});
inHouseApp.controller('ProfileCtrl', function($scope) {
  $scope.reference_name = 'profile';
});
inHouseApp.controller('ConceptViewCtrl', function($scope) {
  $scope.reference_name = 'view concept';
});
inHouseApp.controller('ConceptAddCtrl', function($scope) {
  $scope.reference_name = 'add concept';
});
inHouseApp.controller('ConceptEditCtrl', function($scope) {
  $scope.reference_name = 'edit concept';
});