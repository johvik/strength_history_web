define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header/userheader.html'
], function($, _, Backbone, userHeaderTemplate) {
  var UserHeaderView = Backbone.View.extend({
    el : '#header',
    events : {
      'click #logout' : 'onLogout'
    },
    render : function() {
      $(this.el).html(userHeaderTemplate);
    },
    onLogout : function() {
      sessionStorage.removeItem('workoutData'); // Remove data
      sessionStorage.removeItem('exerciseData');
    }
  });
  return UserHeaderView;
});
