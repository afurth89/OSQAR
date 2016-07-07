(function() {
  
  angular
    .module('osqarApp')
    .controller('TeacherParentController', TeacherParentController)

    TeacherParentController.$inject = ['tests']

    function TeacherParentController(tests) {
      let vm = this;

      vm.tests = tests.data
    }

})();