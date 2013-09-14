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
      if (!email || !password) {
        // No input
        this.loginFailed();
      } else {
        var _self = this;
        $.ajax('/login', {
          type : 'POST',
          data : {
            email : email,
            password : password
          },
          error : function() {
            _self.loginFailed();
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
    loginFailed : function() {
      this.$('#login').button('reset');
      $('#top-message').html(loginFailedTemplate);
      $('#top-message :first-child').addClass('in');
    }
  });
  return HeaderView;
});
