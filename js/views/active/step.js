define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'views/active/steprow',
  'text!templates/active/step.html'
], function($, _, Backbone, Exercises, ActiveStepRowView, activeStepTemplate) {
  var ActiveWorkoutStep = Backbone.View.extend({
    events : {
      'click button.add' : 'onAddSet',
      'click button.remove' : 'onRemoveSet',
      'click button.previous' : 'onPrevious',
      'click button.next' : 'onNext',
      'change input#weight-step' : 'onDataChange',
      'change input#reps-step' : 'onDataChange'
    },
    initialize : function() {
      this.data = JSON.parse(sessionStorage.getItem('workoutData'));
      this.exerciseData = JSON.parse(sessionStorage.getItem('exerciseData'));
      var setData = this.exerciseData[this.options.step - 1];
      var exercises = this.model.get('exercises');
      // TODO Fix when exercise is deleted!
      this.$el.html(_.template(activeStepTemplate, {
        exercise : Exercises.get(exercises[this.options.step - 1]),
        weightValue : setData.weight,
        repsValue : setData.reps,
        first : this.options.step <= 1,
        last : this.options.step >= exercises.length,
        edit : this.options.edit === true
      }));
    },
    render : function() {
      this.$('table tbody:first').empty();
      _self = this;
      _.each(this.data.data[this.options.step - 1].sets, function(set) {
        _self.$('table tbody:first').append(new ActiveStepRowView(set).render().el);
      });
      return this;
    },
    onAddSet : function() {
      var weight = this.$('#weight-step').val();
      var reps = this.$('#reps-step').val();
      var set = {
        weight : weight,
        reps : reps
      };
      this.$('table tbody:first').append(new ActiveStepRowView(set).render().el);
      this.data.data[this.options.step - 1].sets.push(set);
      if (this.options.edit !== true) {
        sessionStorage.setItem('workoutData', JSON.stringify(this.data));
      }
    },
    onRemoveSet : function(e) {
      var index = this.$('button.remove').index($(e.currentTarget));
      this.data.data[this.options.step - 1].sets.splice(index, 1);
      if (this.options.edit !== true) {
        sessionStorage.setItem('workoutData', JSON.stringify(this.data));
      }
      this.render();
    },
    onPrevious : function() {
      if (this.options.edit === true) {
        Backbone.history.navigate('history/workout/edit/' + this.model.id, {
          trigger : true
        });
      } else {
        if (this.options.step <= 1) {
          sessionStorage.removeItem('workoutData'); // Remove data
          sessionStorage.removeItem('exerciseData');
          Backbone.history.navigate('log', {
            trigger : true
          });
        } else {
          Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step - 1), {
            trigger : true
          });
        }
      }
    },
    onNext : function() {
      if (this.options.edit === true) {
        sessionStorage.setItem('workoutData', JSON.stringify(this.data));
        Backbone.history.navigate('history/workout/edit/' + this.model.id, {
          trigger : true
        });
      } else {
        Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step + 1), {
          trigger : true
        });
      }
    },
    onDataChange : function() {
      var setData = this.exerciseData[this.options.step - 1];
      setData.weight = this.$('#weight-step').val();
      setData.reps = this.$('#reps-step').val();
      sessionStorage.setItem('exerciseData', JSON.stringify(this.exerciseData));
    }
  });
  return ActiveWorkoutStep;
});
