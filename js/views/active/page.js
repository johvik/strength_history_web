define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/activeworkout',
  'views/active/row',
  'text!templates/active/list.html'
], function($, _, Backbone, Vm, Events, ActiveWorkouts, ActiveWorkoutRowView, activeListTemplate) {
  var ActivePage = Backbone.View.extend({
    el : '#page',
    initialize : function() {
      this.listenTo(ActiveWorkouts, 'add', this.addOne);
      this.listenTo(ActiveWorkouts, 'latest reset sort', this.reset);
      $(this.el).html(_.template(activeListTemplate));
    },
    reset : function() {
      Events.trigger('activeworkouts:clear');
      this.render();
    },
    render : function() {
      this.addAll();
    },
    addOne : function(workout) {
      var activeWorkoutView = Vm.create('awo_' + workout.cid, ActiveWorkoutRowView, {
        model : workout
      });
      this.$el.find('table tbody:first').append(activeWorkoutView.render().el);
    },
    addAll : function() {
      ActiveWorkouts.each(this.addOne, this);
    }
  });
  return ActivePage;
});
