define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/exercise',
  'globals/workout',
  'views/global/topmessage',
  'views/workout/row',
  'text!templates/workout/list.html'
], function($, _, Backbone, Vm, Events, Exercises, Workouts, TopMessage, WorkoutRowView, workoutListTemplate) {
  var WorkoutPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #create-workout' : 'createWorkout'
    },
    initialize : function(options) {
      this.options = options;
      this.listenTo(Workouts, 'change:_id', function(w) {
        // New items will trigger id change
        this.options.editId = w.id;
        // A sort will be done after a change therefore no need to use trigger
        Backbone.history.navigate('workouts/edit/' + w.id);
      });
      this.listenTo(Exercises, 'sync', this.reset); // If exercises aren't loaded directly
      this.listenTo(Workouts, 'add', this.addOne);
      this.listenTo(Workouts, 'reset sort', this.reset);
      this.listenTo(Events, 'workouts:stopEdit', function() {
        delete this.options.editId;
      });
      $(this.el).html(workoutListTemplate);
    },
    reset : function() {
      Events.trigger('workouts:clear');
      this.render();
    },
    render : function() {
      this.addAll();
      if (_.isString(this.options.editId)) {
        Events.trigger('workouts:edit', this.options.editId);
      }
    },
    createWorkout : function() {
      TopMessage.close();
      Workouts.create({
        name : 'New workout',
        exercises : []
      }, {
        error : function(workout) {
          workout.destroy();
          TopMessage.setError({
            message : 'Failed to save the data on the server.'
          });
        }
      });
    },
    addOne : function(workout) {
      var workoutView = Vm.create('wo_' + workout.cid, WorkoutRowView, {
        model : workout,
        editId : this.options.editId
      });
      this.$el.find('table tbody:first').append(workoutView.render().el);
    },
    addAll : function() {
      Workouts.each(this.addOne, this);
    }
  });
  return WorkoutPage;
});
