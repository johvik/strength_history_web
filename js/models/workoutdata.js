define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var WorkoutDataModel = Backbone.Model.extend({
    idAttribute : '_id',
    urlRoot : '/workoutdata',
    validate : function(attributes) {
      var data = attributes.data;
      var invalidData = !_.isArray(data) || !(data.length >= 0 && data.length <= 64);
      var invalidSets = [];
      _.each(data, function(obj, i) {
        var sets = obj.sets;
        var invalidSet = !_.isArray(sets) || !(sets.length >= 0 && sets.length <= 32);
        if (invalidSet) {
          invalidSets.push(i);
        }
      });
      if (invalidData || invalidSets.length !== 0) {
        return {
          str : 'Invalid workoutdata attributes: ' + JSON.stringify(data),
          data : invalidData,
          sets : invalidSets
        };
      }
    },
    initialize : function() {
      this.bind('invalid', function(model, error) {
        console.log(error);
      });
    },
    save : function(attributes, options) {
      // Always set sync to current time before saving
      this.set({
        sync : new Date().getTime()
      });
      return Backbone.Model.prototype.save.apply(this, arguments);
    },
    bestSet : function(index) {
      var data = this.get('data')[index];
      if (data) {
        var best = _.reduce(data.sets, function(memo, i) {
          if (memo) {
            if (i.weight > memo.weight) {
              return i;
            } else if (i.weight == memo.weight) {
              if (i.reps > memo.reps) {
                return i;
              }
            }
            return memo;
          }
          return i;
        }, undefined);
        return best;
      }
    }
  });
  return WorkoutDataModel;
});
