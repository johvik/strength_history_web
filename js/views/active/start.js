define([
  'jquery',
  'underscore',
  'backbone',
  'globals/exercise',
  'views/global/pager',
  'text!templates/active/start.html'
], function($, _, Backbone, Exercises, PagerView, activeStartTemplate) {
  var ActiveWorkoutStart = Backbone.View.extend({
    events : {
      'click .pager .next a' : 'onStart'
    },
    initialize : function() {
      // TODO Add previous results
      this.$el.html(_.template(activeStartTemplate, {
        workout : this.model
      }));
      this.$el.append(new PagerView({
        prev : {
          href : '/#log',
          text : 'Cancel'
        },
        next : {
          href : '/#run/' + this.model.id + '/1',
          text : 'Start'
        }
      }).render().el);
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
    }
  });
  return ActiveWorkoutStart;
});
