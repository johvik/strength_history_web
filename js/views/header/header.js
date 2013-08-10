define([ 'jquery', 'underscore', 'backbone', 'events', 'text!templates/header/header.html', 'text!templates/header/loginalert.html' ], function($, _, Backbone, Events, headerTemplate, loginAlertTemplate) {
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
      $('#login-fail .alert').alert('close'); // Hide previous errors
      $.ajax('/login', {
        type : 'POST',
        data : {
          username : $('#email').val(),
          password : $('#password').val()
        },
        error : function() {
          $('#login-fail').html(loginAlertTemplate);
        },
        success : function() {
          Events.trigger('login');
        }
      });
    }
  });
  return HeaderView;
});
