(function() {
  
  angular
    .module('osqarApp')
    .controller("QuestionParentController", QuestionParentController)
    .controller("NewQuestionController", NewQuestionController)

    QuestionParentController.$inject = ['questions']

    function QuestionParentController(questions) {
      let vm = this;
      console.log("The resolved questions object is", questions)
      vm.questions = questions.data
    }

    NewQuestionController.$inject = ['QuestionService']

    function NewQuestionController(QuestionService) {
      let vm = this;

      vm.question = {
        text: null,
        category: null,
        choices: [
              {id: 1, text: null},
              {id: 2, text: null},
              {id: 3, text: null},
              {id: 4, text: null}],
        correct: {id: null}
      }

      vm.addQuestion = function(newQuestion) {
        newQuestion.choices.find((val,idx) => {
          if (val.id === newQuestion.correct.id) {
            newQuestion.correct.text = val.text
          }
        })

        debugger
        if ("Something") {
          // "req" object becomes 'req.body' in http call to db
            // 'req.test' is perfectly formatted object for db
            // Becomes 'req.body.test' when db is ingesting it
          var req = {
            question: {newQuestion} 
          }
          QuestionService.createQuestion(req).then((res) => {
            console.log("Response from the server is...", res)
            $location.path('/questions')
          })

        } else {
          // Provide flash message that title and category cannot be blank
          alert("Title and category cannot be blank")
        }

      }
    }


})();