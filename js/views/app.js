define([ 'jquery', 'underscore', 'backbone', 'events', 'text!templates/layout.html' ], function($, _, Backbone, Events, layoutTemplate) {
  var AppView = Backbone.View.extend({
    el : '#main',
    render : function() {
      $(this.el).html(layoutTemplate);
      require([ 'views/header/header', 'views/header/userheader' ], function(HeaderView, UserHeaderView) {
        var headerView = new HeaderView();
        var userHeaderView = new UserHeaderView();
        // TODO How to fix if logged in at start
        headerView.render();
        Events.on('login', function() {
          userHeaderView.render();
        });
        Events.on('logout', function() {
          headerView.render();
        });
      });
      require([ 'views/footer/footer' ], function(FooterView) {
        var footerView = new FooterView();
        footerView.render();
      });
    }
  });
  return AppView;
});
