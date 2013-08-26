define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes : {
      'history/weight(/edit/:id)' : 'weightHistory',
      'history/workout' : 'workoutHistory',
      'exercises(/edit/:id)' : 'exercises',
      'workouts(/edit/:id)' : 'workouts',
      'log' : 'log',
      'run/:workout(/:step)' : 'runWorkout',
      'history/workout/edit/:workout(/:step)' : 'editWorkout',

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
    weightHistory : function(id) {
      require([
        'views/weight/page'
      ], function(WeightPage) {
        $('#nav-weight-history').addClass('active');
        var weightPage = Vm.create('Page', WeightPage, {
          editId : id
        });
        weightPage.render();
      });
    },
    workoutHistory : function() {
      // TODO Merge workout and weight history into one view!
      require([
        'views/workoutdata/page'
      ], function(WorkoutDataPage) {
        $('#nav-workout-history').addClass('active');
        var workoutDataPage = Vm.create('Page', WorkoutDataPage);
        workoutDataPage.render();
      });
    },
    exercises : function(id) {
      require([
        'views/exercise/page'
      ], function(ExercisePage) {
        $('#nav-exercises').addClass('active');
        var exercisePage = Vm.create('Page', ExercisePage, {
          editId : id
        });
        exercisePage.render();
      });
    },
    workouts : function(id) {
      require([
        'views/workout/page'
      ], function(WorkoutPage) {
        $('#nav-workouts').addClass('active');
        var workoutPage = Vm.create('Page', WorkoutPage, {
          editId : id
        });
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
    runWorkout : function(workout, step) {
      require([
        'views/active/run'
      ], function(ActiveRunPage) {
        $('#nav-log').addClass('active');
        Vm.create('Page', ActiveRunPage, {
          workoutId : workout,
          step : step,
        });
      });
    },
    editWorkout : function(workout, step) {
      require([
        'views/workoutdata/edit'
      ], function(WorkoutDataEditPage) {
        $('#nav-workout-history').addClass('active');
        Vm.create('Page', WorkoutDataEditPage, {
          workoutId : workout,
          step : step,
        });
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
    // TODO Change to pushState
    Backbone.history.start();
  };
  return {
    initialize : initialize
  };
});
