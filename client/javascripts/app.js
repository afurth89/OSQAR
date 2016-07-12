(function() {
  angular
    .module('osqarApp', ['ngRoute'])
    .config(config)

    config.$inject = ['$routeProvider', '$locationProvider']

    function config($routeProvider, $locationProvider) {
      $routeProvider
        //***************************************************************************
        // TESTS ROUTES
        //***************************************************************************
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
            test: getTestById,
            allQuestions: getAllQuestions
          }
        })
        .when('/tests/:id/edit', {
          templateUrl: '../views/tests/edit.html',
          controller: 'EditTestController',
          controllerAs: 'vm',
          resolve: {
            test: getTestById
          }
        })
        //***************************************************************************
        //QUESTIONS ROUTES
        //***************************************************************************
        .when('/questions', {
          templateUrl: '../views/questions/index.html',
          controller: 'QuestionParentController',
          controllerAs: 'vm',
          resolve: {
            questions: getAllQuestions
          }
        })
        .when('/questions/new', {
          templateUrl: '../views/questions/new.html',
          controller: 'NewQuestionController',
          controllerAs: 'vm'
        })
        .when('/questions/:id', {
          templateUrl: '../views/questions/show.html',
          controller: 'ShowQuestionController',
          controllerAs: 'vm',
          resolve: {
            question: getQuestionById
          }
        })
        .when('/questions/:id/edit', {
          templateUrl: '../views/questions/edit.html',
          controller: 'EditQuestionController',
          controllerAs: 'vm',
          resolve: {
            question: getQuestionById
          }
        })
        //***************************************************************************
        // SESSIONS ROUTES
        //***************************************************************************
        // .when('/sessions', {
        //   templateUrl: '../views/sessions/index.html',
        //   controller: 'QuestionParentController',
        //   controllerAs: 'vm',
        //   resolve: {
        //     questions: getAllQuestions
        //   }
        // })
        .when('/sessions/new', {
          templateUrl: '../views/sessions/new.html',
          controller: 'NewSessionController',
          controllerAs: 'vm'
        })
        // .when('/sessions/:id', {
        //   templateUrl: '../views/sessions/show.html',
        //   controller: 'ShowQuestionController',
        //   controllerAs: 'vm',
        //   resolve: {
        //     question: getQuestionById
        //   }
        // })
        // .when('/sessions/:id/edit', {
        //   templateUrl: '../views/sessions/edit.html',
        //   controller: 'EditQuestionController',
        //   controllerAs: 'vm',
        //   resolve: {
        //     question: getQuestionById
        //   }
        // })
        //***************************************************************************
        // CATCH-ALL
        //***************************************************************************
        .otherwise({redirectTo: '/tests'})
      $locationProvider.html5Mode(true);
    }

   
//***************************************************************************
// TESTS ON-LOAD FUNCTIONS
//***************************************************************************
    getAllTests.$inject = ['TestService']

    function getAllTests(TestService) {
      return TestService.getTests();
    }

    getTestById.$inject = ['TestService', '$route']

    function getTestById(TestService, $route) {
      // Pulls the id of test from the $route object
      return TestService.getTest($route.current.params.id)
    }

//***************************************************************************
// QUESTIONS ON-LOAD FUNCTIONS
//***************************************************************************
    getAllQuestions.$inject = ['QuestionService']

    function getAllQuestions(QuestionService) {
      return QuestionService.getQuestions();
    }

    getQuestionById.$inject = ['QuestionService', '$route']

    function getQuestionById(QuestionService, $route) {
      // Pulls the id of question from the $route object
      return QuestionService.getQuestion($route.current.params.id)
    }
})();