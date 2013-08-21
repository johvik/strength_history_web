define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/exercise/item.html'
], function($, _, Backbone, exerciseItemTemplate) {
  // TODO Move edit part into a separate view!
  var ExerciseItem = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'click td.value a' : 'startEdit',
      'click td.value' : 'startEdit',
      'keyup input' : 'onKeyup',
      'keypress input' : 'onKeypress'
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
      var exerciseName = this.$('.exercise-name').val();
      var standardIncrease = this.$('.standard-increase').val();
      var attributes = {
        name : exerciseName,
        standardIncrease : standardIncrease
      };
      var invalid = this.model.validate(attributes);
      if (_.isUndefined(invalid)) {
        this.onCancel(); // Ensure it will be hidden
        this.model.save(attributes);
      } else {
        this.$('.exercise-name').parent().toggleClass('has-error', invalid.name);
        this.$('.standard-increase').parent().toggleClass('has-error', invalid.standardIncrease);
      }
    },
    onCancel : function() {
      this.$('.edit').addClass('hidden');
      this.$('.value').removeClass('hidden');
      this.attributes.master.editCid = null;
    },
    onDelete : function() {
      this.onCancel(); // Ensure it will be hidden
      // TODO Confirm?
      this.model.destroy();
    },
    startEdit : function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Cancel all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update values/visibility on this
      this.$('.form-group').removeClass('has-error');
      this.$('.edit').removeClass('hidden');
      this.$('.value').addClass('hidden');
      this.$('.exercise-name').val(this.model.get('name'));
      this.$('.standard-increase').val(this.model.get('standardIncrease'));
      this.$('.exercise-name').focus();
    },
    onKeyup : function(e) {
      if (e.keyCode == 27) { // escape
        this.onCancel();
      }
    },
    onKeypress : function(e) {
      if (e.keyCode == 13) { // enter
        this.onSave();
      }
    }
  });
  return ExerciseItem;
});
