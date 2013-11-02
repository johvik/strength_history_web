'use strict'

###
Controllers
###

angular.module 'myApp.controllers',
  []
.controller 'History',
  [
    '$scope'
    '$http'
    'HistoryData'
    'Workout'
    ($scope, $http, HistoryData, Workout) ->
      $http.post '/login',
        email: 'strength.history@gmail.com'
        password: 'testing'
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
