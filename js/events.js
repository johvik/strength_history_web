define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
  var vent = _.extend({
    authorized : false
  }, Backbone.Events);
  vent.on('login', function() {
    vent.authorized = true;
  });
  vent.on('logout', function() {
    vent.authorized = false;
  });
  return vent;
});
