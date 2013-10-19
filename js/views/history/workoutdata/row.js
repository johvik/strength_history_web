define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'globals/datehandler',
  'globals/workout',
  'text!templates/history/workoutdata/row.html',
  'text!templates/global/broken.html'
], function($, _, Backbone, Events, DateHandler, Workouts, workoutDataRowTemplate, globalBrokenTemplate) {
  var WorkoutDataRow = Backbone.View.extend({
    tagName : 'tr',
    className : 'click',
    events : {
      'click td' : 'startEdit'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'historydata:clear', this.remove);
    },
    getWorkoutName : function() {
      var workout = Workouts.get(this.model.get('workout'));
      if (_.isObject(workout)) {
        return workout.get('name');
      }
      return _.template(globalBrokenTemplate, {
        type : 'Workout'
      });
    },
    render : function() {
      this.$el.html(_.template(workoutDataRowTemplate, {
        workoutData : this.model,
        workoutName : this.getWorkoutName(),
        date : DateHandler.toDateString(new Date(this.model.get('time')))
      }));
      return this;
    },
    startEdit : function(e) {
      if (!this.$(e.target).is('a')) {
        // Click link
        this.$('td:first a:first')[0].click();
      } else {
        // Set data to be used
        var exerciseData = [];
        var data = this.model.get('data');
        var _self = this;
        _.each(data, function(i, index) {
          var set = _self.model.bestSet(index);
          exerciseData.push({
            id : i.exercise,
            weight : set ? set.weight : 50,
            reps : set ? set.reps : 5
          });
        });
        sessionStorage.setItem('exerciseData', JSON.stringify(exerciseData));
        sessionStorage.setItem('workoutData', JSON.stringify(this.model));
      }
    }
  });
  return WorkoutDataRow;
});
