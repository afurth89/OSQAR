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
    NewSessionController.$inject = ['allTests', 'SessionService']

    function NewSessionController(allTests, SessionService) {

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
        })
      }
      
    }

//***************************************************************************
// SHOW
//***************************************************************************
    ShowSessionController.$inject = []

    function ShowSessionController() {
      let vm = this;

    }
//***************************************************************************
// EDIT
//***************************************************************************
    EditSessionController.$inject = []

    function EditSessionController() {
      let vm = this;

    }
})();