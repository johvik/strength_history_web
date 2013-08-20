define([
  'jquery',
  'underscore',
  'backbone',
  'models/weight'
], function($, _, Backbone, WeightModel) {
  var WeightCollection = Backbone.Collection.extend({
    model : WeightModel,
    url : '/weight',
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
  return WeightCollection;
});
