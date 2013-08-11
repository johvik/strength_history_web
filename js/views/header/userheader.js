define([ 'jquery', 'underscore', 'backbone', 'events', 'text!templates/header/userheader.html' ], function($, _, Backbone, Events, userHeaderTemplate) {
  var UserHeaderView = Backbone.View.extend({
    el : '#header',
    render : function() {
      $(this.el).html(userHeaderTemplate);
    },
    events : {
      'click #logout' : 'logout'
    },
    logout : function(e) {
      $.ajax('/logout', {
        type : 'GET',
        success : function() {
          Events.trigger('logout');
        }
      });
    }
  });
  return UserHeaderView;
});
