define([ 'jquery', 'underscore', 'backbone', 'collections/exercise', 'text!templates/exercise/list.html' ], function($, _, Backbone, ExerciseCollection, exerciseListTemplate) {
  var ExerciseListPage = Backbone.View.extend({
    el : '#page',
    render : function() {
      var _self = this;
      var exercise = new ExerciseCollection();
      exercise.fetch({
        success : function(exercises) {
          $(_self.el).html(_.template(exerciseListTemplate, {
            exercises : exercises.models
          }));
        }
      });
    }
  });
  return ExerciseListPage;
});
