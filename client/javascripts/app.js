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
        .when('/tests/new', {
          templateUrl: '../views/tests/new.html',
          controller: 'NewTestController',
          controllerAs: 'vm'
        })
        .when('/tests/:id', {
          templateUrl: '../views/tests/show.html',
          controller: 'ShowTestController',
          controllerAs: 'vm',
          resolve: {
            test: getTestById
          }
        })
        .otherwise({redirectTo: '/tests'})
      $locationProvider.html5Mode(true);
    }

    getAllTests.$inject = ['TestService']

    function getAllTests(TestService) {
      return TestService.getTests();
    }

    getTestById.$inject = ['TestService', '$route']

    function getTestById(TestService, $route) {
      debugger
      return TestService.getTest($route.current.params.id)
    }
})();