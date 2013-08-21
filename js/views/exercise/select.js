define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'globals/exercise',
  'text!templates/exercise/option.html'
], function($, _, Backbone, Vm, Exercises, ExerciseOptionTemplate) {
  var ExerciseSelectPage = Backbone.View.extend({
    tagName : 'select',
    className : 'form-control',
    initialize : function() {
      this.listenTo(Exercises, 'add', this.addOne);
      this.listenTo(Exercises, 'reset sort', this.reset);
    },
    reset : function() {
      var oldVal = this.$el.val();
      this.$el.empty();
      this.render();
      this.$el.val(oldVal);
    },
    render : function() {
      this.addAll();
      return this;
    },
    addOne : function(exercise) {
      this.$el.append(_.template(ExerciseOptionTemplate, {
        exercise : exercise
      }));
    },
    addAll : function() {
      Exercises.each(this.addOne, this);
    }
  });
  return ExerciseSelectPage;
});
