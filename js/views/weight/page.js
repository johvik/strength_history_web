define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/weight',
  'views/weight/row',
  'text!templates/weight/list.html'
], function($, _, Backbone, Vm, Events, Weights, WeightRowView, weightListTemplate) {
  var WeightPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #add-weight' : 'addWeight'
    },
    initialize : function() {
      this.listenTo(Weights, 'change:_id', function(w) {
        // New items will trigger id change
        this.options.editId = w.id;
        // A sort will be done after a change therefore no need to use trigger
        Backbone.history.navigate('history/weight/edit/' + w.id);
      });
      this.listenTo(Weights, 'add', this.addOne);
      this.listenTo(Weights, 'reset sort', this.reset);
      this.listenTo(Events, 'weights:stopEdit', function() {
        delete this.options.editId;
      });
      $(this.el).html(_.template(weightListTemplate));
    },
    reset : function() {
      Events.trigger('weights:clear');
      this.render();
    },
    render : function() {
      this.addAll();
      if (_.isString(this.options.editId)) {
        Events.trigger('weights:edit', this.options.editId);
      }
    },
    addWeight : function() {
      var first = Weights.first();
      var weight = 75.0;
      if (!_.isUndefined(first)) {
        // Use latest as base
        weight = first.get('weight');
      }
      var newDate = new Date();
      newDate.setMilliseconds(0);
      Weights.create({
        time : newDate.getTime(),
        weight : weight
      });
    },
    addOne : function(weight) {
      var weightView = Vm.create('we_' + weight.cid, WeightRowView, {
        model : weight,
        editId : this.options.editId
      });
      this.$el.find('table tbody:first').append(weightView.render().el);
    },
    addAll : function() {
      Weights.each(this.addOne, this);
    }
  });
  return WeightPage;
});
