(function() {
  
  angular
    .module('osqarApp')
    .controller('TestParentController', TestParentController)
    .controller('NewTestController', NewTestController)


    TestParentController.$inject = ['tests']

    function TestParentController(tests) {
      let vm = this;

      vm.tests = tests.data
    }

    NewTestController.$inject = ['TestService', '$location']

    function NewTestController(TestService, $location) {

      let vm = this;

      vm.test = {};

      
    }

})();