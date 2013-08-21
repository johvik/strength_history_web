define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'globals/exercise',
  'views/exercise/item',
  'text!templates/exercise/list.html'
], function($, _, Backbone, Vm, Exercises, ExerciseItemView, exerciseListTemplate) {
  var ExerciseListPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #create-exercise' : 'createExercise'
    },
    initialize : function() {
      this.listenTo(Exercises, 'add', this.addOne);
      this.listenTo(Exercises, 'reset sort', this.reset);
      $(this.el).html(_.template(exerciseListTemplate));
    },
    reset : function() {
      this.$('table tbody').empty();
      this.render();
      if (_.isString(this.editCid)) {
        var index = Exercises.indexOf(Exercises.get(this.editCid));
        if (0 <= index) {
          // Trigger edit on the new item
          this.$('tbody tr td.value:first-child a:eq(' + index + ')').trigger('click');
        }
      }
    },
    render : function() {
      this.addAll();
    },
    createExercise : function() {
      var newItem = Exercises.create({
        name : 'New exercise',
        standardIncrease : 2.5
      });
      this.editCid = newItem.cid; // Start edit
    },
    addOne : function(exercise) {
      var exerciseView = Vm.create('ex_' + exercise.cid, ExerciseItemView, {
        model : exercise,
        attributes : {
          master : this
        }
      });
      this.$el.find('table tbody:first').append(exerciseView.render().el);
    },
    addAll : function() {
      Exercises.each(this.addOne, this);
    }
  });
  return ExerciseListPage;
});
