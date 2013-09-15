define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/signup/page.html',
  'text!templates/messages/signupfail.html',
  'text!templates/messages/signupsuccess.html'
], function($, _, Backbone, signupPageTemplate, signupFailTemplate, signupSuccessTemplate) {
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
      this.$('button[type="submit"]').button('loading');
      $('#top-message :first-child').alert('close'); // Hide previous message
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
                content : 'E-mail already in use.'
              });
              _self.$('#email').popover('show');
              _self.$('#email').parent().addClass('has-error');
            } else {
              $('#top-message').html(signupFailTemplate);
              $('#top-message :first-child').addClass('in');
            }
            _self.$('button[type="submit"]').button('reset');
          },
          success : function() {
            $('#top-message').html(signupSuccessTemplate);
            $('#top-message :first-child').addClass('in');
            _self.$('button[type="submit"]').button('reset');
          }
        });
      }
    }
  });
  return SignupPage;
});
