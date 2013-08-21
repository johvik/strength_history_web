define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'views/workout/edit',
  'text!templates/workout/row.html'
], function($, _, Backbone, Events, WorkoutEditView, workoutRowTemplate) {
  var WorkoutRow = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click td.value a' : 'startEdit',
      'click td.value' : 'startEdit'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'workouts:clear', this.remove);
    },
    remove : function() {
      Backbone.View.prototype.remove.apply(this);
      if (_.isObject(this.editView)) {
        this.editView.remove();
        delete this.editView;
      }
    },
    render : function() {
      this.$el.html(_.template(workoutRowTemplate, {
        workout : this.model,
        exercises : 'Exercises' // TODO Fix this
      }));
      return this;
    },
    stopEdit : function() {
      Events.trigger('workouts:stopEdit');
      // Hide edit
      this.$('.edit').addClass('hidden');
      this.$('.value').removeClass('hidden');
    },
    startEdit : function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Try to reuse old one
      if (!_.isObject(this.editView)) {
        this.editView = new WorkoutEditView({
          model : this.model,
          rowView : this
        });
        this.$('.edit').html(this.editView.render().el);
      } else {
        this.editView.render();
      }
      // Show edit
      this.$('.edit').removeClass('hidden');
      this.$('.value').addClass('hidden');
      this.$('.workout-name').focus();
    }
  });
  return WorkoutRow;
});
