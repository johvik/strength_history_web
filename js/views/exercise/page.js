define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/exercise',
  'views/exercise/row',
  'text!templates/exercise/list.html'
], function($, _, Backbone, Vm, Events, Exercises, ExerciseRowView, exerciseListTemplate) {
  var ExercisePage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #create-exercise' : 'createExercise'
    },
    initialize : function() {
      this.listenTo(Exercises, 'change:_id', function(e) {
        // New items will trigger id change
        this.options.editId = e.id;
        // A sort will be done after a change therefore no need to use trigger
        Backbone.history.navigate('exercises/edit/' + e.id);
      });
      this.listenTo(Exercises, 'add', this.addOne);
      this.listenTo(Exercises, 'reset sort', this.reset);
      this.listenTo(Events, 'exercises:stopEdit', function() {
        delete this.options.editId;
      });
      $(this.el).html(exerciseListTemplate);
    },
    reset : function() {
      Events.trigger('exercises:clear');
      this.render();
    },
    render : function() {
      this.addAll();
      if (_.isString(this.options.editId)) {
        Events.trigger('exercises:edit', this.options.editId);
      }
    },
    createExercise : function() {
      // TODO Handle error on all create
      Exercises.create({
        name : 'New exercise',
        standardIncrease : 2.5
      });
    },
    addOne : function(exercise) {
      var exerciseView = Vm.create('ex_' + exercise.cid, ExerciseRowView, {
        model : exercise,
        editId : this.options.editId
      });
      this.$el.find('table tbody:first').append(exerciseView.render().el);
    },
    addAll : function() {
      Exercises.each(this.addOne, this);
    }
  });
  return ExercisePage;
});
