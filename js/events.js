define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
  var vent = _.extend({
    // Read from global CheckLogin variable
    // CheckLogin isn't updated! Use vent.authorized
    authorized : CheckLogin
  }, Backbone.Events);
  vent.on('login', function() {
    vent.authorized = true;
  });
  vent.on('logout', function() {
    vent.authorized = false;
  });
  return vent;
});
