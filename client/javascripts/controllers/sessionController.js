(function() {
  
  angular
    .module('osqarApp')
    .controller('SessionParentController', SessionParentController)
    .controller('NewSessionController', NewSessionController)
    .controller('ShowSessionController', ShowSessionController)
    .controller('EditSessionController', EditSessionController)

//***************************************************************************
// INDEX
//***************************************************************************
    SessionParentController.$inject = ['sessions']

    function SessionParentController(sessions) {
      let vm = this;

      vm.sessions = sessions.data
    }

//***************************************************************************
// NEW
//***************************************************************************
    NewSessionController.$inject = ['allTests', 'SessionService', '$location']

    function NewSessionController(allTests, SessionService, $location) {

      let vm = this;

      vm.tests = allTests.data

      vm.setCatClass = function(location, category) {
        // Set class for Category label
        if (category === "Math") {
          location.catClass = "label-danger"
          location.catIcon = "fa-calculator"
        } else if (category === "English") {
          location.catClass = "label-info"
          location.catIcon = "fa-book"
        } else if (category === "Social Studies") {
          location.catClass = "label-default"
          location.catIcon = "fa-globe"
        } else if (category === "Science") {
          location.catClass = "label-warning"
          location.catIcon = "fa-flask"
        } else {
          location.catClass = "label-primary"
          location.catIcon = "fa-list-ol"
        }
      }

      // // Set CatClass for Test
      // vm.setCatClass(vm.tests, vm.tests.category)
      // Set CatClass for Questions in Test
      vm.tests.forEach((val) => {
        vm.setCatClass(val, val.category)
      })

      vm.filterData = {
        catSelected: {
          name: "",
          displayName: "All",
          catClass: "label-primary",
          catIcon: "fa-list-ol"
        },
        searchText: ""
      }

      vm.filterCategory = function(category) {
        // Catch "All" edge case
        if (category !== "All") {
          vm.filterData.catSelected.name = category
        } else {
          // Ensure that the filter is nothing if "All" is selected
          vm.filterData.catSelected.name = ""
        }
        vm.filterData.catSelected.displayName = category
        vm.setCatClass(vm.filterData.catSelected, category)
      }

      vm.clearSearch = function() {
        vm.filterData.searchText = ""
      }
      
      vm.initiateTestSession = function(testId, questions) {
        console.log("A new session will be created for test ID... ", testId)
        console.log("The questions in that test are: ", questions)
        // Create 'req' obj that fits "Session" schema
        var req = {
          session: {
            _test: testId,
            answers: []
          }
        }

        // Add ObjectId for each question to 'req' obj
        questions.forEach((el) => {
          var qObj = { 
            _question: el._id,
            u_answer: {id: null, text: null}
          }
          req.session.answers.push(qObj)
        })

        console.log("Req obj to be sent is... ", req)
        SessionService.createSession(req).then((res) => {
          console.log("Response from created session is... ", res)
          $location.path('/sessions/'+res.data._id)
        })
      }
      
    }

//***************************************************************************
// SHOW
//***************************************************************************
    ShowSessionController.$inject = ['session', 'trackingData', 'chartOptions', 'chartData', '$location', 'SessionService', '$route', '$scope']

    function ShowSessionController(session, trackingData, chartOptions, chartData, $location, SessionService, $route, $scope) {
      let vm = this;

      vm.session = session.data
      vm.trackingData = trackingData
      console.log("Session data: ", vm.session)
      console.log("User data: ", vm.trackingData)
      vm.chartOptions = chartOptions
      vm.chartData = chartData
      console.log("Chart Options: ", vm.chartOptions)
      console.log("User data: ", vm.chartData)

      vm.letters = {
        0: "A",
        1: "B",
        2: "C",
        3: "D"
      }

      vm.setCatClass = function(location, category) {
        // Set class for Category label
        if (category === "Math") {
          location.catClass = "label-danger"
          location.catIcon = "fa-calculator"
        } else if (category === "English") {
          location.catClass = "label-info"
          location.catIcon = "fa-book"
        } else if (category === "Social Studies") {
          location.catClass = "label-default"
          location.catIcon = "fa-globe"
        } else {
          location.catClass = "label-warning"
          location.catIcon = "fa-flask"
        }
      }

      // Set CatClass for Test
      vm.setCatClass(vm.session._test, vm.session._test.category)
      // Set CatClass for Questions in Test
      vm.session.answers.forEach((val) => {
        vm.setCatClass(val._question, val._question.category)
      })

      vm.testLength = vm.session._test.questions.length;
      vm.uChoice = null;
      vm.result = {
        display: false
      }
      vm.testOver = false

      vm.selectAnswer = function(choice) {
        vm.uChoice = choice
      }

      vm.submitAnswer = function(choice=null) {
        // console.log("Submitted answer: ", choice)

        // Set up req to mirror structure of session obj
        var req = {
          session: vm.session,
        }

        // Update the question's 'u_answer' obj to include user's choice
        req.session.answers[vm.trackingData.qIdx].u_answer.id = choice.id
        req.session.answers[vm.trackingData.qIdx].u_answer.text = choice.text
        console.log("CHECK REQ", req)

        // Update sessionTrackingData
        SessionService.updateTrackingData(vm.trackingData.qNum, vm.session.answers[vm.trackingData.qIdx]._question.correct.text, vm.uChoice.text).then((res) => {
          console.log("Updated trackingData: , ", res)
          SessionService.updateChartData(res).then((res) => {
            console.log("Updated chartData: ", res)
          })
        })

        // Update chartData

        // Adds user answer to session in DB
        SessionService.addUserAnswerChoice($route.current.params.id, req).then((res) => {
          console.log("Updated session: ", res.data)
        })

        // Check whether answer was correct, set proper result text
        if (vm.trackingData.uPerformance.byQuestion[vm.trackingData.qIdx]) {
          vm.result.text = "You are correct!"
          vm.result.correct = true;
        } else {
          vm.result.text = "Sorry, that's incorrect"
          vm.result.correct = false;
        }
        
        // If this question is the final question
        if (vm.trackingData.qNum === vm.testLength) {
          vm.testOver = true;
        } else {
          // Display result text
          vm.result.display = true;
        }
      }

      // Trigger next question
      vm.nextQuestion = function() {
        // Reset user choice
        vm.uChoice = null;
        // Hide result text
        vm.result = {
          display: false
        }
        SessionService.serveNextQuestion().then((res) => {
        })
      }


    }
//***************************************************************************
// EDIT
//***************************************************************************
    EditSessionController.$inject = []

    function EditSessionController() {
      let vm = this;

    }
})();
     

        // var isCorrect = vm.evaluateAnswer(vm.uAnswer.text, vm.qCorrectAnswer.text)
        // vm.trackingData.total++
        // if (isCorrect) { vm.uPerformance.correct++ }
        // vm.uPerformance.byQuestion.push(isCorrect)
        // console.log("updated Performance after " +vm.uPerformance.byQuestion.length+ " questions: ", vm.uPerformance)

        // vm.nextQuestion()

      // vm.nextQuestion = function() {

      //   // If we haven't reached the last question
      //   if (vm.qNum < vm.testLength) {
      //     // Reset info
      //     vm.qIdx++
      //     vm.qNum++
      //     vm.testLength = vm.session._test.questions.length;
      //     vm.qText = vm.session.answers[vm.qIdx]._question.text
      //     vm.qCategory = vm.session.answers[vm.qIdx]._question.category
      //     vm.qChoices = vm.session.answers[vm.qIdx]._question.choices
      //     vm.qCorrectAnswer = vm.session.answers[vm.qIdx]._question.correct
      //     vm.uAnswer = vm.session.answers[vm.qIdx].u_answer
      //     vm.uChoice = null;
      //   }
      // }

      // vm.toStart = function() {
      //   vm.qIdx = 0;
      //   vm.qNum = 1;
      // }