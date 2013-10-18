define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'globals/historydata',
  'globals/workout',
  'views/history/weight/row',
  'views/history/workoutdata/row',
  'text!templates/history/list.html'
], function($, _, Backbone, Vm, Events, HistoryData, Workouts, WeightRowView, WorkoutDataRowView, historyListTemplate) {
  var HistoryDataPage = Backbone.View.extend({
    el : '#page',
    initialize : function() {
      // TODO Deleting the workout of a workoutdata produces an error when trying to edit
      this.listenTo(Workouts, 'sync', this.reset); // If workouts aren't loaded directly
      this.listenTo(HistoryData, 'add', this.addOne);
      this.listenTo(HistoryData, 'reset sort', this.reset);
      this.listenTo(Events, 'historydata:stopEdit', function() {
        delete this.options.editId;
      });
      $(this.el).html(historyListTemplate);
    },
    reset : function() {
      Events.trigger('historydata:clear');
      this.render();
    },
    render : function() {
      this.addAll();
      if (_.isString(this.options.editId)) {
        Events.trigger('historydata:edit', this.options.editId);
      }
    },
    addOne : function(data) {
      var dataView;
      if (!_.isUndefined(data.get('workout'))) {
        dataView = Vm.create('wd_' + data.cid, WorkoutDataRowView, {
          model : data
        });
      } else {
        dataView = Vm.create('we_' + data.cid, WeightRowView, {
          model : data,
          editId : this.options.editId
        });
      }
      this.$el.find('table tbody:first').append(dataView.render().el);
    },
    addAll : function() {
      HistoryData.each(this.addOne, this);
    }
  });
  return HistoryDataPage;
});
