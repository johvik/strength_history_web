define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'globals/exercise',
  'views/active/previous',
  'text!templates/active/start.html'
], function($, _, Backbone, Events, Exercises, ActivePreviousView, activeStartTemplate) {
  var ActiveWorkoutStart = Backbone.View.extend({
    events : {
      'click button.start' : 'onStart',
      'click button.cancel' : 'onCancel'
    },
    initialize : function() {
      this.listenTo(Exercises, 'sync', this.reset);
      this.$el.html(_.template(activeStartTemplate, {
        workout : this.model
      }));
      this.reset();
    },
    reset : function() {
      Events.trigger('previous:clear');
      var _self = this;
      var exercises = this.model.get('exercises');
      _.each(_.unique(exercises), function(exerciseId) {
        var exercise = Exercises.get(exerciseId);
        if (_.isObject(exercise)) {
          _self.$('table tbody:first').append(new ActivePreviousView({
            model : exercise
          }).render().el);
        }
      });
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
