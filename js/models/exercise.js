define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
  var ExerciseModel = Backbone.Model.extend({
    idAttribute : '_id',
    urlRoot : '/exercise',
    validate : function(attributes) {
      var exerciseName = attributes.name;
      var standardIncrease = attributes.standardIncrease;
      var len = exerciseName.length;
      if (!(len >= 1 && len <= 64) || !_.isFinite(standardIncrease)) {
        return 'Invalid exercise attributes';
      }
    },
    initialize : function() {
      this.bind('invalid', function(model, error) {
        console.log(error);
      });
    }
  });
  return ExerciseModel;
});
