define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/workout',
  'views/workout/row',
  'text!templates/workout/list.html'
], function($, _, Backbone, Vm, Events, Workouts, WorkoutRowView, workoutListTemplate) {
  var WorkoutListPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #create-workout' : 'createWorkout'
    },
    initialize : function() {
      this.listenTo(Workouts, 'add', this.addOne);
      this.listenTo(Workouts, 'reset sort', this.reset);
      this.listenTo(Events, 'workouts:stopEdit', function() {
        delete this.editCid;
      });
      $(this.el).html(_.template(workoutListTemplate));
    },
    reset : function() {
      Events.trigger('workouts:clear');
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
      var workoutView = Vm.create('wo_' + workout.cid, WorkoutRowView, {
        model : workout
      });
      this.$el.find('table tbody:first').append(workoutView.render().el);
    },
    addAll : function() {
      Workouts.each(this.addOne, this);
    }
  });
  return WorkoutListPage;
});
