define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/workout',
  'globals/exercise',
  'views/active/start',
  'views/active/step',
  'views/active/summary',
  'text!templates/global/notfound.html',
  'text!templates/active/workoutdatagone.html'
], function($, _, Backbone, Vm, Events, Workouts, Exercises, ActiveStartView, ActiveStepView, ActiveSummaryView, globalNotFoundTemplate, workoutDataGoneTemplate) {
  var ActiveRunPage = Backbone.View.extend({
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
      var workout = Workouts.get(this.options.workoutId);
      if (step <= 0) {
        if (_.isUndefined(workout)) {
          this.$el.html(globalNotFoundTemplate);
        } else {
          // Start page
          var activeStartView = new ActiveStartView({
            model : workout
          });
          this.$el.html(activeStartView.render().el);
        }
      } else {
        var sessionData = sessionStorage.getItem('workoutData');
        if (_.isNull(sessionData)) {
          // Data is gone!
          this.$el.html(workoutDataGoneTemplate);
        } else {
          var exercises = _.pluck(JSON.parse(sessionData).data, 'exercise');
          if (step <= exercises.length) {
            // Step page
            var activeStepView = new ActiveStepView({
              step : step
            });
            this.$el.html(activeStepView.render().el);
          } else {
            // Summary page
            step = exercises.length + 1;
            var activeSummaryView = new ActiveSummaryView({
              step : step
            });
            this.$el.html(activeSummaryView.render().el);
          }
        }
      }
    }
  });
  return ActiveRunPage;
});
