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
require([ 'jquery', 'views/app', 'router', 'events', 'bootstrap', 'text!templates/messages/logindropped.html' ], function($, AppView, Router, Events, Bootstrap, loginDroppedTemplate) {
  $.ajaxSetup({
    statusCode : {
      // Unauthorized
      401 : function() {
        if (Events.authorized === true) {
          // Only trigger if authorized
          Events.trigger('logout');
          $('#top-message').html(loginDroppedTemplate);
        }
      }
    }
  });
  var appView = new AppView();
  appView.render();
  Router.initialize();
});
