(function() {
  angular
    .module('osqarApp')
    .service('TestService', TestService)

    TestService.$inject = ['$http']

    function TestService($http) {
      const test_BASE_URL = '/api/tests/';

      this.getTests = () => {
        var tests = $http.get(test_BASE_URL)
        console.log("RESULT", tests)
        return tests
        // return $http.get(test_BASE_URL)
      }
    }
})();