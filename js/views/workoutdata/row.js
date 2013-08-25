define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'globals/workout',
  'text!templates/workoutdata/row.html',
  'text!templates/global/broken.html'
], function($, _, Backbone, Events, Workouts, workoutDataRowTemplate, globalBrokenTemplate) {
  var WorkoutDataRow = Backbone.View.extend({
    tagName : 'tr',
    className : 'click',
    events : {
      'click a' : 'startEdit',
      'click td' : 'startEdit',
      'click button.delete' : 'onDelete'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'workoutdata:clear', this.remove);
    },
    getWorkoutName : function() {
      var workout = Workouts.get(this.model.get('workout'));
      if (_.isObject(workout)) {
        return workout.get('name');
      }
      return _.template(globalBrokenTemplate, {
        type : 'Workout'
      });
    },
    render : function() {
      this.$el.html(_.template(workoutDataRowTemplate, {
        workoutData : this.model,
        workoutName : this.getWorkoutName()
      }));
      return this;
    },
    startEdit : function(e) {
      console.log(this.model.get('workout'));
      e.preventDefault();
      e.stopPropagation();
      // TODO Edit
    },
    onDelete : function(e) {
      // TODO Create better solution for the delete button
      e.stopPropagation();
      this.model.destroy();
      var workout = Workouts.get(this.model.get('workout'));
      if (_.isObject(workout)) {
        // Update latest, it might have changed
        workout.latest();
      }
    }
  });
  return WorkoutDataRow;
});
