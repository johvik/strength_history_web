define([
  'jquery',
  'underscore',
  'backbone',
  'models/workoutdata',
  'models/weight'
], function($, _, Backbone, WorkoutDataModel, WeightModel) {
  var HistoryDataCollection = Backbone.Collection.extend({
    model : function(attrs, options) {
      if (_.isUndefined(attrs.workout)) {
        // Weights have no workout attribute
        return new WeightModel(attrs, options);
      }
      return new WorkoutDataModel(attrs, options);
    },
    url : '/historydata',
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
  return HistoryDataCollection;
});
