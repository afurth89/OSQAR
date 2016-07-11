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
            $location.path('/tests')
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
    ShowTestController.$inject = ['test', 'TestService', '$location', "$route", '$scope']

    function ShowTestController(test, TestService, $location, $route, $scope) {
      let vm = this;

      // 'test.data' is result of 'resolve' property
      // within ShowTestController in app.js
      vm.test = test.data

      vm.addQuestionsEnabled = {
        value: false,
        text: "Add"
      }

      vm.toggleAddingQuestionsToTest = function() {
        if (vm.addQuestionsEnabled.value) {
          // If add question form is shown, hide it
          vm.addQuestionsEnabled.value = false;
          vm.addQuestionsEnabled.text = "Add"
        } else {
          // If add question form is hidden, show it
          vm.addQuestionsEnabled.value = true;
          vm.addQuestionsEnabled.text = "Hide"
        }
        console.log(vm.addQuestionsEnabled)
      }

      vm.removeTest = function() {
        TestService.deleteTest($route.current.params.id).then((res) => {
          console.log("The response after deleting test is... ", res)
          // TO-DO --> Improve alert
          alert("The test has been successfully deleted")
          $location.path('/tests')
        })
      }

      $scope.$watch(
        function watchTestData(scope) {
          return vm.test
        }, 
        function handleTestDataChange(newVal, oldVal) {
          console.log("newVal: ", newVal)
          console.log("oldVal: ", oldVal)
        }
      );


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