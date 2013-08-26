define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'globals/exercise',
  'views/workout/edit',
  'text!templates/workout/row.html',
  'text!templates/global/broken.html'
], function($, _, Backbone, Events, Exercises, WorkoutEditView, workoutRowTemplate, globalBrokenTemplate) {
  var WorkoutRow = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click td.value' : 'onEdit'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'workouts:clear', this.remove);
      this.listenTo(Events, 'workouts:edit', function(id) {
        if (id === this.model.id) {
          this.startEdit();
        }
      });
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
        exercises : _.compact(_.map(this.model.get('exercises'), function(v) {
          var exercise = Exercises.get(v);
          if (_.isObject(exercise)) {
            return exercise.get('name');
          }
          return _.template(globalBrokenTemplate, {
            type : 'Exercise'
          });
        })).join(', ')
      }));
      return this;
    },
    stopEdit : function() {
      Events.trigger('workouts:stopEdit');
      // Hide edit
      this.$('.edit').addClass('hidden');
      this.$('.value').removeClass('hidden');
      Backbone.history.navigate('workouts');
    },
    startEdit : function() {
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
    },
    onEdit : function(e) {
      if (!this.$(e.target).is('a')) {
        // Click link
        this.$('td:first a:first')[0].click();
      }
    }
  });
  return WorkoutRow;
});
