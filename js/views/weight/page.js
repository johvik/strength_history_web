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
      this.listenTo(Weights, 'add', this.addOne);
      this.listenTo(Weights, 'reset sort', this.reset);
      this.listenTo(Events, 'weights:stopEdit', function() {
        delete this.editCid;
      });
      $(this.el).html(_.template(weightListTemplate));
    },
    reset : function() {
      Events.trigger('weights:clear');
      this.render();
      if (_.isString(this.editCid)) {
        var index = Weights.indexOf(Weights.get(this.editCid));
        if (0 <= index) {
          // Trigger edit on the new item
          this.$('tbody tr td.value:first-child a:eq(' + index + ')').trigger('click');
        }
      }
    },
    render : function() {
      this.addAll();
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
      var newItem = Weights.create({
        time : newDate.getTime(),
        weight : weight
      });
      this.editCid = newItem.cid; // Start edit
    },
    addOne : function(weight) {
      var weightView = Vm.create('we_' + weight.cid, WeightRowView, {
        model : weight
      });
      this.$el.find('table tbody:first').append(weightView.render().el);
    },
    addAll : function() {
      Weights.each(this.addOne, this);
    }
  });
  return WeightPage;
});
