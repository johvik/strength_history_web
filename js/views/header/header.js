define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'text!templates/header/header.html',
  'text!templates/messages/loginfailed.html'
], function($, _, Backbone, Events, headerTemplate, loginFailedTemplate) {
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
      if (this.$('#login').hasClass('disabled')) {
        return; // Prevent multiple clicks
      }
      this.$('#login').button('loading');
      $('#top-message :first-child').alert('close'); // Hide previous message
      var email = this.$('#email').val();
      var password = this.$('#password').val();
      var emailPattern = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
      if (!email || !emailPattern.test(email) || !password || password.length < 7) {
        // Bad input
        this.loginFailed('Invalid login input.');
      } else {
        var _self = this;
        $.ajax('/login', {
          type : 'POST',
          data : {
            email : email,
            password : password
          },
          error : function(jqXHR) {
            _self.loginFailed(jqXHR.responseText || 'Invalid email or password.');
          },
          success : function() {
            // Collapse header
            var collapse = $('.navbar button.navbar-toggle:not(.collapsed)');
            if (collapse.css('display') !== 'none') {
              collapse.trigger('click');
            }
            Events.trigger('login');
          }
        });
      }
    },
    loginFailed : function(message) {
      this.$('#login').button('reset');
      $('#top-message').html(_.template(loginFailedTemplate, {
        message : message
      }));
      $('#top-message :first-child').addClass('in');
    }
  });
  return HeaderView;
});
