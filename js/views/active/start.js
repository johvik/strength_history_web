define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'text!templates/active/start.html'
], function($, _, Backbone, Exercises, activeStartTemplate) {
  var ActiveWorkoutStart = Backbone.View.extend({
    events : {
      'click button.start' : 'onStart',
      'click button.cancel' : 'onCancel'
    },
    initialize : function() {
      // TODO Add previous results
      this.$el.html(_.template(activeStartTemplate, {
        workout : this.model
      }));
    },
    render : function() {
      this.$('#activeDate').val(new Date().toISOString().slice(0, -5));
      return this;
    },
    onStart : function() {
      console.log('toskfksodf');
      var data = [];
      _.each(this.model.get('exercises'), function(exercise) {
        data.push({
          exercise : exercise,
          sets : []
        });
      });
      var workoutData = {
        time : new Date(this.$('#activeDate').val()).getTime(),
        workout : this.model.id,
        data : data
      };
      sessionStorage.setItem('workoutData', JSON.stringify(workoutData)); // Reset data
      // Go to next page
      Backbone.history.navigate('run/' + this.model.id + '/1', {
        trigger : true
      });
    },
    onCancel : function() {
      Backbone.history.navigate('log', {
        trigger : true
      });
    }
  });
  return ActiveWorkoutStart;
});
