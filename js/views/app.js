define([ 'jquery', 'underscore', 'backbone', 'events', 'vm', 'text!templates/layout.html' ], function($, _, Backbone, Events, Vm, layoutTemplate) {
  var AppView = Backbone.View.extend({
    el : '#main',
    events : {
      'click .navbar a' : 'highlightMenuItem'
    },
    highlightMenuItem : function(e) {
      var item = $(e.currentTarget).parent();
      if (!item.hasClass('dropdown')) {
        $('.active').removeClass('active');
        if (item.find('.navbar-brand').length === 0) {
          item.addClass('active');
        } else {
          // This is the brand, highlight home instead
          $('#header :first :first').addClass('active');
        }
      }
    },
    render : function() {
      $(this.el).html(layoutTemplate);
      require([ 'views/header/header', 'views/header/userheader' ], function(HeaderView, UserHeaderView) {
        Events.on('login', function(initial) {
          var userHeaderView = Vm.create('HeaderView', UserHeaderView);
          userHeaderView.render();
          if (initial !== true) {
            // Go to home page
            Backbone.history.navigate('', {
              trigger : true
            });
            // Highlight home
            $('.active').removeClass('active');
            $('#header :first :first').addClass('active');
          } else {
            // TODO Highlight the correct nav item
          }
        });
        Events.on('logout', function() {
          var headerView = Vm.create('HeaderView', HeaderView);
          headerView.render();
        });
        // This will trigger initial rendering
        if (Events.authorized === true) {
          Events.trigger('login', true);
        } else {
          Events.trigger('logout');
        }
      });
      require([ 'views/footer/footer' ], function(FooterView) {
        var footerView = Vm.create('FooterView', FooterView);
        footerView.render();
      });
    }
  });
  return AppView;
});
