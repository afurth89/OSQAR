(function() {
  angular
    .module('osqarApp', ['ngRoute', 'dndLists', 'nvd3'])
    .config(config)

    config.$inject = ['$routeProvider', '$locationProvider']

    function config($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '../views/home.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        })
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
        .when('/sessions', {
          templateUrl: '../views/sessions/index.html',
          controller: 'SessionParentController',
          controllerAs: 'vm',
          resolve: {
            sessions: getAllSessions
          }
        })
        .when('/sessions/new', {
          templateUrl: '../views/sessions/new.html',
          controller: 'NewSessionController',
          controllerAs: 'vm',
          resolve: {
            allTests: getAllTests
          }
        })
        .when('/sessions/:id', {
          templateUrl: '../views/sessions/showStartSession.html',
          controller: 'ShowSessionController',
          controllerAs: 'vm',
          resolve: {
            session: getSessionById,
            trackingData: getSessionTrackingData,
            chartOptions: getChartOptions,
            chartData: getChartData
          }
        })
        .when('/sessions/:id/question/:qNum', {
          templateUrl: '../views/sessions/showQuestion.html',
          controller: 'ShowSessionController',
          controllerAs: 'vm',
          resolve: {
            session: getSessionById,
            trackingData: getSessionTrackingData,
            chartOptions: getChartOptions,
            chartData: getChartData
          }
        })
        .when('/sessions/:id/question/:qNum/result', {
          templateUrl: '../views/sessions/showQuestionResult.html',
          controller: 'ShowSessionController',
          controllerAs: 'vm',
          resolve: {
            session: getSessionById,
            trackingData: getSessionTrackingData
          }
        })
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
        .otherwise({redirectTo: '/'})
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

//***************************************************************************
// SESSIONS ON-LOAD FUNCTIONS
//***************************************************************************
    getAllSessions.$inject = ['SessionService']

    function getAllSessions(SessionService) {
      return SessionService.getSessions();
    }

    getSessionById.$inject = ['SessionService', '$route']

    function getSessionById(SessionService, $route) {
      return SessionService.getSession($route.current.params.id);      
    }

    getSessionTrackingData.$inject = ['SessionService', '$route'] 

    function getSessionTrackingData(SessionService, $route) {
      return SessionService.serveSessionTrackingData($route.current.params.qNum)
    }

    getChartOptions.$inject = ['SessionService']

    function getChartOptions(SessionService) {
      return SessionService.serveChartOptions();
    }

    getChartData.$inject = ['SessionService']

    function getChartData(SessionService) {
      return SessionService.serveChartData();
    }
})();