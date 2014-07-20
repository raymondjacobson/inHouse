var generateC3Graph = function(bind, data, width) {
  var chart = c3.generate({
    bindto: bind,
    data: {
      x: 'x',
      columns: [
        ['x', '2014-01-01', '2014-02-01', '2014-03-01', '2014-04-01', '2014-05-01', '2014-06-01', '2014-07-01', '2014-08-01', '2014-09-01', '2014-10-01', '2014-11-01', '2014-12-01'],
        (['data1']).concat(data)
      ],
      types: {
        data1: 'area',
        data2: 'area'
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: function (x) { return x.getMonth(); }
        }
      }
    },
    size: {
      height: 240,
      width: width
    },
    tooltip: {
      show: false
    },
    legend: {
      show: false
    }
  });
  return chart;
}

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
  $scope.reference_name = 'featured';
  var url = "/services/data/v29.0/query?q=SELECT+quantity__c+FROM+egg__c";
  console.log(url);
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
    success: function(data){
      console.log(data);
      if (data.status == 200) {
        console.log('success');
      }
    }});
  url = "/services/data/v29.0/sobjects/egg__c";
  var body = {"Name": "matt", "quantity__c": "1220"};
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
      method: 'POST',
      contentType: "application/json",
      data: JSON.stringify(body),
      success: function(data) {
        if (201 === data.status) {
          console.log("Success");
        }
      }
    });
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
  var width = $('.box').width();
  var data = [30, 200, 100, 400, 150, 250, 30, 30, 40, 50, 100, 120];
  var chart = generateC3Graph('#chart', data, width);
});
inHouseApp.controller('ConceptAddCtrl', function($scope) {
  $scope.reference_name = 'add concept';
});
inHouseApp.controller('ConceptEditCtrl', function($scope) {
  $scope.reference_name = 'edit concept';
});