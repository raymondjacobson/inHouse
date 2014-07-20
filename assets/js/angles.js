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

inHouseApp.controller('FeaturedCtrl', function($scope, $http, $q) {
  var deferred = $q.defer();
  $scope.reference_name = 'featured';
  var query = 'SELECT+name+FROM+Concept__c';
  var url = sr.context.links.queryUrl + "?q=" + query;
  var concepts = [];
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
    success: function(data){
      if (data.status == 200) {
        var records = data.payload.records;
        for(i=0;i<records.length;++i){
          console.log(records[i].attributes.url);
          Sfdc.canvas.client.ajax(records[i].attributes.url,
          {client: sr.client,
          success: function(data2){
            if (data2.status == 200) {
              concepts.push(data2);
              if(concepts.length==records.length){
                deferred.resolve(concepts);
                deferred.promise.then(function(concepts_data){
                  console.log(concepts_data);
                  // add sorting code
                  $scope.concepts = concepts_data;
                });
              }
            }
          }});
        }
      }
    }});
});
inHouseApp.controller('PopularCtrl', function($scope) {
  $scope.reference_name = 'popular';
  var query = 'SELECT+name+FROM+Concept__c';
  console.log(get_concept_group(sr, query));
});
inHouseApp.controller('RecentCtrl', function($scope) {
  $scope.reference_name = 'recent';
  var query = 'SELECT+name+FROM+Concept__c';
  console.log(get_concept_group(sr, query));
});
inHouseApp.controller('SearchCtrl', function($scope) {
  $scope.reference_name = 'results';
  var query = 'SELECT+name+FROM+Concept__c';
  console.log(get_concept_group(sr, query));
});
inHouseApp.controller('ProfileCtrl', function($scope) {
  $scope.reference_name = 'profile';
  $scope.first_name = sr.context.user.firstName;
  $scope.last_name = sr.context.user.lastName;
  $scope.email = sr.context.user.email;
  $scope.tokens = 100;
  var query = 'SELECT+name+FROM+Concept__c';
  console.log(get_concept_group(sr, query));
});
inHouseApp.controller('ConceptViewCtrl', function($scope, $location, $q) {
  console.log($location.path());
  $scope.reference_name = 'view concept';
  var deferred = $q.defer();
  var loc_params = $location.path().split('/');
  var id = loc_params[loc_params.length-1];
  var url = '/services/data/v31.0/sobjects/Concept__c/'+ id;
  var concepts = [];
  Sfdc.canvas.client.ajax(url,
    {client: sr.client,
    success: function(data){
      if (data.status == 200) {
        deferred.resolve(data);
        deferred.promise.then(function(data){
          console.log(data);
          $scope.concept = data;
        })
      }
    }
  });
  var width = $('.box').width();
  var data = [30, 200, 100, 400, 150, 250, 30, 30, 40, 50, 100, 120];
  var chart = generateC3Graph('#chart', data, width);
});
inHouseApp.controller('ConceptAddCtrl', function($scope, $location) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 
  today = yyyy+'/'+mm+'/'+dd;
  $scope.reference_name = 'add concept';
  var url = "/services/data/v29.0/sobjects/Concept__c";
  var data_title = $('.data-title').val()
  console.log(data_title);
  var data_abstract = $('.data-abstract').val()
  var data_body = $('.data-body').val()
  var data_tags = $('.data-tags').val()
  var author = sr.context.user.firstName + ' ' + sr.context.user.lastNameh
  var body = "{'name': '"+data_title+
    "', 'Abstract__c': '"+data_abstract+
    "', 'GenerationDate__c': '"+today+
    "', 'TotalTokens__c' : '1', 'ExpirationDate__c': '2016-12-02', 'Body__c': '"+data_body+
    "', 'Author__c' : '"+author+"'}";
  $('.submit').click(function(){
    console.log(body);
    sf_POST(sr, url, body);
    // $location.path('/featured');
  });
});
inHouseApp.controller('ConceptEditCtrl', function($scope) {
  $scope.reference_name = 'edit concept';
});