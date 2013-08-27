define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events'
], function($, _, Backbone, Vm, Events) {
  var AppRouter = Backbone.Router.extend({
    routes : {
      'history/weight(/edit/:id)' : 'weightHistory',
      'history/workout' : 'workoutHistory',
      'exercises(/edit/:id)' : 'exercises',
      'workouts(/edit/:id)' : 'workouts',
      'run/:workout(/:step)' : 'runWorkout',
      'history/workout/edit/:workout(/:step)' : 'editWorkout',

      // Default - catch all
      '*actions' : 'defaultRoute'
    },
    defaultRoute : function() {
      if (Events.authenticated === true) {
        require([
          'views/active/page'
        ], function(ActivePage) {
          $('#nav-home').addClass('active');
          var activePage = Vm.create('Page', ActivePage);
          activePage.render();
          // Make sure path is home page
          Backbone.history.navigate('', {
            replace : true
          });
        });
      } else {
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
      }
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
    runWorkout : function(workout, step) {
      require([
        'views/active/run'
      ], function(ActiveRunPage) {
        $('#nav-home').addClass('active');
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
    Events.on('login', function(initial) {
      if (initial !== true) {
        router.defaultRoute();
      }
    });
    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a 'data-bypass'
    // attribute, bypass the delegation completely.
    $(document).on('click', 'a[href]:not([data-bypass])', function(e) {
      var href = $(this).attr('href');
      // Match all that starts with a slash
      if (href !== '' && href[0] === '/') {
        // Stop the default event to ensure the link will not cause a page refresh.
        e.preventDefault();
        Backbone.history.navigate(href, {
          trigger : true
        });
      }
    });
    Backbone.history.start({
      pushState : true
    });
  };
  return {
    initialize : initialize
  };
});
