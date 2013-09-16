define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var UserHeaderView = Backbone.View.extend({
    el : '#user-header',
    events : {
      'click #logout' : 'onLogout'
    },
    render : function() {
      $('#header').addClass('hidden');
      $(this.el).removeClass('hidden');
    },
    onLogout : function() {
      sessionStorage.removeItem('workoutData'); // Remove data
      sessionStorage.removeItem('exerciseData');
    }
  });
  return UserHeaderView;
});
