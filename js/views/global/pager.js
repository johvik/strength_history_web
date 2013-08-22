define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/global/pager.html'
], function($, _, Backbone, globalPagerTemplate) {
  var PagerView = Backbone.View.extend({
    initialize : function() {
      var prev = this.options.prev || {};
      var next = this.options.next || {};
      this.$el.html(_.template(globalPagerTemplate, {
        prevHref : prev.href || '/#',
        prevText : prev.text || 'Previous',
        nextHref : next.href || '/#',
        nextText : next.text || 'Next'
      }));
    },
    render : function() {
      return this;
    }
  });
  return PagerView;
});
