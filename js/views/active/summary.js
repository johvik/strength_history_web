define([
  'jquery',
  'underscore',
  'backbone',
  'globals/datehandler',
  'globals/exercise',
  'globals/workout',
  'globals/historydata',
  'models/workoutdata',
  'views/global/topmessage',
  'views/active/summaryrow',
  'views/global/confirm',
  'text!templates/active/summary.html',
  'text!templates/global/broken.html'
], function($, _, Backbone, DateHandler, Exercises, Workouts, HistoryData, WorkoutDataModel, TopMessage, ActiveSummaryRowView, ConfirmView, activeSummaryTemplate, globalBrokenTemplate) {
  var ActiveWorkoutSummary = Backbone.View.extend({
    events : {
      'click button.back' : 'onBack',
      'click button.discard' : 'onDiscard',
      'click button.save' : 'onSave',
      'click tr.click' : 'onRowClick',
      'change input#activeDate' : 'onDataChange'
    },
    initialize : function() {
      this.data = JSON.parse(sessionStorage.getItem('workoutData'));
      this.$el.html(_.template(activeSummaryTemplate, {
        workoutName : this.getWorkoutName(),
        date : DateHandler.toDateTimeLocalString(new Date(this.data.time)),
        first : this.options.step === 1,
        edit : this.options.edit === true
      }));
      var _self = this;
      _.each(this.data.data, function(i) {
        _self.$('table tbody:first').append(new ActiveSummaryRowView({
          data : i
        }).render().el);
      });
    },
    getWorkoutName : function() {
      var workout = Workouts.get(this.data.workout);
      if (_.isObject(workout)) {
        return workout.get('name');
      }
      return _.template(globalBrokenTemplate, {
        type : 'Workout'
      });
    },
    render : function() {
      return this;
    },
    onBack : function() {
      if (this.options.edit === true) {
        sessionStorage.removeItem('workoutData'); // Remove data
        sessionStorage.removeItem('exerciseData');
        Backbone.history.navigate('history', {
          trigger : true
        });
      } else {
        Backbone.history.navigate('run/' + this.data.workout + '/' + (this.options.step - 1), {
          trigger : true
        });
      }
    },
    onDiscard : function() {
      if (this.options.edit === true) {
        TopMessage.close();
        var _self = this;
        new ConfirmView({
          callback : function() {
            sessionStorage.removeItem('workoutData'); // Remove data
            sessionStorage.removeItem('exerciseData');
            new WorkoutDataModel({
              _id : _self.data._id
            }).destroy({
              error : function() {
                TopMessage.setError({
                  message : 'Failed to delete the data on the server. Please refresh.'
                });
              }
            });
            HistoryData.remove(_self.data._id);
            Backbone.history.navigate('history', {
              trigger : true
            });
            // Update latest, it might have changed
            _self.model.latest();
          }
        }).render();
      } else {
        sessionStorage.removeItem('workoutData'); // Remove data
        sessionStorage.removeItem('exerciseData');
        Backbone.history.navigate('', {
          trigger : true
        });
      }
    },
    onSave : function() {
      if (this.$('button.save').hasClass('disabled')) {
        return; // Prevent multiple clicks
      }
      this.$('button.save').button('loading');
      TopMessage.close();
      this.$('table:first tr').removeClass('danger');
      var workoutData = new WorkoutDataModel(this.data);
      if (workoutData.isValid()) {
        var _self = this;
        var old = undefined;
        if (_self.options.edit === true) {
          old = HistoryData.get(workoutData.id);
          HistoryData.remove(old.cid);
        }
        HistoryData.create(workoutData, {
          success : function() {
            // Update latest
            var workout = Workouts.get(_self.data.workout);
            if (_.isObject(workout)) {
              workout.latest();
            }
            sessionStorage.removeItem('workoutData'); // Remove data
            sessionStorage.removeItem('exerciseData');
            if (_self.options.edit === true) {
              Backbone.history.navigate('history', {
                trigger : true
              });
            } else {
              Backbone.history.navigate('', {
                trigger : true
              });
            }
          },
          error : function(data) {
            if (data.isNew()) {
              // Don't destroy if update fails
              data.destroy();
            }
            TopMessage.setError({
              message : 'Failed to save the data on the server.'
            });
            if (_.isObject(old)) {
              HistoryData.push(old);
            }
            _self.$('button.save').button('reset');
          }
        });
      } else {
        var error = workoutData.validationError;
        _.each(error.sets, function(i) {
          this.$('table:first tr').eq(i).addClass('danger');
        });
        this.$('button.save').button('reset');
      }
    },
    onRowClick : function(e) {
      var index = this.$('tr.click').index(this.$(e.currentTarget));
      if (this.options.edit === true) {
        Backbone.history.navigate('history/edit/workout/' + this.data.workout + '/' + (index + 1), {
          trigger : true
        });
      } else {
        Backbone.history.navigate('run/' + this.data.workout + '/' + (index + 1), {
          trigger : true
        });
      }
    },
    onDataChange : function() {
      this.data.time = DateHandler.parseDateTimeLocalString(this.$('#activeDate').val()).getTime();
      sessionStorage.setItem('workoutData', JSON.stringify(this.data));
    }
  });
  return ActiveWorkoutSummary;
});
