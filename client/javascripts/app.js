(function() {
  angular
    .module('osqarApp', ['ngRoute'])
    .config(config)

    config.$inject = ['$routeProvider', '$locationProvider']

    function config($routeProvider, $locationProvider) {
      $routeProvider
        .when('/teachers', {
          templateUrl: '../views/teachers/index.html',
          controller: 'TeacherParentController',
          controllerAs: 'vm',
          resolve: {
            tests: getAllTests
          }
        })
        .otherwise({redirectTo: '/teachers'})
      $locationProvider.html5Mode(true);
    }

    getAllTests.$inject = ['TeacherService']

    function getAllTests(TeacherService) {
      return TeacherService.getTests();
    }
})();