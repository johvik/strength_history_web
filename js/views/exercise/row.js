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
      'click td.value a' : 'startEdit',
      'click td.value' : 'startEdit'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'exercises:clear', this.remove);
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
    },
    startEdit : function(e) {
      // TODO Use the path
      e.preventDefault();
      e.stopPropagation();
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
    }
  });
  return ExerciseRow;
});
