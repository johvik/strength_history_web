define([
  'jquery',
  'underscore',
  'backbone',
  'userdata',
  'collections/workout'
], function($, _, Backbone, UserData, WorkoutCollection) {
  var Workouts = new WorkoutCollection();
  var array = UserData.workouts;

  Workouts.listenTo(Workouts, 'change', function() {
    Workouts.sort();
  });
  if (_.isArray(array)) {
    Workouts.reset(array);
  } else {
    Workouts.fetch();
  }
  return Workouts;
});
