define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'text!templates/active/exerciserow.html',
  'text!templates/global/broken.html'
], function($, _, Backbone, Exercises, activeExerciseRowTemplate, globalBrokenTemplate) {
  var ActiveSummaryRow = Backbone.View.extend({
    tagName : 'tr',
    className : 'click',
    initialize : function() {
      this.listenTo(Exercises, 'sync', this.render);
    },
    render : function() {
      var exercise = Exercises.get(this.options.data.exercise);
      this.$el.html(_.template(activeExerciseRowTemplate, {
        exercisename : _.isObject(exercise) ? exercise.get('name') : _.template(globalBrokenTemplate, {
          type : 'Exercise'
        }),
        sets : this.options.data.sets
      }));
      return this;
    }
  });
  return ActiveSummaryRow;
});
