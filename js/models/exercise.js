define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var ExerciseModel = Backbone.Model.extend({
    idAttribute : '_id',
    urlRoot : '/exercise',
    validate : function(attributes) {
      var exerciseName = attributes.name;
      var standardIncrease = attributes.standardIncrease;
      var len = exerciseName.length;
      var invalidName = !(len >= 1 && len <= 64);
      var invalidStandardIncrease = !_.isFinite(standardIncrease);
      if (invalidName || invalidStandardIncrease) {
        return {
          str : 'Invalid exercise attributes: ' + exerciseName + ' ' + standardIncrease,
          name : invalidName,
          standardIncrease : invalidStandardIncrease
        };
      }
    },
    initialize : function() {
      this.bind('invalid', function(model, error) {
        console.log(error);
      });
    },
    latest : function() {
      if (!_.isUndefined(this.id)) {
        var _self = this;
        Backbone.ajax('/exercise/latest/' + this.id, {
          success : function(data) {
            var res = _.filter(data.data, function(d) {
              return d.exercise == _self.id;
            });
            var latest = _.reduce(res, function(memo, i) {
              if (memo) {
                _.each(i.sets, function(set) {
                  memo.sets.push(set);
                });
                return memo;
              }
              return i;
            }, undefined);
            if (!_.isUndefined(latest)) {
              _self.set({
                latest : latest.sets
              });
              _self.trigger('latest:exercise', _self);
            }
          },
          error : function() {
            _self.unset('latest');
            _self.trigger('latest:exercise', _self);
          }
        });
      }
    },
    bestLatest : function() {
      var latest = this.get('latest');
      if (_.isArray(latest)) {
        var best = _.reduce(latest, function(memo, i) {
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
  return ExerciseModel;
});
