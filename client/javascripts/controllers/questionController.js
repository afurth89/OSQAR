(function() {
  
  angular
    .module('osqarApp')
    .controller("QuestionParentController", QuestionParentController)

    QuestionParentController.$inject = ['questions']

    function QuestionParentController(questions) {
      let vm = this;

      vm.questions = questions.data
    }


})();