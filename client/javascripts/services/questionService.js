(function() {
  
  angular
    .module('osqarApp')
    .service('QuestionService', QuestionService)

    QuestionService.$inject = ['$http']

    function QuestionService($http) {
      const questions_BASE_URL = '/api/questions/';

      // GET - ALL QUESTIONS
      this.getQuestions = () => {
        // See TestService for comments to console.log output
        return $http.get(questions_BASE_URL)
      }

      // POST - NEW QUESTION
      this.createQuestion = (newQuestion) => {
        console.log("QUESTION TO BE CREATED IS... ", newQuestion)
        return $http.post(questions_BASE_URL, newQuestion)
      }

      // GET - SINGLE QUESTION
      this.getQuestion = (id) => {
        console.log("QUESTION ID is...", id)
        return $http.get(questions_BASE_URL+id)
      }

      this.updateQuestion = (id, editedQuestiontData) => {
        console.log("The Id of the QUESTION to be updated is... ", id)
        console.log("The updated info this this QUESTION is... ", editedQuestiontData)
        return $http.put(questions_BASE_URL+id, editedQuestiontData)
      }

      // DELETE - DELETE QUESTION
      this.deleteQuestion = (id) => {
        console.log("The Id of the QUESTION to be deleted is... ", id)
        return $http.delete(questions_BASE_URL+id)
      }
    }
})();