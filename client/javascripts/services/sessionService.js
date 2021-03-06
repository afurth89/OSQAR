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

      var chartOptions = {
        chart: {
          type: 'pieChart',
          height: 350,
          donut: true,
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: false,

          pie: {
              startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
              endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
          },
          duration: 500,
          legend: {
              margin: {
                  top: 10,
                  right: -15,
                  bottom: 0,
                  left: 0
              },
              padding: 50
          }
        }
      };

      var chartData = [
        {
          key: 'Correct: '+sessionTrackingData.uPerformance.correct,
          // y: 1,
          y: "",
          color: 'rgba(20, 156, 130, 0.75)'
        },
        {
          key: 'Incorrect: '+(sessionTrackingData.uPerformance.total - sessionTrackingData.uPerformance.correct),
          // y: 1,
          y: "",
          color: 'rgba(231, 76, 60, 0.75)'
        }
      ]


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
          sessionTrackingData = {
            qIdx: 0,
            qNum: 1,
            uPerformance: {
              total: 0,
              correct: 0,
              byQuestion: []
            }
          }
          resolve(sessionTrackingData)
        })
      }

      this.serveChartOptions = () => {
        return new Promise((resolve) => {
          resolve(chartOptions)
        })
      }

      this.serveChartData = () => {
        return new Promise((resolve) => {
          resolve(chartData)
        })
      }

      this.addUserAnswerChoice = (sessionId, sessionData) => {
        console.log("sessionId is...", sessionId)
        console.log("sessionData is... ", sessionData)
        return $http.put(session_BASE_URL+sessionId, sessionData)
      }

      this.updateTrackingData = (qNum, correctAns, userAns) => {
        return new Promise((resolve) => {
          // Increment total questions answered
          sessionTrackingData.uPerformance.total += 1
          // If answer was correct
          if (correctAns === userAns) {
            // Increment correct answers
            sessionTrackingData.uPerformance.correct += 1
            // Log question as correct
            sessionTrackingData.uPerformance.byQuestion[qNum-1] = true
          // If answer was incorrect
          } else {
            // Log question as incorrect
            sessionTrackingData.uPerformance.byQuestion[qNum-1] = false
          }
          resolve(sessionTrackingData)
        })
      }

      this.updateChartData = (updatedData) => {
        return new Promise((resolve) => {
          console.log("updatedData: ", updatedData)
          // Set correct Num for data and display
          chartData[0].key = 'Correct: '+updatedData.uPerformance.correct
          chartData[0].y = updatedData.uPerformance.correct
          // Set incorrect Num for data and display
          chartData[1].key = 'Incorrect: '+(updatedData.uPerformance.total - updatedData.uPerformance.correct)
          chartData[1].y = updatedData.uPerformance.total - updatedData.uPerformance.correct
          resolve(chartData)
        })
      }

      this.serveNextQuestion = () => {
        return new Promise((resolve) => {
          sessionTrackingData.qIdx += 1;
          sessionTrackingData.qNum += 1;
          resolve(sessionTrackingData)
        })
      }

      this.resetUserPerformance = () => {
        return new Promise((resolve) => {
          

          sessionTrackingData = {
            qIdx: 0,
            qNum: 1,
            uPerformance: {
              total: 0,
              correct: 0,
              byQuestion: []
            }
          }
          // Set correct Num for data and display
          chartData[0].key = 'Correct: 0'
          chartData[0].y = 0
          // Set incorrect Num for data and display
          chartData[1].key = 'Incorrect: 0'
          chartData[1].y = 0
          resolve(sessionTrackingData)
        })
      }

    }
})();