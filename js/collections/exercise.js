define([ 'jquery', 'underscore', 'backbone', 'models/exercise' ], function($, _, Backbone, ExerciseModel) {
  var ExerciseCollection = Backbone.Collection.extend({
    model : ExerciseModel,
    url : '/exercise'
  });
  return ExerciseCollection;
});
