(function() {
  
  angular
    .module('osqarApp')
    .controller("QuestionParentController", QuestionParentController)
    .controller("NewQuestionController", NewQuestionController)
    .controller("ShowQuestionController", ShowQuestionController)
    .controller("EditQuestionController", EditQuestionController)

//***************************************************************************
// INDEX
//***************************************************************************
    QuestionParentController.$inject = ['questions']

    function QuestionParentController(questions) {
      let vm = this;
      console.log("The resolved questions object is", questions)
      vm.questions = questions.data
    }

//***************************************************************************
// NEW
//***************************************************************************
    NewQuestionController.$inject = ['QuestionService', '$location', '$scope']

    function NewQuestionController(QuestionService, $location, $scope) {
      let vm = this;

      console.log("$scope.$parent is...", $scope.$parent.vm.test)
      // TO VISUALIZE OBJECT STRUCTURE
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


      vm.updateChosenAnswer = function(id) {
        vm.chosenAnswer = id
        console.log("Chosen Answer is now... ", vm.chosenAnswer)
      }

      vm.selectCategory = function(category) {
        vm.question.category = category
        console.log("vm.question.category: ", vm.question.category)
      }

      vm.addQuestion = function(newQuestion, testId=false) {
        // Set id for correct answer
        newQuestion.correct.id = +vm.chosenAnswer
        // Set category
        newQuestion.category = vm.question.category
        newQuestion.choices.find((val,idx) => {
          if (val.id === newQuestion.correct.id) {
            newQuestion.correct.text = val.text
            return val
          }
        })

        // Are all fields filled in for question?
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
            question: newQuestion,
            testId: testId 
          }
          console.log("The 'req' object passed to QService is...", req)
          QuestionService.createQuestion(req).then((res) => {
            console.log("Response from the server is...", res)
            // If the response object has 'data.questions',
            // it means that it is a test (which means the question was added to a test)
            if (res.data.questions) {
              console.log("res.data EQUALS...", res.data)
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
              $scope.$parent.vm.test = res.data
              // Reset category for test, and questions within
              $scope.$parent.vm.setCatClass($scope.$parent.vm.test, $scope.$parent.vm.test.category)
              $scope.$parent.vm.test.questions.forEach((val) => {
                $scope.$parent.vm.setCatClass(val, val.category)
              })
              $scope.$parent.vm.toggleDisplay(0)
              // If Q is assigned to test, then redirect to that test's show page
              $location.path('/tests/' + res.data._id)
            } else {
              $location.path('/tests/' + res.data._id)
            }
          })            

        } else {
          // Provide flash message that title and category cannot be blank
          alert("Please fill in text, category, all answer choices, and indicate the correct answer")
        }

      }
    }

//***************************************************************************
// SHOW
//***************************************************************************
  ShowQuestionController.$inject = ['question', 'QuestionService', '$location' ,'$route']

  function ShowQuestionController(question, QuestionService, $location, $route) {
    let vm = this;

    vm.question = question.data

    vm.removeQuestion = function() {
      QuestionService.deleteQuestion($route.current.params.id).then((res) => {
        console.log("The response after deleting question is... ", res)
        // TO-DO --> Improve alert
        $location.path('/questions')
      })
    }
  }

//***************************************************************************
// EDIT
//***************************************************************************
  EditQuestionController.$inject = ['question', 'QuestionService', '$location', '$route']

  function EditQuestionController(question, QuestionService, $location, $route) {
    let vm = this;

    vm.question = question.data

    vm.editQuestion = function(editedQuestion) {
      // See NewController for explanation of 'req' object formatting
      editedQuestion.correct.id = +editedQuestion.correct.id
      editedQuestion.choices.find((val,idx) => {
        if (val.id === editedQuestion.correct.id) {
          editedQuestion.correct.text = val.text
          return val
        }
      })

      var req = {
        question: editedQuestion 
      }

      QuestionService.updateQuestion($route.current.params.id, req).then((res) => {
        console.log("The updated question is...", res)
        alert("The question has been updated")
        $location.path('/questions')
      })
    }    
  }
})();