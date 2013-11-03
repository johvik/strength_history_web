'use strict'

###
Directives
###

angular.module 'myApp.directives',
  []
.directive 'appVersion',
  [
    'version'
    (version) ->
      (scope, element, attrs) ->
        element.text version
  ]
.directive 'shEdit',
  [
    '$rootScope'
    ($rootScope) ->
      restrict: 'A'
      link: (scope, element, attrs) ->
        scope.realItem = scope.$parent[attrs.shEdit] # or scope.$eval attrs.shEdit
        # Create a copy of the real item
        scope.editItem = angular.copy scope.realItem
        
        scope.cancel = () ->
          $rootScope.setRouteId ''
        scope.remove = (list, text) ->
          if not text or confirm text
            # Send a delete request
            scope.editItem.$delete () ->
              scope.cancel()
              # Remove it from the list
              list.splice list.indexOf(scope.realItem), 1
          else
            scope.cancel()
        scope.save = () ->
          scope.editItem.sync = new Date().getTime()
          scope.editItem.$update(
            (item) ->
              scope.cancel()
              # Update real item
              angular.extend scope.realItem, item
            () ->
              scope.cancel()
              # TODO Show error
              console.log 'error')
  ]
.directive 'exerciseSelect',
  [
    '$rootScope'
    'Exercise'
    ($rootScope, Exercise) ->
      restrict: 'E'
      require: 'ngModel'
      replace: true
      templateUrl: 'partials/exercise-select.html'
      link: (scope, element, attrs, ngModel) ->
        scope.$watch $rootScope.exercises,
          () ->
            scope.selectexercises = $rootScope.exercises
  ]
.directive 'exercisesEdit',
  [
    () ->
      restrict: 'E'
      require: 'ngModel'
      templateUrl: 'partials/exercises-edit.html'
      scope:
        editexercises: '=ngModel'
      link: (scope, element, attrs, ngModel) ->
        scope.$watch 'editexercises',
          ((val) ->
            ngModel.$setViewValue val), true
        scope.defaultSelect = (e) ->
          if scope.defaultselect and (e.keyCode is 13 or e.type isnt 'keyup')
            scope.editexercises.push scope.defaultselect
            scope.defaultselect = null
            # Ugly hack to get it working...
            e.target.blur()
            setTimeout (-> e.target.focus()), 0
        scope.removeExercise = (index) ->
          scope.editexercises.splice index, 1
  ]
.directive 'validExercises',
  [
    () ->
      require: 'ngModel'
      link: (scope, element, attrs, ctrl) ->
        ctrl.$parsers.unshift (viewValue) ->
          if null in viewValue
            ctrl.$setValidity 'exercises', false
            return undefined
          ctrl.$setValidity 'exercises', true
          return viewValue
  ]
