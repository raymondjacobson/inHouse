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
inHouseApp.controller('FeaturedCtrl', function($scope) {
  $scope.reference_name = 'featured';
});
inHouseApp.controller('PopularCtrl', function($scope) {
  $scope.reference_name = 'popular';
  console.log("1");
  $.ajax({
    url: " https://na17.salesforce.com//services/data/v29.0/query?q=SELECT+name+FROM+Concept__c+WHERE+name+=+'go'",
    type: 'GET',
    success: function(data){
      console.log("1");
      // $scope.search_results = data
    }
  })
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