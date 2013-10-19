define([
  'jquery',
  'underscore',
  'backbone',
  'views/global/confirm',
  'views/exercise/select',
  'views/global/topmessage',
  'text!templates/workout/edit.html'
], function($, _, Backbone, ConfirmView, ExerciseSelectView, TopMessage, workoutEditTemplate) {
  var WorkoutEdit = Backbone.View.extend({
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'click select.add' : 'onAdd',
      'keypress select.add' : 'onAdd',
      'click button.remove' : 'onRemove',
      'keyup input' : 'onKeyup',
      'keypress input' : 'onKeypress'
    },
    initialize : function() {
      this.$el.html(workoutEditTemplate);
      this.selectAddView = new ExerciseSelectView({
        type : 'add'
      });
      this.selectRemoveViews = [];
      this.$('.add-exercises').html(this.selectAddView.render().el);
    },
    remove : function() {
      Backbone.View.prototype.remove.apply(this);
      this.selectAddView.remove();
      _.each(this.selectRemoveViews, function(v) {
        v.remove();
      });
    },
    render : function() {
      // Hide/show all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update this
      this.renderExercises();
      this.$('.workout-name').val(this.model.get('name'));
      this.$('.form-group').removeClass('has-error');
      return this;
    },
    renderExercises : function() {
      var array = this.model.get('exercises');
      var container = this.$('.exercises');
      // If we need more
      while (array.length > this.selectRemoveViews.length) {
        var view = new ExerciseSelectView({
          type : 'remove'
        });
        // Add to list
        this.selectRemoveViews.push(view);
        container.append(view.render().el);
      }
      // If we need less
      while (array.length < this.selectRemoveViews.length) {
        this.selectRemoveViews.pop().remove();
      }
      // Update values
      _.each(this.selectRemoveViews, function(v, i) {
        // Set value
        v.$('select').val(array[i]);
      });
    },
    onSave : function() {
      TopMessage.close();
      var workoutName = this.$('.workout-name').val();
      var exercises = [];
      this.$('.exercises select').each(function() {
        var val = $(this).val();
        if (val !== 'default') {
          exercises.push(val);
        }
      });
      var attributes = {
        name : workoutName,
        exercises : exercises
      };
      var invalid = this.model.validate(attributes);
      if (_.isUndefined(invalid)) {
        this.onCancel(); // Ensure it will be hidden
        this.model.save(attributes, {
          error : function() {
            TopMessage.setError({
              message : 'Failed to save the data on the server.'
            });
          }
        });
      } else {
        this.$('.workout-name').parent().toggleClass('has-error', invalid.name);
        this.$('.exercises').parent().toggleClass('has-error', invalid.exercises);
      }
    },
    onCancel : function() {
      this.options.rowView.stopEdit();
    },
    onDelete : function() {
      TopMessage.close();
      var _self = this;
      new ConfirmView({
        message : 'Workout and all references will be permanently lost, are you sure?',
        callback : function() {
          _self.onCancel(); // Ensure it will be hidden
          _self.model.destroy({
            error : function() {
              TopMessage.setError({
                message : 'Failed to delete the data on the server. Please refresh.'
              });
            }
          });
        }
      }).render();
    },
    onAdd : function(e) {
      var val = this.$('.add-exercises select').val();
      if (val === 'default' || (e.type === 'keypress' && e.keyCode !== 13)) {
        // Ignore if value is default or when it is a keypress event and enter is not the key
        return;
      }
      // Reset value of the select
      this.$('.add-exercises select').val('default');
      // Add new select view
      var v = new ExerciseSelectView({
        type : 'remove'
      });
      this.selectRemoveViews.push(v);
      this.$('.exercises').append(v.render().el);
      // Set value
      v.$('select').val(val);
    },
    onRemove : function(e) {
      var index = this.$('button.remove').index($(e.currentTarget));
      var removed = this.selectRemoveViews.splice(index, 1);
      while (removed.length > 0) {
        removed.pop().remove();
      }
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
