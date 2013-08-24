define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/active/steprow.html'
], function($, _, Backbone, activeStepRowTemplate) {
  var ActiveStepRow = Backbone.View.extend({
    tagName : 'tr',
    initialize : function() {
      // Do nothing
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
