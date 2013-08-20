define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes : {
      'history/weight' : 'weightHistory',
      'exercises' : 'exercises',
      'workouts' : 'workouts',

      // Default - catch all
      '*actions' : 'defaultRoute'
    }
  });

  var initialize = function() {
    var router = new AppRouter();
    router.on('route:defaultRoute', function() {
      require([
        'views/test/page'
      ], function(TestPage) {
        var testPage = Vm.create('Page', TestPage);
        testPage.render();
      });
    });
    router.on('route:weightHistory', function() {
      require([
        'views/weight/list'
      ], function(WeightListPage) {
        var weightListPage = Vm.create('Page', WeightListPage);
        weightListPage.render();
      });
    });
    router.on('route:exercises', function() {
      require([
        'views/exercise/list'
      ], function(ExerciseListPage) {
        var exerciseListPage = Vm.create('Page', ExerciseListPage);
        exerciseListPage.render();
      });
    });
    router.on('route:workouts', function() {
      require([
        'views/workout/list'
      ], function(WorkoutListPage) {
        var workoutListPage = Vm.create('Page', WorkoutListPage);
        workoutListPage.render();
      });
    });
    Backbone.history.start();
  };
  return {
    initialize : initialize
  };
});
