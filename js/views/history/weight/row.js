define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'views/history/weight/edit',
  'text!templates/history/weight/row.html'
], function($, _, Backbone, Events, WeightEditView, weightRowTemplate) {
  var WeightRow = Backbone.View.extend({
    tagName : 'tr',
    events : {
      'click td.value' : 'onEdit'
    },
    initialize : function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(Events, 'historydata:clear', this.remove);
      this.listenTo(Events, 'historydata:edit', function(id) {
        if (id === this.model.id) {
          this.startEdit();
        }
      });
    },
    remove : function() {
      Backbone.View.prototype.remove.apply(this);
      if (_.isObject(this.editView)) {
        this.editView.remove();
        delete this.editView;
      }
    },
    render : function() {
      this.$el.html(_.template(weightRowTemplate, {
        weight : this.model
      }));
      return this;
    },
    stopEdit : function() {
      Events.trigger('historydata:stopEdit');
      // Hide edit
      this.$('.edit').addClass('hidden');
      this.$('.value').removeClass('hidden');
      Backbone.history.navigate('history');
    },
    startEdit : function() {
      // Try to reuse old one
      if (!_.isObject(this.editView)) {
        this.editView = new WeightEditView({
          model : this.model,
          rowView : this
        });
        this.$('.edit').html(this.editView.render().el);
      } else {
        this.editView.render();
      }
      // Show edit
      this.$('.edit').removeClass('hidden');
      this.$('.value').addClass('hidden');
      this.$('.weight').focus();
    },
    onEdit : function(e) {
      if (!this.$(e.target).is('a')) {
        // Click link
        this.$('td:first a:first')[0].click();
      }
    }
  });
  return WeightRow;
});
