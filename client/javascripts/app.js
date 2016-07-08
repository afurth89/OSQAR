(function() {
  angular
    .module('osqarApp', ['ngRoute'])
    .config(config)

    config.$inject = ['$routeProvider', '$locationProvider']

    function config($routeProvider, $locationProvider) {
      $routeProvider
        .when('/tests', {
          templateUrl: '../views/tests/index.html',
          controller: 'TestParentController',
          controllerAs: 'vm',
          resolve: {
            tests: getAllTests
          }
        })
        .otherwise({redirectTo: '/tests'})
      $locationProvider.html5Mode(true);
    }

    getAllTests.$inject = ['TestService']

    function getAllTests(TestService) {
      return TestService.getTests();
    }
})();