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
    ShowSessionController.$inject = ['session', 'trackingData', '$location', 'SessionService', '$route', '$scope']

    function ShowSessionController(session, trackingData, $location, SessionService, $route, $scope) {
      let vm = this;

      vm.session = session.data
      vm.trackingData = trackingData
      console.log("Session data: ", vm.session)
      console.log("User data: ", vm.trackingData)

      // Declare function to set vars
      vm.setSessionVariables = function() {
        vm.testLength = vm.session._test.questions.length;
        vm.qText = vm.session.answers[vm.trackingData.qIdx]._question.text
        vm.qCategory = vm.session.answers[vm.trackingData.qIdx]._question.category
        vm.qChoices = vm.session.answers[vm.trackingData.qIdx]._question.choices
        vm.qCorrectAnswer = vm.session.answers[vm.trackingData.qIdx]._question.correct
        vm.uAnswer = vm.session.answers[vm.trackingData.qIdx].u_answer
        vm.uChoice = null;
      }

      // Invoke function on load
      vm.setSessionVariables();

      vm.result = {
        display: false,
        text: "You are correct!"
      }

      vm.selectAnswer = function(choice) {
        vm.uChoice = choice
      }

      vm.submitAnswer = function(choice=null) {
        // console.log("Submitted answer: ", choice)

        // Set up req to mirror structure of session obj
        var req = {
          session: vm.session,
        }

        // Update the question's 'u_answer' obj to include user's choice
        req.session.answers[vm.trackingData.qIdx].u_answer.id = choice.id
        req.session.answers[vm.trackingData.qIdx].u_answer.text = choice.text
        console.log("CHECK REQ", req)

        // Update sessionTrackingData
        SessionService.updateTrackingData($route.current.params.qNum, vm.qCorrectAnswer.text, vm.uChoice.text).then((res) => {
          console.log("res after updating session tracking, ", res)
        })

        // Adds user answer to session in DB
        SessionService.addUserAnswerChoice($route.current.params.id, req).then((res) => {
          console.log("Response after adding user answer: ", res.data)
        })

        if (vm.trackingData.uPerformance.byQuestion[vm.trackingData.qIdx]) {
          vm.result.text = "You are correct!"
        } else {
          vm.result.text = "Sorry, that is incorrect"
        }
        vm.result.display = true;
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
     

        // var isCorrect = vm.evaluateAnswer(vm.uAnswer.text, vm.qCorrectAnswer.text)
        // vm.userData.total++
        // if (isCorrect) { vm.uPerformance.correct++ }
        // vm.uPerformance.byQuestion.push(isCorrect)
        // console.log("updated Performance after " +vm.uPerformance.byQuestion.length+ " questions: ", vm.uPerformance)

        // vm.nextQuestion()

      // vm.nextQuestion = function() {

      //   // If we haven't reached the last question
      //   if (vm.qNum < vm.testLength) {
      //     // Reset info
      //     vm.qIdx++
      //     vm.qNum++
      //     vm.testLength = vm.session._test.questions.length;
      //     vm.qText = vm.session.answers[vm.qIdx]._question.text
      //     vm.qCategory = vm.session.answers[vm.qIdx]._question.category
      //     vm.qChoices = vm.session.answers[vm.qIdx]._question.choices
      //     vm.qCorrectAnswer = vm.session.answers[vm.qIdx]._question.correct
      //     vm.uAnswer = vm.session.answers[vm.qIdx].u_answer
      //     vm.uChoice = null;
      //   }
      // }

      // vm.toStart = function() {
      //   vm.qIdx = 0;
      //   vm.qNum = 1;
      // }