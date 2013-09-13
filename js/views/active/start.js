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
      // Try to get page from main view
      var savedDate = sessionStorage.getItem('savedDate');
      if (_.isString(savedDate)) {
        this.date = savedDate;
        sessionStorage.removeItem('savedDate');
      } else {
        this.date = new Date().toISOString().slice(0, -5);
      }
      this.exerciseData = [];
      var exercises = this.model.get('exercises');
      var _self = this;
      _.each(exercises, function(i) {
        _self.exerciseData.push({
          id : i,
          weight : 50,
          reps : 5
        });
      });
      this.listenTo(Exercises, 'sync', this.reset);
      this.listenTo(Exercises, 'latest:exercise', function(exercise) {
        if (_.contains(exercises, exercise.id)) {
          _.each(this.exerciseData, function(i) {
            if (i.id === exercise.id) {
              var data = exercise.bestLatest();
              if (_.isObject(data)) {
                i.weight = data.weight;
                i.reps = data.reps;
              }
            }
          });
        }
      });
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
      this.$('#activeDate').val(this.date);
      return this;
    },
    onStart : function() {
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
      sessionStorage.setItem('exerciseData', JSON.stringify(this.exerciseData));
      sessionStorage.setItem('workoutData', JSON.stringify(workoutData)); // Reset data
      // Go to next page
      Backbone.history.navigate('run/' + this.model.id + '/1', {
        trigger : true
      });
    },
    onCancel : function() {
      sessionStorage.removeItem('workoutData'); // Remove data
      sessionStorage.removeItem('exerciseData');
      Backbone.history.navigate('', {
        trigger : true
      });
    }
  });
  return ActiveWorkoutStart;
});
