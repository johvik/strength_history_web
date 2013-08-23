define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'views/active/summaryrow',
  'text!templates/active/summary.html'
], function($, _, Backbone, Exercises, ActiveSummaryRowView, activeSummaryTemplate) {
  var ActiveWorkoutSummary = Backbone.View.extend({
    events : {
      'click button.back' : 'onBack',
      'click button.discard' : 'onDiscard',
      'click button.save' : 'onSave'
    },
    initialize : function() {
      var data = JSON.parse(sessionStorage.getItem('workoutData'));
      this.$el.html(_.template(activeSummaryTemplate, {
        workout : this.model,
        time : data.time
      }));
      _self = this;
      _.each(data.data, function(i) {
        _self.$('table tbody:first').append(new ActiveSummaryRowView({
          data : i
        }).render().el);
      });
    },
    render : function() {
      return this;
    },
    onBack : function() {
      Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step - 1), {
        trigger : true
      });
    },
    onDiscard : function() {
      sessionStorage.removeItem('workoutData'); // Remove data
      Backbone.history.navigate('log', {
        trigger : true
      });
    },
    onSave : function() {
      // TODO Save
      this.onDiscard();
    }
  });
  return ActiveWorkoutSummary;
});
