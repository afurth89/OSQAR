(function() {
  angular
    .module('osqarApp')
    .service('TeacherService', TeacherService)

    TeacherService.$inject = ['$http']

    function TeacherService($http) {
      const teacher_BASE_URL = '/api/teachers/';

      this.getTests = () => {
        var foo = $http.get(teacher_BASE_URL)
        console.log("RESULT", foo)
        return foo
        // return $http.get(teacher_BASE_URL)
      }
    }
})();