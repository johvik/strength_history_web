define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'vm',
  'text!templates/layout.html'
], function($, _, Backbone, Events, Vm, layoutTemplate) {
  var AppView = Backbone.View.extend({
    el : '#main',
    render : function() {
      // TODO Move layout into index.html?
      $(this.el).html(layoutTemplate);
      require([
        'views/header/header',
        'views/header/userheader'
      ], function(HeaderView, UserHeaderView) {
        Events.on('login', function(initial) {
          var userHeaderView = Vm.create('HeaderView', UserHeaderView);
          userHeaderView.render();
          if (initial !== true) {
            // Go to home page
            Backbone.history.navigate('', {
              trigger : true
            });
            $('#nav-home').addClass('active');
          }
        });
        Events.on('logout', function() {
          var headerView = Vm.create('HeaderView', HeaderView);
          headerView.render();
        });
        // This will trigger initial rendering
        if (Events.authenticated === true) {
          Events.trigger('login', true);
        } else {
          Events.trigger('logout');
        }
      });
      require([
        'views/footer/footer'
      ], function(FooterView) {
        var footerView = Vm.create('FooterView', FooterView);
        footerView.render();
      });
    }
  });
  return AppView;
});
