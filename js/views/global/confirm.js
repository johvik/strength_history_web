define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone) {
  var ConfirmView = Backbone.View.extend({
    render : function() {
      // TODO Improve confirm
      var message = this.options.message || 'Are you sure?';
      if (true == confirm(message)) {
        var callback = this.options.callback;
        if (_.isFunction(callback)) {
          callback();
        }
      }
    }
  });
  return ConfirmView;
});
