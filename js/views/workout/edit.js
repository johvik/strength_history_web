define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/workout/edit.html'
], function($, _, Backbone, workoutEditTemplate) {
  var WorkoutEdit = Backbone.View.extend({
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'click button.add' : 'onAdd',
      'click button.remove' : 'onRemove',
      'keyup input' : 'onKeyup',
      'keyup select' : 'onKeyup',
      'keypress input' : 'onKeypress'
    },
    initialize : function() {
      this.$el.html(workoutEditTemplate);
    },
    render : function() {
      // Hide/show all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update this
      this.$('.workout-name').val(this.model.get('name'));
      this.$('.form-group').removeClass('has-error');
      return this;
    },
    onSave : function() {
      var workoutName = this.$('.workout-name').val();
      var exercises = [];
      // TODO Fix list of exercises
      var attributes = {
        name : workoutName,
        exercises : exercises
      };
      var invalid = this.model.validate(attributes);
      if (_.isUndefined(invalid)) {
        this.onCancel(); // Ensure it will be hidden
        this.model.save(attributes);
      } else {
        this.$('.workout-name').parent().toggleClass('has-error', invalid.name);
        this.$('.exercises').parent().toggleClass('has-error', invalid.exercises);
      }
    },
    onCancel : function() {
      this.options.rowView.stopEdit();
    },
    onDelete : function() {
      this.onCancel(); // Ensure it will be hidden
      // TODO Confirm?
      this.model.destroy();
    },
    onAdd : function() {
      // TODO Add exercise
    },
    onRemove : function() {
      // TODO Remove exercise
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
  return WorkoutEdit;
});
