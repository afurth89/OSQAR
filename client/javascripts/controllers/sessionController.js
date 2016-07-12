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
    SessionParentController.$inject = []

    function SessionParentController() {
      let vm = this;

    }

//***************************************************************************
// NEW
//***************************************************************************
    NewSessionController.$inject = ['allTests']

    function NewSessionController(allTests) {

      let vm = this;

      vm.tests = allTests.data

      
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