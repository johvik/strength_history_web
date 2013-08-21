define([
  'jquery',
  'underscore',
  'backbone',
  'userdata',
  'collections/weight'
], function($, _, Backbone, UserData, WeightCollection) {
  var Weights = new WeightCollection();
  var array = UserData.weights;

  Weights.listenTo(Weights, 'change', function() {
    Weights.sort();
  });
  if (_.isArray(array)) {
    Weights.reset(array);
  } else {
    Weights.fetch();
  }
  return Weights;
});
