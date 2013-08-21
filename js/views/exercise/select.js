define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'globals/exercise',
  'text!templates/exercise/selectadd.html',
  'text!templates/exercise/selectremove.html',
  'text!templates/exercise/option.html',
  'text!templates/exercise/optionselect.html'
], function($, _, Backbone, Vm, Exercises, exerciseSelectAddTemplate, exerciseSelectRemoveTemplate, exerciseOptionTemplate, exerciseOptionSelectTemplate) {
  var ExerciseSelectPage = Backbone.View.extend({
    className : 'form-group',
    initialize : function() {
      this.listenTo(Exercises, 'add', this.addOne);
      this.listenTo(Exercises, 'reset sort', this.reset);
      if (this.options.type === 'add') {
        this.$el.html(exerciseSelectAddTemplate);
      } else if (this.options.type === 'remove') {
        this.$el.html(exerciseSelectRemoveTemplate);
      } else {
        throw new Error('Invalid ExerciseSelect type');
      }
    },
    reset : function() {
      var oldVal = this.$('select').val();
      this.$('select').empty();
      this.render();
      this.$('select').val(oldVal);
    },
    render : function() {
      // Add extra option
      this.$('select').append(exerciseOptionSelectTemplate);
      this.addAll();
      return this;
    },
    addOne : function(exercise) {
      this.$('select').append(_.template(exerciseOptionTemplate, {
        exercise : exercise
      }));
    },
    addAll : function() {
      Exercises.each(this.addOne, this);
    }
  });
  return ExerciseSelectPage;
});
