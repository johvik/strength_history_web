define([
  'jquery',
  'underscore',
  'backbone',
  'collections/activeworkout',
  'globals/workout'
], function($, _, Backbone, ActiveWorkoutCollection, Workouts) {
  var ActiveWorkouts = new ActiveWorkoutCollection();

  ActiveWorkouts.listenTo(ActiveWorkouts, 'add', function(workout) {
    workout.latest();
  });
  ActiveWorkouts.listenTo(ActiveWorkouts, 'reset', function(workouts) {
    workouts.each(function(workout) {
      workout.latest();
    });
  });
  ActiveWorkouts.listenTo(ActiveWorkouts, 'latest:workout change:name', function() {
    ActiveWorkouts.sort();
  });

  // Act as a slave to Workouts
  ActiveWorkouts.reset(Workouts.models);
  ActiveWorkouts.listenTo(Workouts, 'add', function(workout) {
    ActiveWorkouts.add(workout);
  });
  ActiveWorkouts.listenTo(Workouts, 'change:_id', function(workout) {
    workout.latest();
  });
  ActiveWorkouts.listenTo(Workouts, 'remove', function(workout) {
    ActiveWorkouts.remove(workout);
  });
  ActiveWorkouts.listenTo(Workouts, 'reset', function(workouts) {
    ActiveWorkouts.reset(workouts);
  });
  return ActiveWorkouts;
});
