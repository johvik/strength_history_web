requirejs.config({
  baseUrl : '/js',
  paths : {
    jquery : 'vendor/jquery-2.0.3.min',
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
      deps : [
        'underscore',
        'jquery'
      ],
      exports : 'Backbone'
    },
    bootstrap : {
      deps : [
        'jquery'
      ]
    }
  }
});

// Start the application
require([
  'jquery',
  'views/app',
  'router',
  'events',
  'vm',
  'bootstrap'
], function($, AppView, Router, Events, Vm, Bootstrap) {
  // TODO Update project to work with latest backbone
  $.ajaxSetup({
    statusCode : {
      // Unauthorized
      401 : function() {
        window.location.assign('/');
      }
    }
  });
  AppView.initialize();
  Router.initialize();
});
