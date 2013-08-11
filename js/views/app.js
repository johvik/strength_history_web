define([ 'jquery', 'underscore', 'backbone', 'events', 'text!templates/layout.html' ], function($, _, Backbone, Events, layoutTemplate) {
  var AppView = Backbone.View.extend({
    el : '#main',
    events : {
      'click .navbar a' : 'highlightMenuItem'
    },
    highlightMenuItem : function(e) {
      var item = $(e.currentTarget).parent();
      if (!item.hasClass('dropdown')) {
        $('.active').removeClass('active');
        if (item.find('.brand').length === 0) {
          item.addClass('active');
        } else {
          // This is the brand, highlight home instead
          $('#header .nav :first-child').addClass('active');
        }
      }
    },
    render : function() {
      $(this.el).html(layoutTemplate);
      require([ 'views/header/header', 'views/header/userheader' ], function(HeaderView, UserHeaderView) {
        var headerView = new HeaderView();
        var userHeaderView = new UserHeaderView();

        Events.on('login', function() {
          userHeaderView.render();
        });
        Events.on('logout', function() {
          headerView.render();
        });
        // This will trigger initial rendering
        if (Events.authorized === true) {
          Events.trigger('login');
        } else {
          Events.trigger('logout');
        }
      });
      require([ 'views/footer/footer' ], function(FooterView) {
        var footerView = new FooterView();
        footerView.render();
      });
    }
  });
  return AppView;
});
