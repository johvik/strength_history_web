define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'text!templates/active/step.html'
], function($, _, Backbone, Exercises, activeStepTemplate) {
  var ActiveWorkoutStep = Backbone.View.extend({
    initialize : function() {
      // TODO
      this.$el.html(_.template(activeStepTemplate, {
        exercise : Exercises.get(this.model.get('exercises')[this.options.step - 1]),
        weightValue : 0,
        repsValue : 1
      }));
    },
    render : function() {
      return this;
    }
  });
  return ActiveWorkoutStep;
});
