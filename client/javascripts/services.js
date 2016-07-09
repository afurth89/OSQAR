(function() {
  angular
    .module('osqarApp')
    .service('TestService', TestService)

    TestService.$inject = ['$http']

    function TestService($http) {
      const test_BASE_URL = '/api/tests/';

      // GET - ALL TESTS
      this.getTests = () => {
        var tests = $http.get(test_BASE_URL)
        console.log("RESULT", tests)
        return tests
        // return $http.get(test_BASE_URL)
      }

      // POST - NEW TEST
      this.createTest = (newTest) => {
        console.log(newTest)
        return $http.post(test_BASE_URL, newTest)
      }

      // GET - SINGLE TEST
      this.getTest = (id) => {
        console.log("TEST ID is...", id)
        return $http.get(test_BASE_URL+id)
      }
    }
})();