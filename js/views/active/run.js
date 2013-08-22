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
  'text!templates/global/notfound.html'
], function($, _, Backbone, Vm, Events, Workouts, Exercise, ActiveStartView, ActiveStepView, globalNotFoundTemplate) {
  var ActiveRunPage = Backbone.View.extend({
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
      // TODO Create workout data model
      this.stopListening(Workouts);
      this.model = model;
      this.render();
    },
    render : function() {
      if (_.isUndefined(this.model)) {
        this.$el.html(globalNotFoundTemplate);
      } else {
        var data = sessionStorage.getItem('workoutData');
        console.log(data);
        var step = parseInt(this.options.step, 10);
        if (_.isNaN(step)) {
          step = 0;
        }

        var exercises = this.model.get('exercises');
        if (step <= 0) {
          // Start page
          var activeStartView = new ActiveStartView({
            model : this.model
          });
          this.$el.html(activeStartView.render().el);
          console.log('start');
        } else if (step <= exercises.length) {
          // Step page
          var activeStepView = new ActiveStepView({
            model : this.model,
            step : step
          });
          this.$el.html(activeStepView.render().el);
          console.log('step');
        } else {
          // Summary page
          step = exercises.length + 1;
          this.$el.html('summary');
          console.log('summary');
        }
      }
    }
  });
  return ActiveRunPage;
});
