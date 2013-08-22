define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/activeworkout',
  'views/workout/row',
  'text!templates/active/list.html'
], function($, _, Backbone, Vm, Events, ActiveWorkouts, WorkoutRowView, activeListTemplate) {
  var ActivePage = Backbone.View.extend({
    el : '#page',
    initialize : function() {
      this.listenTo(ActiveWorkouts, 'add', this.addOne);
      this.listenTo(ActiveWorkouts, 'latest reset sort', this.reset);
      $(this.el).html(_.template(activeListTemplate));
    },
    reset : function() {
      Events.trigger('workouts:clear');
      this.render();
    },
    render : function() {
      this.addAll();
    },
    addOne : function(workout) {
      var workoutView = Vm.create('wo_' + workout.cid, WorkoutRowView, {
        model : workout
      });
      this.$el.find('table tbody:first').append(workoutView.render().el);
    },
    addAll : function() {
      ActiveWorkouts.each(this.addOne, this);
    }
  });
  return ActivePage;
});
