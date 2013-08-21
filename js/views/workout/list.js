define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'globals/workout',
  'views/workout/item',
  'text!templates/workout/list.html'
], function($, _, Backbone, Vm, Workouts, WorkoutItemView, workoutListTemplate) {
  var WorkoutListPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #create-workout' : 'createWorkout'
    },
    initialize : function() {
      this.listenTo(Workouts, 'add', this.addOne);
      this.listenTo(Workouts, 'reset sort', this.reset);
      $(this.el).html(_.template(workoutListTemplate));
    },
    reset : function() {
      this.$('table tbody').empty();
      this.render();
      if (_.isString(this.editCid)) {
        var index = Workouts.indexOf(Workouts.get(this.editCid));
        if (0 <= index) {
          // Trigger edit on the new item
          this.$('tbody tr td.value:first-child a:eq(' + index + ')').trigger('click');
        }
      }
    },
    render : function() {
      this.addAll();
    },
    createWorkout : function() {
      var newItem = Workouts.create({
        name : 'New workout',
        exercises : []
      });
      this.editCid = newItem.cid; // Start edit
    },
    addOne : function(workout) {
      var workoutView = Vm.create('wo_' + workout.cid, WorkoutItemView, {
        model : workout,
        attributes : {
          master : this
        }
      });
      this.$el.find('table tbody:first').append(workoutView.render().el);
    },
    addAll : function() {
      Workouts.each(this.addOne, this);
    }
  });
  return WorkoutListPage;
});
