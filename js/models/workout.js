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
      var invalidExercises = _.isUndefined(exercises);
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
    }
  });
  return WorkoutModel;
});
