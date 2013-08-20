define([ 'jquery', 'underscore', 'backbone', 'models/workout' ], function($, _, Backbone, WorkoutModel) {
  var WorkoutCollection = Backbone.Collection.extend({
    model : WorkoutModel,
    url : '/workout',
    comparator : function(a, b) {
      var aLow = a.get('name').toLocaleLowerCase();
      var bLow = b.get('name').toLocaleLowerCase();
      if (aLow > bLow) {
        return 1;
      } else if (aLow < bLow) {
        return -1;
      } else {
        // Compare by id if same name
        if (a.id > b.id) {
          return -1;
        }
        return 1;
      }
    }
  });
  return WorkoutCollection;
});
