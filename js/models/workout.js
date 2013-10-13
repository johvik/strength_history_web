define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var WorkoutModel = Backbone.Model.extend({
    idAttribute : '_id',
    urlRoot : '/workout',
    validate : function(attributes) {
      var workoutName = attributes.name;
      var exercises = attributes.exercises;
      var len = workoutName.length;
      var invalidName = !(len >= 1 && len <= 64);
      var invalidExercises = !_.isArray(exercises) || !(exercises.length >= 0 && exercises.length <= 64);
      if (invalidName || invalidExercises) {
        return {
          str : 'Invalid workout attributes: ' + workoutName + ' ' + exercises,
          name : invalidName,
          exercises : invalidExercises
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
    latest : function() {
      if (!_.isUndefined(this.id)) {
        var _self = this;
        Backbone.ajax('/workout/latest/' + this.id, {
          success : function(data) {
            var time = data.time;
            if (!_.isUndefined(time)) {
              _self.set({
                latest : time
              });
              _self.trigger('latest:workout');
            }
          },
          error : function() {
            _self.unset('latest');
            _self.trigger('latest:workout');
          }
        });
      }
    }
  });
  return WorkoutModel;
});
