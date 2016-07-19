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

      // // Set CatClass for Test
      // vm.setCatClass(vm.tests, vm.tests.category)
      // Set CatClass for Questions in Test
      vm.tests.forEach((val) => {
        vm.setCatClass(val, val.category)
      })
      console.log("vm.tests: ", vm.tests)
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
      console.log('All Qs: ', vm.allQuestionsList)
      vm.letters = {
        0: "A",
        1: "B",
        2: "C",
        3: "D"
      }

      vm.filterData = {
        catSelected: "",
        searchText: ""
      }

      vm.filterCategory = function(category) {
        vm.filterData.catSelected = category
      }

      vm.clearSearch = function() {
        vm.filterData.searchText = ""
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
      vm.setCatClass(vm.test, vm.test.category)
      // Set CatClass for Questions in Test
      vm.test.questions.forEach((val) => {
        vm.setCatClass(val, val.category)
      })
      // Set CatClass for All Questions
      vm.allQuestionsList.forEach((val) => {
        vm.setCatClass(val, val.category)
      })
      console.log("vm.test.catClass = ", vm.test.catClass)

      
      // DEFAULT DISPLAYED CONTENT
      vm.display = [
        {val: true},  // Test Qs
        {val: false}, // Create Question Form
        {val: false}  // List of Available Qs
      ]

      vm.toggleDisplay = function(itemToDisplayIdx) {
        // Hide all three
        vm.display.forEach((val, idx) => {
          if (idx === itemToDisplayIdx) {
            val.val = true;
          } else {
            val.val = false;
          }
        })
        console.log("The index that is displayed is... ", itemToDisplayIdx)
        console.log("Display object... ", vm.display)
      }              


      // ADD AN EXISTING QUESTION TO CURRENT TEST
      vm.addExistingQuestionToTest = function(qId) {
        console.log("Id of question to be added is...", qId)
        var req = {
          qId: qId
        }        
        TestService.updateTest($route.current.params.id, req).then((res) => {
          console.log("The updated test is...", res)
          // Reset Test data
          vm.test = res.data
          // Reset category for test, and questions within
          vm.setCatClass(vm.test, vm.test.category)
          vm.test.questions.forEach((val) => {
            vm.setCatClass(val, val.category)
          })
          // Back to the test
          vm.toggleDisplay(0)
        })
      }

      vm.removeQuestionFromTest = (qId) => {
        console.log("Id of question to be deleted is...", qId)

        var req = {
          qIdToDel: qId
        }

        TestService.updateTest($route.current.params.id, req).then((res) => {
          console.log("The updated test is...", res)
          // Update current questions
          vm.test = res.data
          // Reset category for test, and questions within
          vm.setCatClass(vm.test, vm.test.category)
          vm.test.questions.forEach((val) => {
            vm.setCatClass(val, val.category)
          })
        })
      }

      // REMOVE A TEST
      vm.removeTest = function() {
        TestService.deleteTest($route.current.params.id).then((res) => {
          console.log("The response after deleting test is... ", res)
          // TO-DO --> Improve alert
          $location.path('/tests')
        })
      }

      // FOR TESTING DND LIST
      // $scope.$watch('vm.test.questions', function(model) {
      //   $scope.modelAsJson = angular.toJson(model, true);
      //   console.log($scope.modelAsJson)
      // }, true);

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
      
      vm.selectCategory = function(category) {
        vm.test.category = category
        console.log("vm.test.category: ", vm.test.category)
      }

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
          $location.path('/tests')
        })
      }
    }
})();