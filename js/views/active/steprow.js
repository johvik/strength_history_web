define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/active/steprow.html'
], function($, _, Backbone, Events, activeStepRowTemplate) {
  var ActiveStepRow = Backbone.View.extend({
    tagName : 'tr',
    initialize : function(options) {
      this.options = options;
      this.listenTo(Events, 'steprows:clear', this.remove);
    },
    render : function() {
      this.$el.html(_.template(activeStepRowTemplate, {
        weight : this.options.weight,
        reps : this.options.reps
      }));
      return this;
    }
  });
  return ActiveStepRow;
});
