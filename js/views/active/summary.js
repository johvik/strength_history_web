define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'globals/workout',
  'models/workoutdata',
  'views/active/summaryrow',
  'text!templates/active/summary.html'
], function($, _, Backbone, Exercises, Workouts, WorkoutDataModel, ActiveSummaryRowView, activeSummaryTemplate) {
  var ActiveWorkoutSummary = Backbone.View.extend({
    events : {
      'click button.back' : 'onBack',
      'click button.discard' : 'onDiscard',
      'click button.save' : 'onSave'
    },
    initialize : function() {
      this.data = JSON.parse(sessionStorage.getItem('workoutData'));
      this.$el.html(_.template(activeSummaryTemplate, {
        workout : this.model,
        time : this.data.time
      }));
      var _self = this;
      _.each(this.data.data, function(i) {
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
      this.$('table:first tr').removeClass('danger');
      var workoutData = new WorkoutDataModel(this.data);
      if (workoutData.isValid()) {
        var _self = this;
        workoutData.save({}, {
          success : function() {
            // Update latest
            var workout = Workouts.get(_self.data.workout);
            if (_.isObject(workout)) {
              workout.latest();
            }
            _self.onDiscard();
          }
        });
      } else {
        var error = workoutData.validationError;
        if (error.data) {
          // TODO Notify user, too many exercises
        }
        _.each(error.sets, function(i) {
          this.$('table:first tr').eq(i).addClass('danger');
        });
      }
    }
  });
  return ActiveWorkoutSummary;
});
