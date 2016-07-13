(function() {
  angular
    .module('osqarApp')
    .service('SessionService', SessionService)

    SessionService.$inject = ['$http']

    function SessionService($http) {
      const session_BASE_URL = '/api/sessions/';

      // GET - ALL TESTS
      this.getSessions = () => {
        return $http.get(session_BASE_URL)
      }

      // POST - NEW TEST
      this.createSession = (testId) => {
        console.log("SessionService has received TestId #", testId)
        return $http.post(session_BASE_URL, testId)
      }

      // GET - ONE SESSION
      this.getSession = (sessionId) => {
        debugger
        return $http.get(session_BASE_URL+sessionId)
      }
    }
})();