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
    NewSessionController.$inject = []

    function NewSessionController() {

      let vm = this;

      
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