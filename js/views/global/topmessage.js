define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/global/topmessage.html'
], function($, _, Backbone, topMessageTemplate) {
  function setMessage(options) {
    $('#top-message').html(_.template(topMessageTemplate, options));
    $('#top-message div.alert:first').addClass('in');
  }
  return {
    setError : function(opts) {
      var options = opts || {};
      setMessage({
        type : 'danger',
        title : options.title || 'Error!',
        message : options.message || 'An error occured.'
      });
    },
    setSuccess : function(opts) {
      var options = opts || {};
      setMessage({
        type : 'success',
        title : options.title || 'Success!',
        message : options.message || 'Something succeeded.'
      });
    },
    close : function() {
      $('#top-message div.alert').alert('close');
    }
  };
});
