define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'text!templates/active/summary.html'
], function($, _, Backbone, Exercises, activeSummaryTemplate) {
  var ActiveWorkoutSummary = Backbone.View.extend({
    events : {
      'click button.back' : 'onBack',
      'click button.save' : 'onSave'
    },
    initialize : function() {
      // TODO
      var time = JSON.parse(sessionStorage.getItem('workoutData')).time;
      this.$el.html(_.template(activeSummaryTemplate, {
        workout : this.model,
        time : time
      }));
    },
    render : function() {
      return this;
    },
    onBack : function() {
      Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step - 1), {
        trigger : true
      });
    },
    onSave : function() {
      // TODO
      Backbone.history.navigate('log', {
        trigger : true
      });
    }
  });
  return ActiveWorkoutSummary;
});
