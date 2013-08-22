define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/workout',
  'globals/exercise',
  'views/active/step',
  'text!templates/active/start.html',
  'text!templates/active/notfound.html'
], function($, _, Backbone, Vm, Events, Workouts, Exercise, ActiveWorkoutStepView, activeStartTemplate, activeNotFoundTemplate) {
  var ActiveStartPage = Backbone.View.extend({
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
        $(this.el).html(_.template(activeNotFoundTemplate));
      } else {
        $(this.el).html(_.template(activeStartTemplate, {
          workout : this.model
        }));
        this.$('#activeDate').val(new Date().toISOString().slice(0, -5));
      }
    }
  });
  return ActiveStartPage;
});
