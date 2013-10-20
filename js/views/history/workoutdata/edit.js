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
  'text!templates/active/workoutdatagone.html'
], function($, _, Backbone, Vm, Events, Workouts, Exercises, ActiveStepView, ActiveSummaryView, workoutDataGoneTemplate) {
  var WorkoutDataEditPage = Backbone.View.extend({
    el : '#page',
    initialize : function() {
      var workout = Workouts.get(this.options.workoutId);
      if (_.isUndefined(workout)) {
        this.listenTo(Workouts, 'sync', this.render); // If workout isn't loaded directly
      }
      this.listenTo(Exercises, 'sync', this.render); // If exercises aren't loaded directly
    },
    render : function() {
      var step = parseInt(this.options.step, 10);
      if (_.isNaN(step)) {
        step = 0;
      }

      var sessionData = sessionStorage.getItem('workoutData');
      if (_.isNull(sessionData)) {
        // Data is gone!
        this.$el.html(workoutDataGoneTemplate);
      } else {
        var exercises = _.pluck(JSON.parse(sessionData).data, 'exercise');
        if (step >= 1 && step <= exercises.length) {
          // Step page
          var activeStepView = new ActiveStepView({
            step : step,
            edit : true
          });
          this.$el.html(activeStepView.render().el);
        } else {
          // Summary edit page
          step = 1;
          var activeSummaryView = new ActiveSummaryView({
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
