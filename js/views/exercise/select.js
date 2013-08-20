define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/exercise',
  'text!templates/exercise/option.html'
], function($, _, Backbone, Vm, ExerciseCollection, ExerciseOptionTemplate) {
  var ExerciseSelectPage = Backbone.View.extend({
    tagName : 'select',
    className : 'form-control',
    exercises : new ExerciseCollection(),
    initialize : function() {
      this.listenTo(this.exercises, 'add', this.addOne);
      this.listenTo(this.exercises, 'reset sort sync', this.reset);
      this.listenTo(this.exercises, 'change', function() {
        this.exercises.sort();
      });
      this.exercises.fetch();
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
      this.exercises.each(this.addOne, this);
    }
  });
  return ExerciseSelectPage;
});
