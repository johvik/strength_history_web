define([
  'jquery',
  'underscore',
  'backbone',
  'views/global/topmessage',
  'text!templates/signup/page.html'
], function($, _, Backbone, TopMessage, signupPageTemplate) {
  var SignupPage = Backbone.View.extend({
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

      TopMessage.close();
      this.$('button[type="submit"]').button('loading');
      this.$('div input.form-control').popover('destroy');
      this.$('div').removeClass('has-error');

      var email = this.$('#email').val();
      var password = this.$('#password').val();
      var passwordRepeat = this.$('#password-repeat').val();
      var emailPattern = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
      var invalidEmail = !email || !emailPattern.test(email);
      var invalidPassword = !password || password.length < 7;
      var invalidRepeatPassword = password !== passwordRepeat;
      if (invalidEmail || invalidPassword || invalidRepeatPassword) {
        // Bad input
        if (invalidEmail) {
          this.$('#email').popover({
            content : 'Invalid e-mail address.'
          });
          this.$('#email').popover('show');
          this.$('#email').parent().addClass('has-error');
        }
        if (invalidPassword) {
          this.$('#password').popover({
            content : 'Invalid password.'
          });
          this.$('#password').popover('show');
          this.$('#password').parent().addClass('has-error');
        }
        if (invalidRepeatPassword) {
          this.$('#password-repeat').popover({
            content : 'Passwords does not match.'
          });
          this.$('#password-repeat').popover('show');
          this.$('#password-repeat').parent().addClass('has-error');
        }
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
            if (jqXHR.status === 409) {
              // email in use
              _self.$('#email').popover({
                content : jqXHR.responseText || 'E-mail already in use.'
              });
              _self.$('#email').popover('show');
              _self.$('#email').parent().addClass('has-error');
            } else {
              TopMessage.setError({
                message : jqXHR.responseText || 'Failed to create account, please try again later.'
              });
            }
            _self.$('button[type="submit"]').button('reset');
          },
          success : function() {
            TopMessage.setSuccess({
              title : 'Account created!',
              message : 'Check your e-mail for account activation.'
            });
            _self.$('button[type="submit"]').button('reset');
            window.scrollTo(window.scrollX, 0); // Scroll to top
          }
        });
      }
    }
  });
  return SignupPage;
});
