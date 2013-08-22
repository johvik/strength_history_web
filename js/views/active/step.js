define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/active/step.html'
], function($, _, Backbone, Events, activeStepTemplate) {
  var ActiveWorkoutStep = Backbone.View.extend({
    initialize : function() {
      // TODO
    },
    render : function() {
      return this;
    }
  });
  return ActiveWorkoutStep;
});
