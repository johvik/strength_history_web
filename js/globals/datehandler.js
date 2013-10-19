define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  return {
    toDateString : function(date) {
      return date.toDateString();
    },
    toDateTimeLocalString : function(date) {
      // Include timezone in the date
      date.setTime(date.getTime() - (date.getTimezoneOffset() * 60000));
      return date.toISOString().slice(0, -5);
    },
    parseDateTimeLocalString : function(str) {
      var date = new Date(str);
      // Include timezone in the date
      date.setTime(date.getTime() + (date.getTimezoneOffset() * 60000));
      return date;
    }
  };
});
