define([
  'jquery',
  'underscore',
  'backbone',
  'userdata',
  'collections/workoutdata'
], function($, _, Backbone, UserData, WorkoutDataCollection) {
  var WorkoutData = new WorkoutDataCollection();
  var array = UserData.workoutData;

  WorkoutData.listenTo(WorkoutData, 'change', function() {
    WorkoutData.sort();
  });
  if (_.isArray(array)) {
    WorkoutData.reset(array);
  } else {
    WorkoutData.fetch();
  }
  return WorkoutData;
});
