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
    }
  });
  return SignupPage;
});
