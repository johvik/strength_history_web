define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'vm'
], function($, _, Backbone, Events, Vm) {
  var initialize = function() {
    require([
      'views/header/header',
      'views/header/userheader'
    ], function(HeaderView, UserHeaderView) {
      Events.on('login', function(initial) {
        var userHeaderView = Vm.create('HeaderView', UserHeaderView);
        userHeaderView.render();
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
  };
  return {
    initialize : initialize
  };
});
