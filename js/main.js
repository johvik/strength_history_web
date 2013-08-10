requirejs.config({
  paths : {
    jquery : 'vendor/jquery-1.10.2.min',
    underscore : 'vendor/underscore-min',
    backbone : 'vendor/backbone-min',
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
    }
  }
});

// Start the application
require([ 'views/app', 'router' ], function(AppView, Router) {
  var appView = new AppView();
  appView.render();
  Router.initialize();
});
