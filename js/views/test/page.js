define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/test/page.html'
], function($, _, Backbone, testPageTemplate) {
  var TestPage = Backbone.View.extend({
    el : '#page',
    render : function() {
      $(this.el).html(_.template(testPageTemplate, {
        text : 'Some text...'
      }));
    }
  });
  return TestPage;
});
