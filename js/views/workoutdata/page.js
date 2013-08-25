define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/workoutdata',
  'globals/workout',
  'views/workoutdata/row',
  'text!templates/workoutdata/list.html'
], function($, _, Backbone, Vm, Events, WorkoutData, Workouts, WorkoutDataRowView, workoutListTemplate) {
  var WorkoutDataPage = Backbone.View.extend({
    el : '#page',
    initialize : function() {
      this.listenTo(Workouts, 'sync', this.reset); // If workouts aren't loaded directly
      this.listenTo(WorkoutData, 'add', this.addOne);
      this.listenTo(WorkoutData, 'reset sort', this.reset);
      $(this.el).html(_.template(workoutListTemplate));
    },
    reset : function() {
      Events.trigger('workoutdata:clear');
      this.render();
    },
    render : function() {
      this.addAll();
    },
    addOne : function(workoutData) {
      var workoutDataView = Vm.create('wd_' + workoutData.cid, WorkoutDataRowView, {
        model : workoutData
      });
      this.$el.find('table tbody:first').append(workoutDataView.render().el);
    },
    addAll : function() {
      WorkoutData.each(this.addOne, this);
    }
  });
  return WorkoutDataPage;
});
