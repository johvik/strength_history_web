'use strict'

###
Controllers
###

angular.module 'myApp.controllers',
  []
.controller 'History',
  [
    '$scope'
    'HistoryData'
    'Workout'
    ($scope, HistoryData, Workout) ->
  ]
.controller 'Exercises',
  [
    '$scope'
    '$rootScope'
    'Exercise'
    ($scope, $rootScope, Exercise) ->
      $scope.create = ->
        new Exercise
          name: 'New exercise'
          standardIncrease: 2.5
          sync: new Date().getTime()
        .$save(
          (exercise) ->
            $rootScope.setRouteId exercise
            $scope.exercises.push exercise,
          () ->
            # TODO Show error
            console.log 'error')
  ]
.controller 'Workouts',
  [
    '$scope'
    '$rootScope'
    'Workout'
    ($scope, $rootScope, Workout) ->
      $scope.create = ->
        new Workout
          name: 'New workout'
          exercises: []
          sync: new Date().getTime()
        .$save(
          (workout) ->
            $rootScope.setRouteId workout
            $scope.workouts.push workout,
          () ->
            # TODO Show error
            console.log 'error')
  ]
.controller 'Signup',
  [
    '$scope'
    '$http'
    ($scope, $http) ->
      $scope.submit = ->
        $http.post '/signup',
          email: $scope.signupEmail
          password: $scope.signupPassword
        .success () ->
            console.log 'abc'
        .error (data) ->
            console.log 'error', data
        console.log $scope
  ]
