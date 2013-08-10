define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
  var AppRouter = Backbone.Router.extend({
    routes : {
      // Default - catch all
      '*actions' : 'defaultRoute'
    }
  });

  var initialize = function() {
    var router = new AppRouter();
    router.on('route:defaultRoute', function() {
      require([ 'views/test/page' ], function(TestPage) {
        var testPage = new TestPage();
        testPage.render();
      });
    });
    Backbone.history.start();
  };
  return {
    initialize : initialize
  };
});
