(function() {
  
  angular
    .module('osqarApp')
    .controller("QuestionParentController", QuestionParentController)

    QuestionParentController.$inject = ['questions']

    function QuestionParentController(questions) {
      let vm = this;
      console.log("The resolved questions object is", questions)
      vm.questions = questions.data
    }


})();