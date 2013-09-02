define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/history/weight/edit.html'
], function($, _, Backbone, weightEditTemplate) {
  var WeightEdit = Backbone.View.extend({
    events : {
      'click button.save' : 'onSave',
      'click button.cancel' : 'onCancel',
      'click button.delete' : 'onDelete',
      'keyup input' : 'onKeyup',
      'keypress input' : 'onKeypress'
    },
    initialize : function() {
      this.$el.html(weightEditTemplate);
    },
    render : function() {
      // Hide/show all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update this
      // TODO Support browsers without datetime-local
      this.$('.weight-date').val(new Date(this.model.get('time')).toISOString().slice(0, -5));
      this.$('.weight').val(this.model.get('weight'));
      this.$('.form-group').removeClass('has-error');
      return this;
    },
    onSave : function() {
      var weightDate = new Date(this.$('.weight-date').val());
      var weight = this.$('.weight').val();
      var attributes = {
        time : weightDate.getTime(),
        weight : weight
      };
      var invalid = this.model.validate(attributes);
      if (_.isUndefined(invalid)) {
        this.onCancel(); // Ensure it will be hidden
        this.model.save(attributes);
      } else {
        this.$('.weight-date').parent().toggleClass('has-error', invalid.time);
        this.$('.weight').parent().toggleClass('has-error', invalid.weight);
      }
    },
    onCancel : function() {
      this.options.rowView.stopEdit();
    },
    onDelete : function() {
      this.onCancel(); // Ensure it will be hidden
      this.model.destroy();
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
