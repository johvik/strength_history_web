define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'text!templates/active/step.html'
], function($, _, Backbone, Exercises, activeStepTemplate) {
  var ActiveWorkoutStep = Backbone.View.extend({
    events : {
      'click button.previous' : 'onPrevious',
      'click button.next' : 'onNext'
    },
    initialize : function() {
      // TODO
      var exercises = this.model.get('exercises');
      this.$el.html(_.template(activeStepTemplate, {
        exercise : Exercises.get(exercises[this.options.step - 1]),
        weightValue : 0,
        repsValue : 1,
        first : this.options.step <= 1,
        last : this.options.step >= exercises.length
      }));
    },
    render : function() {
      return this;
    },
    storeData : function() {
      // TODO
    },
    onPrevious : function() {
      if (this.options.step <= 1) {
        sessionStorage.removeItem('workoutData'); // Remove data
        Backbone.history.navigate('run/' + this.model.id, {
          trigger : true
        });
      } else {
        this.storeData();
        Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step - 1), {
          trigger : true
        });
      }
    },
    onNext : function() {
      this.storeData();
      Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step + 1), {
        trigger : true
      });
    }
  });
  return ActiveWorkoutStep;
});
