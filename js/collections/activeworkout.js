define([
  'jquery',
  'underscore',
  'backbone',
  'collections/workout'
], function($, _, Backbone, WorkoutCollection) {
  var ActiveWorkoutCollection = WorkoutCollection.extend({
    comparator : function(a, b) {
      // Place latest last then order by super.comparator
      var aLat = a.get('latest');
      var bLat = b.get('latest');
      var aDef = !_.isUndefined(aLat);
      var bDef = !_.isUndefined(bLat);
      if (aDef && bDef) {
        if (aLat > bLat) {
          return 1;
        } else if (aLat < bLat) {
          return -1;
        } else {
          return WorkoutCollection.prototype.comparator.apply(this, arguments);
        }
      } else if (aDef) {
        return 1;
      } else if (bDef) {
        return -1;
      } else {
        return WorkoutCollection.prototype.comparator.apply(this, arguments);
      }
    }
  });
  return ActiveWorkoutCollection;
});
