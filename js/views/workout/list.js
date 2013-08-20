define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/workout',
  'text!templates/workout/list.html',
  'views/workout/item'
], function($, _, Backbone, Vm, WorkoutCollection, workoutListTemplate, WorkoutItemView) {
  var WorkoutListPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #create-workout' : 'createWorkout'
    },
    workouts : new WorkoutCollection(),
    initialize : function() {
      this.listenTo(this.workouts, 'add', this.addOne);
      this.listenTo(this.workouts, 'reset', this.reset);
      this.listenTo(this.workouts, 'sort', this.reset);
      this.listenTo(this.workouts, 'change', function() {
        this.workouts.sort();
      });
      this.workouts.fetch();
      $(this.el).html(_.template(workoutListTemplate));
    },
    reset : function() {
      this.$('table tbody').empty();
      this.render();
    },
    render : function() {
      this.addAll();
    },
    createWorkout : function() {
      var newItem = this.workouts.create({
        name : 'New workout',
        exercises : []
      });
      this.listenToOnce(newItem, 'sync', function() {
        var index = this.workouts.indexOf(newItem);
        if (0 <= index) {
          // Trigger edit on the new item
          this.$('tbody tr td.value:first-child a:eq(' + index + ')').trigger('click');
        }
      });
    },
    addOne : function(workout) {
      var workoutView = Vm.create('wo_' + workout.cid, WorkoutItemView, {
        model : workout
      });
      this.$el.find('table tbody:first').append(workoutView.render().el);
    },
    addAll : function() {
      this.workouts.each(this.addOne, this);
    }
  });
  return WorkoutListPage;
});
