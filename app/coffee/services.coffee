'use strict'

###
Services
###

# Demonstrate how to register services
# In this case it is a simple value service.
angular.module 'myApp.services',
  [
    'ngResource'
  ]
.value('version', 'v0.0.1')
.factory 'HistoryData',
  [
    '$resource'
    '$rootScope'
    ($resource, $rootScope) ->
      HistoryData = $resource '/historydata/:_id', _id: '@_id',
        update:
          method: 'PUT'
      $rootScope.historyData = HistoryData.query()
      return HistoryData
  ]
.factory 'Exercise',
  [
    '$resource'
    '$rootScope'
    ($resource, $rootScope) ->
      Exercise = $resource '/exercise/:_id', _id: '@_id',
        update:
          method: 'PUT'
      $rootScope.exercises = Exercise.query()
      return Exercise
  ]
.factory 'Workout',
  [
    '$resource'
    '$rootScope'
    ($resource, $rootScope) ->
      Workout = $resource '/workout/:_id', _id: '@_id',
        update:
          method: 'PUT'
      $rootScope.workouts = Workout.query()
      return Workout
  ]
