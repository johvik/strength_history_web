'use strict'

###
Declare app level module which depends on filters, and services
###

angular.module 'myApp',
  [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
  ]
.config([
    '$routeProvider'
    '$locationProvider'
    ($routeProvider, $locationProvider) ->
      $routeProvider.when '/history',
        templateUrl: 'partials/history.html'
        controller: 'History'
      $routeProvider.when '/exercises',
        templateUrl: 'partials/exercises.html'
        controller: 'Exercises'
      $routeProvider.when '/workouts',
        templateUrl: 'partials/workouts.html'
        controller: 'Workouts'
      $routeProvider.otherwise
        redirectTo: '/history'
      $locationProvider.html5Mode true
  ])
.run [
    '$rootScope'
    ($rootScope) ->
      $rootScope.routeId = ''
      $rootScope.setRouteId = (item) ->
        $rootScope.routeId = item._id
]
