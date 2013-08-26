define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/workout',
  'globals/exercise',
  'views/active/step',
  'views/active/summary',
  'text!templates/global/notfound.html',
  'text!templates/active/workoutdatagone.html'
], function($, _, Backbone, Vm, Events, Workouts, Exercise, ActiveStepView, ActiveSummaryView, globalNotFoundTemplate, workoutDataGoneTemplate) {
  var WorkoutDataEditPage = Backbone.View.extend({
    el : '#page',
    initialize : function() {
      var model = Workouts.get(this.options.workoutId);
      if (_.isUndefined(model)) {
        // Not found try to listen for it!
        var workoutId = this.options.workoutId;
        this.listenTo(Workouts, 'add', function(workout) {
          if (workoutId === workout.id) {
            this.workoutFound(workout);
          }
        });
        this.listenTo(Workouts, 'reset', function(workouts) {
          var workout = workouts.get(workoutId);
          if (!_.isUndefined(workout)) {
            this.workoutFound(workout);
          }
        });
      } else {
        this.workoutFound(model);
      }
    },
    workoutFound : function(model) {
      this.stopListening(Workouts);
      this.model = model;
      this.render();
    },
    render : function() {
      if (_.isUndefined(this.model)) {
        this.$el.html(globalNotFoundTemplate);
      } else {
        var step = parseInt(this.options.step, 10);
        if (_.isNaN(step)) {
          step = 0;
        }

        var exercises = this.model.get('exercises');
        if (_.isNull(sessionStorage.getItem('workoutData'))) {
          // Data is gone!
          this.$el.html(workoutDataGoneTemplate);
        } else if (step >= 1 && step <= exercises.length) {
          // Step page
          var activeStepView = new ActiveStepView({
            model : this.model,
            step : step,
            edit : true
          });
          this.$el.html(activeStepView.render().el);
        } else {
          // Summary edit page
          step = 1;
          var activeSummaryView = new ActiveSummaryView({
            model : this.model,
            step : step,
            edit : true
          });
          this.$el.html(activeSummaryView.render().el);
        }
      }
    }
  });
  return WorkoutDataEditPage;
});
