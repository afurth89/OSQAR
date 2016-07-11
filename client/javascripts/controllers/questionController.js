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

    NewQuestionController.$inject = ['QuestionService', '$location']

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
        correct: {id: null, text: null}
      }

      vm.addQuestion = function(newQuestion, $location) {
        newQuestion.correct.id = +newQuestion.correct.id
        newQuestion.choices.find((val,idx) => {
          if (val.id === newQuestion.correct.id) {
            debugger
            newQuestion.correct.text = val.text
            return val
          }

        })

        if (newQuestion.text && newQuestion.category &&
            newQuestion.choices[0].text &&
            newQuestion.choices[1].text &&
            newQuestion.choices[2].text &&
            newQuestion.choices[3].text &&
            newQuestion.correct.text) {
          // "req" object becomes 'req.body' in http call to db
            // 'req.test' is perfectly formatted object for db
            // Becomes 'req.body.test' when db is ingesting it
          var req = {
            question: newQuestion 
          }
          QuestionService.createQuestion(req).then((res) => {
            console.log("Response from the server is...", res)
            $location.path('/questions')
          })

        } else {
          // Provide flash message that title and category cannot be blank
          alert("Please fill in text, category, all answer choices, and indicate the correct answer")
        }

      }
    }


})();