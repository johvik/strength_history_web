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
    router.on('route', function() {
      // Remove navbar highlight
      $('.navbar .active').removeClass('active');
    });
    router.on('route:defaultRoute', function() {
      require([
        'views/test/page'
      ], function(TestPage) {
        $('#nav-home').addClass('active');
        var testPage = Vm.create('Page', TestPage);
        testPage.render();
      });
    });
    router.on('route:weightHistory', function() {
      require([
        'views/weight/page'
      ], function(WeightPage) {
        $('#nav-weight-history').addClass('active');
        var weightPage = Vm.create('Page', WeightPage);
        weightPage.render();
      });
    });
    router.on('route:exercises', function() {
      require([
        'views/exercise/page'
      ], function(ExercisePage) {
        $('#nav-exercises').addClass('active');
        var exercisePage = Vm.create('Page', ExercisePage);
        exercisePage.render();
      });
    });
    router.on('route:workouts', function() {
      require([
        'views/workout/page'
      ], function(WorkoutPage) {
        $('#nav-workouts').addClass('active');
        var workoutPage = Vm.create('Page', WorkoutPage);
        workoutPage.render();
      });
    });
    Backbone.history.start();
  };
  return {
    initialize : initialize
  };
});
