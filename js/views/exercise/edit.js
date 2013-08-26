define([
  'jquery',
  'underscore',
  'backbone',
  'views/global/confirm',
  'text!templates/exercise/edit.html'
], function($, _, Backbone, ConfirmView, exerciseEditTemplate) {
  var ExerciseEdit = Backbone.View.extend({
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'keyup input' : 'onKeyup',
      'keypress input' : 'onKeypress'
    },
    initialize : function() {
      this.$el.html(exerciseEditTemplate);
    },
    render : function() {
      // Hide/show all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update this
      this.$('.exercise-name').val(this.model.get('name'));
      this.$('.standard-increase').val(this.model.get('standardIncrease'));
      this.$('.form-group').removeClass('has-error');
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
      this.options.rowView.stopEdit();
      Backbone.history.navigate('exercises');
    },
    onDelete : function() {
      var _self = this;
      new ConfirmView({
        message : 'Exercise and all references will be permanently lost, are you sure?',
        callback : function() {
          _self.onCancel(); // Ensure it will be hidden
          _self.model.destroy();
        }
      }).render();
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
  return ExerciseEdit;
});
