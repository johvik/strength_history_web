define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/active/previous.html'
], function($, _, Backbone, Events, activePreviousTemplate) {
  var ActivePrevious = Backbone.View.extend({
    tagName : 'tr',
    initialize : function() {
      this.listenTo(this.model, 'latest:exercise', this.render);
      this.model.latest();
      this.listenTo(Events, 'previous:clear', this.remove);
    },
    render : function() {
      this.$el.html(_.template(activePreviousTemplate, {
        exercise : this.model,
        sets : this.model.get('latest')
      }));
      return this;
    }
  });
  return ActivePrevious;
});
