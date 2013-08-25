define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'globals/workout',
  'globals/workoutdata',
  'models/workoutdata',
  'views/active/summaryrow',
  'text!templates/active/summary.html',
  'text!templates/messages/savefailed.html'
], function($, _, Backbone, Exercises, Workouts, WorkoutData, WorkoutDataModel, ActiveSummaryRowView, activeSummaryTemplate, saveFailedTemplate) {
  var ActiveWorkoutSummary = Backbone.View.extend({
    events : {
      'click button.back' : 'onBack',
      'click button.discard' : 'onDiscard',
      'click button.save' : 'onSave',
      'click tr.click' : 'onRowClick'
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
      sessionStorage.removeItem('exerciseData');
      Backbone.history.navigate('log', {
        trigger : true
      });
    },
    onSave : function() {
      // TODO Handle messages better, maybe stack and timeout?
      $('#top-message :first-child').alert('close'); // Hide previous message
      this.$('table:first tr').removeClass('danger');
      var workoutData = new WorkoutDataModel(this.data);
      if (workoutData.isValid()) {
        var _self = this;
        WorkoutData.create(workoutData, {
          success : function() {
            // Update latest
            var workout = Workouts.get(_self.data.workout);
            if (_.isObject(workout)) {
              workout.latest();
            }
            _self.onDiscard();
          },
          error : function() {
            $('#top-message').html(saveFailedTemplate);
            $('#top-message :first-child').addClass('in');
          }
        });
      } else {
        var error = workoutData.validationError;
        _.each(error.sets, function(i) {
          this.$('table:first tr').eq(i).addClass('danger');
        });
      }
    },
    onRowClick : function(e) {
      var index = this.$('tr.click').index(this.$(e.currentTarget));
      Backbone.history.navigate('run/' + this.model.id + '/' + (index + 1), {
        trigger : true
      });
    }
  });
  return ActiveWorkoutSummary;
});
