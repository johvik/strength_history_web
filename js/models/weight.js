define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
  var WeightModel = Backbone.Model.extend({
    idAttribute : '_id',
    urlRoot : '/weight',
    validate : function(attributes) {
      var weight = attributes.weight;
      var time = attributes.time;
      if (!_.isFinite(weight) || 0 >= weight || !_.isFinite(time) || 0 > time) {
        return 'Invalid weight attributes';
      }
    },
    initialize : function() {
      this.bind('invalid', function(model, error) {
        console.log(error);
      });
    }
  });
  return WeightModel;
});
