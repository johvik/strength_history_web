define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
  var views = [];
  var create = function(name, View, options) {
    var old = views[name];
    if (!_.isUndefined(old)) {
      // Do some cleanup
      old.undelegateEvents();
    }
    // Create a new instance
    var view = new View(options);
    views[name] = view;
    return view;
  };
  return {
    create : create
  };
});
