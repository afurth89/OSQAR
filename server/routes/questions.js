var express = require('express')
    router = express.Router(),
    db = require('../models'),
    Promise = require("bluebird");

router.route('/')
  .get((req, res) => {
    db.Question.find({})
      .exec((err, questions) => {
        if (err) throw err;
        console.log("The returned questions data is... ", questions)
        res.send(questions)
      })

  })
  .post((req, res) => {
    var testId = req.body.testId
    // 1. Create the question
    createQuestion(req.body.question).then((createdQuestion) => {
      // 2. Add ref to Question to Test
      addQuestionToTest(testId, createdQuestion).then((test) => {
        // Send back the updated Test
        res.send(test)
      }) 
    })
  });

router.route('/:id')
  .get((req, res) => {
    console.log("ID of question to find is... ", req.params.id)
    // Get a single test
    db.Question.findById(req.params.id)
      .exec((err, question) => {
        if (err) throw err;
        console.log("Returned question is... ", question)
        res.send(question)
      })
  })
  .put((req, res) => {
    console.log("ID of question to update is... ", req.params.id)    
    db.Question.findByIdAndUpdate(req.params.id, req.body.question, (err, updatedQuestion) => {
      if (err) throw err;
      console.log("SUCCESSFUL UPDATED QUESTION --> ", updatedQuestion)
      res.send(updatedQuestion)
    })
  })
  .delete((req, res) => {
    console.log("ID of question to be deleted is... ", req.params.id)    
    db.Question.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
      if (err) throw err;
      console.log("SUCCESSFUL DELETED QUESTION --> ", deletedQuestion)
      res.send(deletedQuestion)
    })
  });

//***************************************************************************
// HELPER FUNCTIONS
//***************************************************************************

// Create a question
function createQuestion(question) {
  return new Promise((resolve) => {
    db.Question.create(question, (err, createdQuestion) => {
      if (err) throw err;
      console.log("The created question data is... ", createdQuestion)
      resolve(createdQuestion)
    })
  })
}

// Once question has been created, use testId to add reference to that question in test
function addQuestionToTest(testId, question) {
  return new Promise((resolve) => {
    db.Test.findById(testId, (err, foundTest) => {
      foundTest.questions.push(question._id)
      foundTest.save()
      console.log("Found Test after save...", foundTest)
      resolve(foundTest)
    })
  })
}




module.exports = router;