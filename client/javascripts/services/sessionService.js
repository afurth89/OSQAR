(function() {
  angular
    .module('osqarApp')
    .service('SessionService', SessionService)

    SessionService.$inject = ['$http']

    function SessionService($http) {
      const session_BASE_URL = '/api/sessions/';

      // POST - NEW TEST
      this.createSession = () => {
        return $http.post(session_BASE_URL)
      }


    }
})();