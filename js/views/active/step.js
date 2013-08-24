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
      'click button.next' : 'onNext'
    },
    initialize : function() {
      this.data = JSON.parse(sessionStorage.getItem('workoutData'));
      // TODO Set values
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
      sessionStorage.setItem('workoutData', JSON.stringify(this.data));
    },
    onRemoveSet : function(e) {
      var index = this.$('button.remove').index($(e.currentTarget));
      this.data.data[this.options.step - 1].sets.splice(index, 1);
      sessionStorage.setItem('workoutData', JSON.stringify(this.data));
      this.render();
    },
    onPrevious : function() {
      if (this.options.step <= 1) {
        sessionStorage.removeItem('workoutData'); // Remove data
        Backbone.history.navigate('run/' + this.model.id, {
          trigger : true
        });
      } else {
        Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step - 1), {
          trigger : true
        });
      }
    },
    onNext : function() {
      Backbone.history.navigate('run/' + this.model.id + '/' + (this.options.step + 1), {
        trigger : true
      });
    }
  });
  return ActiveWorkoutStep;
});
