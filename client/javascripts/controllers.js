(function() {
  
  angular
    .module('osqarApp')
    .controller('TestParentController', TestParentController)
    .controller('NewTestController', NewTestController)
    .controller('ShowTestController', ShowTestController)

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

      vm.availableCategories = [
        {id: "1", name: "Math"},
        {id: "2", name: "English"},
        {id: "3", name: "Social Studies"},
        {id: "4", name: "Science"}
      ]

      vm.addTest = function(newTest) {
        var req = {
          test: {
            title: newTest.title,
            category: newTest.category.name
          } 
        }
        TestService.createTest(req).then((res) => {
          console.log("Response from the server is...", res)
          $location.path('/tests')
        })
      }
    }

    ShowTestController.$inject = ['test']

    function ShowTestController(test) {
      let vm = this;

      vm.test = test.data
    }

})();