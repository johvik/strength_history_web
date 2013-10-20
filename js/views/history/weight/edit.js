define([
  'jquery',
  'underscore',
  'backbone',
  'globals/datehandler',
  'views/global/topmessage',
  'text!templates/history/weight/edit.html'
], function($, _, Backbone, DateHandler, TopMessage, weightEditTemplate) {
  var WeightEdit = Backbone.View.extend({
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'keyup input' : 'onKeyup',
      'keypress input' : 'onKeypress'
    },
    initialize : function(options) {
      this.options = options;
      this.$el.html(weightEditTemplate);
    },
    render : function() {
      // Hide/show all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update this
      this.$('.weight-date').val(DateHandler.toDateTimeLocalString(new Date(this.model.get('time'))));
      this.$('.weight').val(this.model.get('weight'));
      this.$('.form-group').removeClass('has-error');
      return this;
    },
    onSave : function() {
      TopMessage.close();
      var weightDate = DateHandler.parseDateTimeLocalString(this.$('.weight-date').val());
      var weight = this.$('.weight').val();
      var attributes = {
        time : weightDate.getTime(),
        weight : weight
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
        this.$('.weight-date').parent().toggleClass('has-error', invalid.time);
        this.$('.weight').parent().toggleClass('has-error', invalid.weight);
      }
    },
    onCancel : function() {
      this.options.rowView.stopEdit();
    },
    onDelete : function() {
      TopMessage.close();
      this.onCancel(); // Ensure it will be hidden
      this.model.destroy({
        error : function() {
          TopMessage.setError({
            message : 'Failed to delete the data on the server. Please refresh.'
          });
        }
      });
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
  return WeightEdit;
});
