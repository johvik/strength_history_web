requirejs.config({
  paths : {
    jquery : 'vendor/jquery-1.10.2.min',
    underscore : 'vendor/underscore-min',
    backbone : 'vendor/backbone-min',
    bootstrap : 'vendor/bootstrap.min',
    text : 'vendor/text', // Require.js plugin
    templates : '../templates'
  },
  useStrict : true,
  shim : {
    underscore : {
      exports : '_'
    },
    backbone : {
      deps : [ 'underscore', 'jquery' ],
      exports : 'Backbone'
    },
    bootstrap : {
      deps : [ 'jquery' ]
    }
  }
});

// Start the application
require([ 'jquery', 'views/app', 'router', 'events', 'vm', 'bootstrap' ], function($, AppView, Router, Events, Vm, Bootstrap) {
  $.ajaxSetup({
    statusCode : {
      // Unauthorized
      401 : function() {
        if (Events.authorized === true) {
          // Only trigger if authorized
          window.location.replace('/#login-dropped');
          window.location.reload();
        }
      }
    }
  });
  var appView = Vm.create('AppView', AppView);
  appView.render();
  Router.initialize();
});
