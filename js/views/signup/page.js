define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/signup/page.html'
], function($, _, Backbone, signupPageTemplate) {
  var SignupPage = Backbone.View.extend({
    // TODO User registration!
    el : '#page',
    render : function() {
      $(this.el).html(signupPageTemplate);
    },
    events : {
      'click button[type="submit"]' : 'onSignUp'
    },
    onSignUp : function(e) {
      e.preventDefault();
      if (this.$('button[type="submit"]').hasClass('disabled')) {
        return; // Prevent multiple clicks
      }
      this.$('button[type="submit"]').button('loading');
      var email = this.$('#email').val();
      var password = this.$('#password').val();
      var passwordRepeat = this.$('#password-repeat').val();
      var emailPattern = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
      if (!email || !emailPattern.test(email) || !password || password.length < 7 || password !== passwordRepeat) {
        // Bad input
        // TODO
        console.log('bad input');
        this.$('button[type="submit"]').button('reset');
      } else {
        var _self = this;
        $.ajax('/signup', {
          type : 'POST',
          data : {
            email : email,
            password : password
          },
          error : function(jqXHR) {
            // TODO
            if (jqXHR.status === 409) {
              // email in use
            }
            console.log('sign up failed');
            _self.$('button[type="submit"]').button('reset');
          },
          success : function() {
            // TODO Do something!
          }
        });
      }
    }
  });
  return SignupPage;
});
