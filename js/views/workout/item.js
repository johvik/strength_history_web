define([ 'jquery', 'underscore', 'backbone', 'text!templates/workout/item.html' ], function($, _, Backbone, workoutItemTemplate) {
  var WorkoutItem = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'click button.add' : 'onAdd',
      'click button.remove' : 'onRemove',
      'click td.value a' : 'startEdit',
      'click td.value' : 'startEdit',
      'keyup input' : 'onKeyup',
      'keyup select' : 'onKeyup',
      'keypress input' : 'onKeypress'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    render : function() {
      this.$el.html(_.template(workoutItemTemplate, {
        workout : this.model
      }));
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
        this.model.save(attributes);
        this.onCancel(); // Ensure it will be hidden
      } else {
        this.$('.workout-name').parent().toggleClass('has-error', invalid.name);
        this.$('.exercises').parent().toggleClass('has-error', invalid.exercises);
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
    onAdd : function() {
      // TODO Add exercise
    },
    onRemove : function() {
      // TODO Remove exercise
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
      this.$('.workout-name').val(this.model.get('name'));
      this.$('.workout-name').focus();
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
  return WorkoutItem;
});
