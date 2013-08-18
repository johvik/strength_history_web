define([ 'jquery', 'underscore', 'backbone', 'text!templates/exercise/item.html' ], function($, _, Backbone, exerciseItemTemplate) {
  var ExerciseItem = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'click td.value' : 'startEdit'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render : function() {
      this.$el.html(_.template(exerciseItemTemplate, {
        exercise : this.model
      }));
      return this;
    },
    onSave : function() {
      // TODO Validate
      var exerciseName = this.$('#exerciseName').val();
      var standardIncrease = this.$('#standardIncrease').val();
      this.model.save({
        name : exerciseName,
        standardIncrease : standardIncrease
      });
    },
    onCancel : function() {
      this.$('.edit').addClass('hidden');
      this.$('.value').removeClass('hidden');
    },
    onDelete : function() {
      // TODO Confirm?
      this.model.destroy();
    },
    startEdit : function() {
      var hidden = this.$('.edit.hidden');
      if (hidden.length === 0) {
        // Already shown
      } else {
        // Show edit and hide values
        hidden.removeClass('hidden');
        this.$('.value').addClass('hidden');
        this.$('#exerciseName').val(this.model.get('name'));
        this.$('#standardIncrease').val(this.model.get('standardIncrease'));
      }
    }
  });
  return ExerciseItem;
});
