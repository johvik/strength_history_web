define([
  'jquery',
  'underscore',
  'backbone',
  'events'
], function($, _, Backbone, Events) {
  var WeightModel = Backbone.Model.extend({
    idAttribute : '_id',
    urlRoot : '/weight',
    validate : function(attributes) {
      var time = attributes.time;
      var weight = attributes.weight;
      var invalidTime = !_.isFinite(time) || 0 > time;
      var invalidWeight = !_.isFinite(weight) || 0 >= weight;
      if (invalidTime || invalidWeight) {
        return {
          str : 'Invalid weight attributes: ' + time + ' ' + weight,
          time : invalidTime,
          weight : invalidWeight
        };
      }
    },
    initialize : function() {
      this.bind('invalid', function(model, error) {
        console.log(error);
      });
    },
    parse : function(data, options) {
      if (_.has(data, 'time')) {
        // Convert date string to time
        data.time = new Date(data.time).getTime();
      }
      return data;
    },
  }, {
    // static function
    latest : function() {
      Backbone.ajax('/weight/latest', {
        success : function(data) {
          var weight = data.weight;
          if (!_.isUndefined(weight)) {
            Events.trigger('latest:weight', weight);
          }
        }
      });
    }
  });
  return WeightModel;
});
