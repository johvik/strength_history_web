define([ 'jquery', 'underscore', 'backbone', 'models/weight' ], function($, _, Backbone, WeightModel) {
  var WeightCollection = Backbone.Collection.extend({
    model : WeightModel,
    url : '/weight'
  });
  return WeightCollection;
});
