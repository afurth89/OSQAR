(function() {
  
  angular
    .module('osqarApp')
    .controller('TestParentController', TestParentController)

    TestParentController.$inject = ['tests']

    function TestParentController(tests) {
      let vm = this;

      vm.tests = tests.data
    }

})();