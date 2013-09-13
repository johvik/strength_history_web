define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events'
], function($, _, Backbone, Vm, Events) {
  var AppRouter = Backbone.Router.extend({
    routes : {
      'history(/edit/weight/:id)' : 'history',
      'exercises(/edit/:id)' : 'exercises',
      'workouts(/edit/:id)' : 'workouts',
      'run/:workout(/:step)' : 'runWorkout',
      'history/edit/workout/:workout(/:step)' : 'editWorkout',

      // Allow '/' at end of path
      '*dummy/' : 'endsWithSlash',
      // Default - catch all
      '*actions' : 'defaultRoute'
    },
    endsWithSlash : function(dummy) {
      Backbone.history.navigate(dummy, {
        trigger : true,
        replace : true
      });
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
          'views/home/page'
        ], function(HomePage) {
          $('#nav-home').addClass('active');
          var homePage = Vm.create('Page', HomePage);
          homePage.render();
          // Make sure path is home page
          Backbone.history.navigate('', {
            replace : true
          });
        });
      }
    },
    history : function(id) {
      require([
        'views/history/page'
      ], function(HistoryPage) {
        $('#nav-history').addClass('active');
        var historyPage = Vm.create('Page', HistoryPage, {
          editId : id
        });
        historyPage.render();
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
        'views/history/workoutdata/edit'
      ], function(WorkoutDataEditPage) {
        $('#nav-history').addClass('active');
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
