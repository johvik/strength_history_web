define([ 'jquery', 'underscore', 'backbone', 'vm', 'collections/exercise', 'text!templates/exercise/list.html', 'views/exercise/item' ], function($, _, Backbone, Vm, ExerciseCollection, exerciseListTemplate, ExerciseItemView) {
  var ExerciseListPage = Backbone.View.extend({
    el : '#page',
    events : {
      'click #create-exercise' : 'createExercise'
    },
    exercises : new ExerciseCollection(),
    initialize : function() {
      this.listenTo(this.exercises, 'add', this.addOne);
      this.listenTo(this.exercises, 'reset', this.reset);
      this.listenTo(this.exercises, 'sort', this.reset);
      this.listenTo(this.exercises, 'change', function() {
        this.exercises.sort();
      });
      this.exercises.fetch();
      $(this.el).html(_.template(exerciseListTemplate));
    },
    reset : function() {
      this.$('table tbody').empty();
      this.render();
    },
    render : function() {
      this.addAll();
    },
    createExercise : function() {
      var newItem = this.exercises.create({
        name : 'New exercise',
        standardIncrease : 2.5
      });
      this.listenToOnce(newItem, 'sync', function() {
        var index = this.exercises.indexOf(newItem);
        if (0 <= index) {
          // Trigger edit on the new item
          this.$('tbody tr td.value:first-child a:eq(' + index + ')').trigger('click');
        }
      });
    },
    addOne : function(exercise) {
      var exerciseView = Vm.create('ex_' + exercise.cid, ExerciseItemView, {
        model : exercise
      });
      this.$el.find('table tbody:first').append(exerciseView.render().el);
    },
    addAll : function() {
      this.exercises.each(this.addOne, this);
    }
  });
  return ExerciseListPage;
});
