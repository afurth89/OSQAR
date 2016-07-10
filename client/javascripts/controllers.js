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

      vm.test = {
        title: null,
        category: null
      };

      // Categories that display in dropdown when creating test
      vm.availableCategories = [
        {id: "1", name: "Math"},
        {id: "2", name: "English"},
        {id: "3", name: "Social Studies"},
        {id: "4", name: "Science"}
      ]

      vm.addTest = function(newTest) {
        if (newTest.title && newTest.category) {
          // "req" object becomes 'req.body' in http call to db
            // 'req.test' is perfectly formatted object for db
            // Becomes 'req.body.test' when db is ingesting it
          var req = {
            test: {
              title: newTest.title,
              // Must pull only 'name' attr from category object
              category: newTest.category.name
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

    ShowTestController.$inject = ['test', 'TestService', '$location', "$route"]

    function ShowTestController(test, TestService, $location, $route) {
      let vm = this;

      // 'test.data' is result of 'resolve' property
      // within ShowTestController in app.js
      vm.test = test.data

      vm.removeTest = function() {
        TestService.deleteTest($route.current.params.id).then((res) => {
          console.log("The response after deleting test is... ", res)
          // TO-DO --> Improve alert
          alert("The test has been successfully deleted")
          $location.path('/tests')
        })
      }
    }

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

      }
    }
})();