define([
  'jquery',
  'underscore',
  'backbone',
  'userdata',
  'collections/historydata'
], function($, _, Backbone, UserData, HistoryDataCollection) {
  var HistoryData = new HistoryDataCollection();
  var array = UserData.historyData;

  HistoryData.listenTo(HistoryData, 'change', function() {
    HistoryData.sort();
  });
  if (_.isArray(array)) {
    HistoryData.reset(array);
  } else {
    HistoryData.fetch();
  }
  return HistoryData;
});
