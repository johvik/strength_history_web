define([
  'jquery',
  'underscore',
  'backbone',
  'userdata'
], function($, _, Backbone, UserData) {
  var vent = _.extend({
    // UserData isn't updated! Use vent.authenticated
    authenticated : UserData.authenticated
  }, Backbone.Events);
  vent.on('login', function() {
    vent.authenticated = true;
  });
  vent.on('logout', function() {
    vent.authenticated = false;
  });
  return vent;
});
