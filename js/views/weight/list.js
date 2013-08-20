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
      this.$('table tbody').empty();
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
      var newDate = new Date();
      newDate.setMilliseconds(0);
      var newItem = this.weights.create({
        time : newDate.getTime(),
        weight : weight
      });
      this.listenToOnce(newItem, 'sync', function() {
        var index = this.weights.indexOf(newItem);
        if (0 <= index) {
          // Trigger edit on the new item
          this.$('tbody tr td.value:first-child a:eq(' + index + ')').trigger('click');
        }
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
