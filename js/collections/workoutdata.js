define([
  'jquery',
  'underscore',
  'backbone',
  'models/workoutdata'
], function($, _, Backbone, WorkoutDataModel) {
  var WorkoutDataCollection = Backbone.Collection.extend({
    model : WorkoutDataModel,
    url : '/workoutdata',
    comparator : function(a, b) {
      var aTime = a.get('time');
      var bTime = b.get('time');
      if (aTime > bTime) {
        return -1;
      } else if (aTime < bTime) {
        return 1;
      } else {
        // Compare by id if same name
        if (a.id > b.id) {
          return -1;
        }
        return 1;
      }
    }
  });
  return WorkoutDataCollection;
});
