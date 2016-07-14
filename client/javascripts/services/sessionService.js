(function() {
  angular
    .module('osqarApp')
    .service('SessionService', SessionService)

    SessionService.$inject = ['$http']

    function SessionService($http) {
      const session_BASE_URL = '/api/sessions/';

      var sessionTrackingData = {
        qIdx: 0,
        qNum: 1,
        uPerformance: {
          total: 0,
          correct: 0,
          byQuestion: []
        }
      }


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
        return $http.get(session_BASE_URL+sessionId)
      }

      this.serveSessionTrackingData = (questionNum) => {
        // if (questionNum) {
        //   sessionTrackingData.qNum = questionNum
        //   sessionTrackingData.qIdx = questionNum - 1
        // }
        return new Promise((resolve) => {
          resolve(sessionTrackingData)
        })
      }

      this.addUserAnswerChoice = (sessionId, sessionData) => {
        console.log("sessionId is...", sessionId)
        console.log("sessionData is... ", sessionData)
        return $http.put(session_BASE_URL+sessionId, sessionData)
      }

    }
})();