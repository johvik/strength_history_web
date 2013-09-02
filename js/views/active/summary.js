define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'globals/workout',
  'globals/historydata',
  'models/workoutdata',
  'views/active/summaryrow',
  'views/global/confirm',
  'text!templates/active/summary.html',
  'text!templates/messages/savefailed.html'
], function($, _, Backbone, Exercises, Workouts, HistoryData, WorkoutDataModel, ActiveSummaryRowView, ConfirmView, activeSummaryTemplate, saveFailedTemplate) {
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
        workout : this.model,
        time : this.data.time,
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
        Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step - 1), {
          trigger : true
        });
      }
    },
    onDiscard : function() {
      if (this.options.edit === true) {
        var _self = this;
        new ConfirmView({
          callback : function() {
            sessionStorage.removeItem('workoutData'); // Remove data
            sessionStorage.removeItem('exerciseData');
            new WorkoutDataModel({
              _id : _self.data._id
            }).destroy();
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
      // TODO Handle messages better, maybe stack and timeout?
      $('#top-message :first-child').alert('close'); // Hide previous message
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
          error : function() {
            $('#top-message').html(saveFailedTemplate);
            $('#top-message :first-child').addClass('in');
            if (_.isObject(old)) {
              HistoryData.push(old);
            }
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
      if (this.options.edit === true) {
        Backbone.history.navigate('history/edit/workout/' + this.model.id + '/' + (index + 1), {
          trigger : true
        });
      } else {
        Backbone.history.navigate('run/' + this.model.id + '/' + (index + 1), {
          trigger : true
        });
      }
    },
    onDataChange : function() {
      this.data.time = new Date(this.$('#activeDate').val()).getTime();
      sessionStorage.setItem('workoutData', JSON.stringify(this.data));
    }
  });
  return ActiveWorkoutSummary;
});
