define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/active/row.html'
], function($, _, Backbone, Events, activeRowTemplate) {
  var WorkoutRow = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click td.value' : 'startWorkout'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'activeworkouts:clear', this.remove);
    },
    remove : function() {
      Backbone.View.prototype.remove.apply(this);
      if (_.isObject(this.editView)) {
        this.editView.remove();
        delete this.editView;
      }
    },
    render : function() {
      var latest = this.model.get('latest');
      if (!_.isUndefined(latest)) {
        latest = new Date(latest).toDateString();
      } else {
        latest = 'Never';
      }
      this.$el.html(_.template(activeRowTemplate, {
        workout : this.model,
        latest : latest
      }));
      return this;
    },
    startWorkout : function(e) {
      e.preventDefault();
      e.stopPropagation();
      Backbone.history.navigate('run/' + this.model.id, {
        trigger : true
      });
    }
  });
  return WorkoutRow;
});
