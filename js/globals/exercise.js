define([
  'jquery',
  'underscore',
  'backbone',
  'userdata',
  'collections/exercise'
], function($, _, Backbone, UserData, ExerciseCollection) {
  var Exercises = new ExerciseCollection();
  var array = UserData.exercises;

  Exercises.listenTo(Exercises, 'change', function() {
    Exercises.sort();
  });
  if (_.isArray(array)) {
    Exercises.reset(array);
  } else {
    Exercises.fetch();
  }
  return Exercises;
});
