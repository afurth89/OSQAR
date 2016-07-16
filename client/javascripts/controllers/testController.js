(function() {
  
  angular
    .module('osqarApp')
    .controller('TestParentController', TestParentController)
    .controller('NewTestController', NewTestController)
    .controller('ShowTestController', ShowTestController)
    .controller('EditTestController', EditTestController)

//***************************************************************************
// INDEX
//***************************************************************************
    TestParentController.$inject = ['tests']

    function TestParentController(tests) {
      let vm = this;

      // 'tests.data' is result of 'resolve' property
      // within TestParentController in app.js
      vm.tests = tests.data
    }

//***************************************************************************
// NEW
//***************************************************************************
    NewTestController.$inject = ['TestService', '$location']

    function NewTestController(TestService, $location) {

      let vm = this;

      vm.test = {};

      vm.selectCategory = function(category) {
        vm.test.category = category
        console.log("vm.test.category: ", vm.test.category)
      }

      vm.addTest = function(newTest) {
        if (newTest.title && newTest.category) {
          // "req" object becomes 'req.body' in http call to db
            // 'req.test' is perfectly formatted object for db
            // Becomes 'req.body.test' when db is ingesting it
          var req = {
            test: {
              title: newTest.title,
              // Must pull only 'name' attr from category object
              category: newTest.category
            } 
          }
          TestService.createTest(req).then((res) => {
            console.log("Response from the server is...", res)
            // To Test Edit Page
            $location.path('/tests/'+res.data._id)
          })

        } else {
          // Provide flash message that title and category cannot be blank
          alert("Title and category cannot be blank")
        }

      }
    }

//***************************************************************************
// SHOW
//***************************************************************************
    ShowTestController.$inject = ['test', 'allQuestions', 'TestService', '$location', "$route", '$scope']

    function ShowTestController(test, allQuestions, TestService, $location, $route, $scope) {
      let vm = this;

      // 'test.data' and 'allQuestions.data' is result of 'resolve' property
      // within ShowTestController in app.js
      vm.test = test.data
      vm.allQuestionsList = allQuestions.data
      
      vm.setCatClass = function(category) {
        // Set class for Category label
        if (category === "Math") {
          vm.test.catClass = "label-danger"
        } else if (category === "English") {
          vm.test.catClass = "label-info"
        } else if (category === "Social Studies") {
          vm.test.catClass = "label-default"
        } else {
          vm.test.catClass = "label-warning"
        }
      }

      vm.setCatClass(vm.test.category)


      console.log("vm.test.catClass = ", vm.test.catClass)
      // CONTROL DISPLAY OF CURRENT QUESTIONS ALREADY PART OF TEST
      vm.showTestQuestions = {
        value: false,
        text: "Show Current Questions"
      }

      vm.toggleShowTestQs = function() {
        // Ensure other two aren't displaying
        vm.createNewQuestionFormDisplay.value = false;
        vm.createNewQuestionFormDisplay.text = "Create New Question"
        vm.addExistingQuestionFormDisplay.value = false;
        vm.addExistingQuestionFormDisplay.text = "Add Existing Question"

        // Show/Hide Current Test Qs
        if (vm.showTestQuestions.value) {
          // If add question form is shown, hide it
          vm.showTestQuestions.value = false;
          vm.showTestQuestions.text = "Show Current Questions"
        } else {
          // If add question form is hidden, show it
          vm.showTestQuestions.value = true;
          vm.showTestQuestions.text = "Hide Current Questions"
        }
        console.log(vm.showTestQuestions)
      }      

      // CONTROL DISPLAY OF CREATE QUESTION FORM    
      vm.createNewQuestionFormDisplay = {
        value: false,
        text: "Create New Question"
      }

      vm.toggleCreateNewQsForTest = function() {
        // Ensure other two aren't displaying
        vm.showTestQuestions.value = false;
        vm.showTestQuestions.text = "Show Current Questions"
        vm.addExistingQuestionFormDisplay.value = false;
        vm.addExistingQuestionFormDisplay.text = "Add Existing Question"

        // Show/Hide Create Q form
        if (vm.createNewQuestionFormDisplay.value) {
          // If add question form is shown, hide it
          vm.createNewQuestionFormDisplay.value = false;
          vm.createNewQuestionFormDisplay.text = "Create New Question"
        } else {
          // If add question form is hidden, show it
          vm.createNewQuestionFormDisplay.value = true;
          vm.createNewQuestionFormDisplay.text = "Hide New Question Form"
        }
        console.log(vm.createNewQuestionFormDisplay)
      }

      // CONTROL DISPLAY OF ALL EXISTING QUESTIONS
      vm.addExistingQuestionFormDisplay = {
        value: false,
        text: "Add Existing Question"
      }

      vm.toggleAddExistingQsToTest = function() {
        // Ensure other two aren't displaying
        vm.showTestQuestions.value = false;
        vm.showTestQuestions.text = "Show Current Questions"
        vm.createNewQuestionFormDisplay.value = false;
        vm.createNewQuestionFormDisplay.text = "Create New Question"

        // Show/Hide Existing Questions
        if (vm.addExistingQuestionFormDisplay.value) {
          // If add question form is shown, hide it
          vm.addExistingQuestionFormDisplay.value = false;
          vm.addExistingQuestionFormDisplay.text = "Add Existing Question"
        } else {
          // If add question form is hidden, show it
          vm.addExistingQuestionFormDisplay.value = true;
          vm.addExistingQuestionFormDisplay.text = "Hide Existing Questions"
        }
        console.log(vm.addExistingQuestionFormDisplay)
      }

      // ADD AN EXISTING QUESTION TO CURRENT TEST
      vm.addExistingQuestionToTest = function(qId) {
        console.log("Id of question to be added is...", qId)
        
        var req = {
          qId: qId
        }        
        TestService.updateTest($route.current.params.id, req).then((res) => {
          console.log("The updated test is...", res)
          alert("The question has been added")
          // Hide existing questions
          vm.toggleAddExistingQsToTest()
          // Update current questions
          vm.test = res.data
          // Show current questions
          vm.toggleShowTestQs()
          // Reset category
          vm.setCatClass(vm.test.category)

        })
      }

      vm.removeQuestionFromTest = (qId) => {
        console.log("Id of question to be deleted is...", qId)

        var req = {
          qIdToDel: qId
        }

        TestService.updateTest($route.current.params.id, req).then((res) => {
          console.log("The updated test is...", res)
          alert("The question has been removed")
          // Update current questions
          vm.test = res.data
        })
      }

      // REMOVE A TEST
      vm.removeTest = function() {
        TestService.deleteTest($route.current.params.id).then((res) => {
          console.log("The response after deleting test is... ", res)
          // TO-DO --> Improve alert
          alert("The test has been successfully deleted")
          $location.path('/tests')
        })
      }


    }

//***************************************************************************
// EDIT
//***************************************************************************
    EditTestController.$inject = ['test', 'TestService', '$location', "$route"]

    function EditTestController(test, TestService, $location, $route) {
      let vm = this;

      // 'test.data' is result of 'resolve' property
      // within EditTestController in app.js
      vm.test = test.data
      console.log("The category for this test is...", vm.test.category)
      // Categories for updating test
      // TO-DO --> consolidate this with "NewTestController"
      vm.availableCategories = [
        {id: "1", name: "Math"},
        {id: "2", name: "English"},
        {id: "3", name: "Social Studies"},
        {id: "4", name: "Science"}
      ]

      vm.editTest = function(editedTest) {
        // See NewController for explanation of 'req' object formatting
        var req = {
          test: {
            title: editedTest.title,
            // Must pull only 'name' attr from category object
            category: editedTest.category
          } 
        }

        TestService.updateTest($route.current.params.id, req).then((res) => {
          console.log("The updated test is...", res)
          alert("The test has been updated")
          $location.path('/tests')
        })
      }
    }
})();