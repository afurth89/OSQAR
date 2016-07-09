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

      vm.test = {
        title: null,
        category: null
      };

      vm.availableCategories = [
        {id: "1", name: "Math"},
        {id: "2", name: "English"},
        {id: "3", name: "Social Studies"},
        {id: "4", name: "Science"}
      ]

      vm.addTest = function(test) {
        debugger
        console.log(test)
      }
    }

})();