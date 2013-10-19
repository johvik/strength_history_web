define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'globals/datehandler',
  'text!templates/active/row.html'
], function($, _, Backbone, Events, DateHandler, activeRowTemplate) {
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
        latest = DateHandler.toDateString(new Date(latest));
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
      if (!this.$(e.target).is('a')) {
        // Click link
        this.$('td:first a:first')[0].click();
      } else {
        // Remember date from main view
        sessionStorage.setItem('savedDate', DateHandler.parseDateTimeLocalString($('#activeDate').val()));
      }
    }
  });
  return WorkoutRow;
});
