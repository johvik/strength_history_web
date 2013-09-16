define([
  'jquery',
  'underscore',
  'backbone',
  'events',
  'views/global/topmessage'
], function($, _, Backbone, Events, TopMessage) {
  var HeaderView = Backbone.View.extend({
    el : '#header',
    render : function() {
      $('#user-header').addClass('hidden');
      $(this.el).removeClass('hidden');
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
      TopMessage.close();
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
            _self.$('form').submit();
          }
        });
      }
    },
    loginFailed : function(message) {
      this.$('#login').button('reset');
      TopMessage.setError({
        message : message
      });
    }
  });
  return HeaderView;
});
