(function() {
  
  angular
    .module('osqarApp')
    .controller('SessionParentController', SessionParentController)
    .controller('NewSessionController', NewSessionController)
    .controller('ShowSessionController', ShowSessionController)
    .controller('EditSessionController', EditSessionController)

//***************************************************************************
// INDEX
//***************************************************************************
    SessionParentController.$inject = ['sessions']

    function SessionParentController(sessions) {
      let vm = this;

      vm.sessions = sessions.data
    }

//***************************************************************************
// NEW
//***************************************************************************
    NewSessionController.$inject = ['allTests', 'SessionService', '$location']

    function NewSessionController(allTests, SessionService, $location) {

      let vm = this;

      vm.tests = allTests.data

      vm.initiateTestSession = function(testId, questions) {
        console.log("A new session will be created for test ID... ", testId)
        console.log("The questions in that test are: ", questions)
        // Create 'req' obj that fits "Session" schema
        var req = {
          session: {
            _test: testId,
            answers: []
          }
        }

        // Add ObjectId for each question to 'req' obj
        questions.forEach((el) => {
          var qObj = { 
            _question: el._id,
            u_answer: {id: null, text: null}
          }
          req.session.answers.push(qObj)
        })

        console.log("Req obj to be sent is... ", req)
        SessionService.createSession(req).then((res) => {
          console.log("Response from created session is... ", res)
          $location.path('/sessions/'+res.data._id)
        })
      }
      
    }

//***************************************************************************
// SHOW
//***************************************************************************
    ShowSessionController.$inject = ['session', '$location']

    function ShowSessionController(session, $location) {
      let vm = this;

      vm.session = session.data
      console.log(vm.session)
      vm.qIdx = 0;
      vm.qNum = 1;
      vm.testLength = vm.session._test.questions.length;
      vm.qText = vm.session.answers[vm.qIdx]._question.text
      vm.qCategory = vm.session.answers[vm.qIdx]._question.category
      vm.qChoices = vm.session.answers[vm.qIdx]._question.choices
      vm.qCorrectAnswer = vm.session.answers[vm.qIdx]._question.correct
      vm.uAnswer = vm.session.answers[vm.qIdx].u_answer

      vm.uChoice = null;

      vm.uPerformance = {
        total: 0,
        correct: 0,
        byQuestion: []
      }


      vm.selectAnswer = function(choice) {
        vm.uChoice = choice
      }

      vm.evaluateAnswer = function(answer, choice) {
        return answer === choice ? true : false
      }


      vm.submitAnswer = function(choice) {
        console.log("Submitted answer: ", choice)

        // Push answer to u_answer
        vm.uAnswer.id = vm.uChoice.id
        vm.uAnswer.text = vm.uChoice.text

        var isCorrect = vm.evaluateAnswer(vm.uAnswer.text, vm.qCorrectAnswer.text)
        vm.uPerformance.total++
        if (isCorrect) { vm.uPerformance.correct++ }
        vm.uPerformance.byQuestion.push(isCorrect)
        console.log("updated Performance after " +vm.uPerformance.byQuestion.length+ " questions: ", vm.uPerformance)
        vm.nextQuestion()
      }

      vm.nextQuestion = function() {

        // If we haven't reached the last question
        if (vm.qNum < vm.testLength) {
          // Reset info
          vm.qIdx++
          vm.qNum++
          vm.testLength = vm.session._test.questions.length;
          vm.qText = vm.session.answers[vm.qIdx]._question.text
          vm.qCategory = vm.session.answers[vm.qIdx]._question.category
          vm.qChoices = vm.session.answers[vm.qIdx]._question.choices
          vm.qCorrectAnswer = vm.session.answers[vm.qIdx]._question.correct
          vm.uAnswer = vm.session.answers[vm.qIdx].u_answer
          vm.uChoice = null;
        }
      }

      vm.toStart = function() {
        vm.qIdx = 0;
        vm.qNum = 1;
      }

    }
//***************************************************************************
// EDIT
//***************************************************************************
    EditSessionController.$inject = []

    function EditSessionController() {
      let vm = this;

    }
})();