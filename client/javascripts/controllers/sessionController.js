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

      vm.initiateTestSession = function(testId) {
        console.log("A new session will be created for test ID... ", testId)

        var req = {
          session: {
            _test: testId
          }
        }
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