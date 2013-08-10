define([ 'jquery', 'underscore', 'backbone', 'events', 'text!templates/layout.html' ], function($, _, Backbone, Events, layoutTemplate) {
  var AppView = Backbone.View.extend({
    el : '.container',
    render : function() {
      var that = this;
      $(this.el).html(layoutTemplate);
      require([ 'views/header/header' ], function(HeaderView) {
        var headerView = new HeaderView();
        headerView.render();
      });
      require([ 'views/footer/footer' ], function(FooterView) {
        var footerView = new FooterView();
        footerView.render();
      });
    }
  });
  return AppView;
});
