define([ 'jquery', 'underscore', 'backbone', 'text!templates/header/userheader.html' ], function($, _, Backbone, userHeaderTemplate) {
  var UserHeaderView = Backbone.View.extend({
    el : '#header',
    render : function() {
      $(this.el).html(userHeaderTemplate);
    }
  });
  return UserHeaderView;
});
