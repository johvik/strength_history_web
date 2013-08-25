define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/active/exerciserow.html'
], function($, _, Backbone, Events, activeExerciseRowTemplate) {
  var ActivePrevious = Backbone.View.extend({
    tagName : 'tr',
    initialize : function() {
      this.listenTo(this.model, 'latest:exercise', this.render);
      this.listenTo(Events, 'previous:clear', this.remove);
    },
    render : function() {
      this.$el.html(_.template(activeExerciseRowTemplate, {
        exercisename : this.model.get('name'),
        sets : this.model.get('latest')
      }));
      return this;
    }
  });
  return ActivePrevious;
});
