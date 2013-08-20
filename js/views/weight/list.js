define([ 'jquery', 'underscore', 'backbone', 'vm', 'collections/weight', 'text!templates/weight/list.html', 'views/weight/item' ], function($, _, Backbone, Vm, WeightCollection, weightListTemplate, WeightItemView) {
  var WeightListPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #add-weight' : 'addWeight'
    },
    weights : new WeightCollection(),
    initialize : function() {
      this.listenTo(this.weights, 'add', this.addOne);
      this.listenTo(this.weights, 'reset', this.reset);
      this.listenTo(this.weights, 'sort', this.reset);
      this.listenTo(this.weights, 'change', function() {
        this.weights.sort();
      });
      this.weights.fetch();
      $(this.el).html(_.template(weightListTemplate));
    },
    reset : function() {
      $(this.el).html(_.template(weightListTemplate));
      this.render();
    },
    render : function() {
      this.addAll();
    },
    addWeight : function() {
      var first = this.weights.first();
      var weight = 75.0;
      if (!_.isUndefined(first)) {
        // Use latest as base
        weight = first.get('weight');
      }
      // TODO Start edit this one!
      var newDate = new Date();
      newDate.setMilliseconds(0);
      this.weights.create({
        time : newDate.getTime(),
        weight : weight
      });
    },
    addOne : function(weight) {
      var weightView = Vm.create('we_' + weight.cid, WeightItemView, {
        model : weight
      });
      this.$el.find('table tbody:first').append(weightView.render().el);
    },
    addAll : function() {
      this.weights.each(this.addOne, this);
    }
  });
  return WeightListPage;
});
