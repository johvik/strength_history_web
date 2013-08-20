define([ 'jquery', 'underscore', 'backbone', 'text!templates/weight/item.html' ], function($, _, Backbone, weightItemTemplate) {
  var WeightItem = Backbone.View.extend({
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
      this.$el.html(_.template(weightItemTemplate, {
        weight : this.model
      }));
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
        this.model.save(attributes);
        this.onCancel(); // Ensure it will be hidden
      } else {
        this.$('.weight-date').parent().toggleClass('has-error', invalid.time);
        this.$('.weight').parent().toggleClass('has-error', invalid.weight);
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
      e.stopPropagation();
      // Cancel all others
      $('.edit:not(hidden)').addClass('hidden');
      $('.value.hidden').removeClass('hidden');
      // Update values/visibility on this
      this.$('.form-group').removeClass('has-error');
      this.$('.edit').removeClass('hidden');
      this.$('.value').addClass('hidden');
      this.$('.weight-date').val(new Date(this.model.get('time')).toISOString().slice(0, -1));
      this.$('.weight').val(this.model.get('weight'));
      this.$('.weight-date').focus();
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
  return WeightItem;
});
