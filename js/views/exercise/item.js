define([ 'jquery', 'underscore', 'backbone', 'text!templates/exercise/item.html' ], function($, _, Backbone, exerciseItemTemplate) {
  var ExerciseItem = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'click td.value a' : 'startEdit',
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
      var exerciseName = this.$('#exerciseName').val();
      var standardIncrease = this.$('#standardIncrease').val();
      var attributes = {
        name : exerciseName,
        standardIncrease : standardIncrease
      };
      var invalid = this.model.validate(attributes);
      if (_.isUndefined(invalid)) {
        this.model.save(attributes);
        this.onCancel(); // Ensure it will be hidden
      } else {
        this.$('#exerciseName').parent().toggleClass('has-error', invalid.name);
        this.$('#standardIncrease').parent().toggleClass('has-error', invalid.standardIncrease);
      }
    },
    onCancel : function() {
      this.$('.edit').addClass('hidden');
      this.$('.value').removeClass('hidden');
    },
    onDelete : function() {
      // TODO Confirm?
      this.model.destroy();
    },
    startEdit : function(e) {
      e.preventDefault();
      // Cancel all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update values/visibility on this
      this.$('.form-group').removeClass('has-error');
      this.$('.edit').removeClass('hidden');
      this.$('.value').addClass('hidden');
      this.$('#exerciseName').val(this.model.get('name'));
      this.$('#standardIncrease').val(this.model.get('standardIncrease'));
      this.$('#exerciseName').select();
    }
  });
  return ExerciseItem;
});
