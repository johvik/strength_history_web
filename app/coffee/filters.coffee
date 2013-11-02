'use strict'

###
Filters
###

angular.module 'myApp.filters',
  []
.filter 'interpolate',
  [
    'version'
    (version) ->
      (text) ->
        String(text).replace /\%VERSION\%/mg, version
  ]
.filter 'name',
  [
    () ->
      (array, id) ->
        # Wait to update until everything is resolved
        if angular.isArray(array) and array.$resolved is true
          return item.name for item in array when item._id is id
        '?'
  ]
.filter 'exercises',
  [
    '$rootScope'
    '$filter'
    'Exercise'
    ($rootScope, $filter, Exercise) ->
      (array) ->
        if angular.isArray(array)
          return ($filter('name')($rootScope.exercises, id) for id in array).join ', '
        '?'
  ]
