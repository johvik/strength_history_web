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
    setLoginError : function(opts) {
      var options = opts || {};
      if ($('#top-small-message').is(':hidden')) {
        setMessage({
          type : 'danger',
          title : options.title || 'Error!',
          message : options.message || 'An error occured.'
        });
      } else {
        // Show the login error in the menu on small devices
        $('#top-small-message').html(_.template(topMessageTemplate, {
          type : 'danger',
          title : options.title || 'Error!',
          message : options.message || 'An error occured.'
        }));
        $('#top-small-message div.alert:first').addClass('in');
      }
    },
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
      $('#top-small-message div.alert').alert('close');
    }
  };
});
