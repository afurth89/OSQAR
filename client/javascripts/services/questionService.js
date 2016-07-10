(function() {
  
  angular
    .module('osqarApp')
    .service('QuestionService', QuestionService)

    QuestionService.$inject = ['$http']

    function QuestionService($http) {
      const questions_BASE_URL = '/api/questions/';

      // GET - ALL TESTS
      this.getQuestions = () => {
        // COMMENTS BELOW OUTPUT RESULTS FOR CHECKING
        // var tests = $http.get(test_BASE_URL)
        // console.log("RESULT", tests)
        // return tests
        return $http.get(questions_BASE_URL)
      }

      // POST - NEW TEST
      this.createQuestion = (newTest) => {
        console.log("QUESTION TO BE CREATED IS... ", newTest)
        return $http.post(questions_BASE_URL, newQuestion)
      }

      // GET - SINGLE QUESTION
      this.getQuestion = (id) => {
        console.log("QUESTION ID is...", id)
        return $http.get(questions_BASE_URL+id)
      }

      this.updateQuestion = (id, editedTestData) => {
        console.log("The Id of the QUESTION to be updated is... ", id)
        console.log("The updated info this this QUESTION is... ", editedTestData)
        return $http.put(questions_BASE_URL+id, editedQuestiontData)
      }

      // DELETE - DELETE QUESTION
      this.deleteQuestion = (id) => {
        console.log("The Id of the QUESTION to be deleted is... ", id)
        return $http.delete(questions_BASE_URL+id)
      }
    }
})();