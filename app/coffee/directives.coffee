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
      restrict: 'A',
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
