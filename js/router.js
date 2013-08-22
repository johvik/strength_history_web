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
      'log' : 'log',
      'start/:workout' : 'startWorkout',

      // Default - catch all
      '*actions' : 'defaultRoute'
    },
    defaultRoute : function() {
      require([
        'views/test/page'
      ], function(TestPage) {
        $('#nav-home').addClass('active');
        var testPage = Vm.create('Page', TestPage);
        testPage.render();
        // Make sure path is home page
        Backbone.history.navigate('', {
          replace : true
        });
      });
    },
    weightHistory : function() {
      require([
        'views/weight/page'
      ], function(WeightPage) {
        $('#nav-weight-history').addClass('active');
        var weightPage = Vm.create('Page', WeightPage);
        weightPage.render();
      });
    },
    exercises : function() {
      require([
        'views/exercise/page'
      ], function(ExercisePage) {
        $('#nav-exercises').addClass('active');
        var exercisePage = Vm.create('Page', ExercisePage);
        exercisePage.render();
      });
    },
    workouts : function() {
      require([
        'views/workout/page'
      ], function(WorkoutPage) {
        $('#nav-workouts').addClass('active');
        var workoutPage = Vm.create('Page', WorkoutPage);
        workoutPage.render();
      });
    },
    log : function() {
      require([
        'views/active/page'
      ], function(ActivePage) {
        $('#nav-log').addClass('active');
        var activePage = Vm.create('Page', ActivePage);
        activePage.render();
      });
    },
    startWorkout : function(workout) {
      require([
        'views/active/start'
      ], function(ActiveStartPage) {
        $('#nav-log').addClass('active');
        var activeStartPage = Vm.create('Page', ActiveStartPage, {
          workoutId : workout
        });
        activeStartPage.render();
      });
    }
  });

  var initialize = function() {
    var router = new AppRouter();
    router.on('route', function() {
      // Remove navbar highlight and collapse
      $('.navbar .active').removeClass('active');
      var collapse = $('.navbar button.navbar-toggle:not(.collapsed)');
      if (collapse.css('display') !== 'none') {
        collapse.trigger('click');
      }
    });
    Backbone.history.start();
  };
  return {
    initialize : initialize
  };
});
