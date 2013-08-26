define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'views/exercise/edit',
  'text!templates/exercise/row.html'
], function($, _, Backbone, Events, ExerciseEditView, exerciseRowTemplate) {
  var ExerciseRow = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click td.value' : 'onEdit'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'exercises:clear', this.remove);
      this.listenTo(Events, 'exercises:edit', function(id) {
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
      this.$el.html(_.template(exerciseRowTemplate, {
        exercise : this.model
      }));
      return this;
    },
    stopEdit : function() {
      Events.trigger('exercises:stopEdit');
      // Hide edit
      this.$('.edit').addClass('hidden');
      this.$('.value').removeClass('hidden');
      Backbone.history.navigate('exercises');
    },
    startEdit : function() {
      // Try to reuse old one
      if (!_.isObject(this.editView)) {
        this.editView = new ExerciseEditView({
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
      this.$('.exercise-name').focus();
    },
    onEdit : function(e) {
      if (!this.$(e.target).is('a')) {
        // Click link
        this.$('td:first a:first')[0].click();
      }
    }
  });
  return ExerciseRow;
});
