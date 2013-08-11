define([ 'jquery', 'underscore', 'backbone', 'events', 'text!templates/header/header.html', 'text!templates/messages/loginfailed.html' ], function($, _, Backbone, Events, headerTemplate, loginFailedTemplate) {
  var HeaderView = Backbone.View.extend({
    el : '#header',
    render : function() {
      $(this.el).html(headerTemplate);
    },
    events : {
      'click #login' : 'login'
    },
    login : function(e) {
      e.preventDefault();
      $('#top-message :first-child').alert('close'); // Hide previous message
      $.ajax('/login', {
        type : 'POST',
        data : {
          username : $('#email').val(),
          password : $('#password').val()
        },
        error : function() {
          $('#top-message').html(loginFailedTemplate);
          $('#top-message :first-child').addClass('in');
        },
        success : function() {
          Events.trigger('login');
        }
      });
    }
  });
  return HeaderView;
});
