define([ 'jquery', 'underscore', 'backbone', 'vm' ], function($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes : {
      'history/weight' : 'weightHistory',

      // Default - catch all
      '*actions' : 'defaultRoute'
    }
  });

  var initialize = function() {
    var router = new AppRouter();
    router.on('route:defaultRoute', function() {
      require([ 'views/test/page' ], function(TestPage) {
        var testPage = Vm.create('TestPage', TestPage);
        testPage.render();
      });
    });
    router.on('route:weightHistory', function() {
      require([ 'views/weight/list' ], function(WeightListPage) {
        var weightListPage = Vm.create('WeightListPage', WeightListPage);
        weightListPage.render();
      });
    });
    Backbone.history.start();
  };
  return {
    initialize : initialize
  };
});
