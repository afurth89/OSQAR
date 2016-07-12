var express = require('express')
    router = express.Router(),
    db = require('../models'),
    Promise = require("bluebird");

router.route('/')
  .get((req, res) => {
    // Get all tests
    db.Test
    .find({}).populate('questions')
      .exec((err, tests) => {
        if (err) throw err;
        
        // Testing for correct response
        // DELETE BEFORE PRODUCTION
        console.log("TESTS: ", tests)
        tests.forEach((test) => {
          console.log("Title: ", test.title)
          console.log("Category: ", test.category)
          console.log("Questions: ", test.questions)
          test.questions.forEach((question) => {
            console.log("Question Id: ", question._id)
          })
        })

        res.send(tests)
      })
  })
  .post((req, res) => {
    console.log("REQUEST OBJECT TO BE CREATED --> ", req.body.test)
    db.Test.create(req.body.test, (err, createdTest) => {
        if (err) throw err;
        console.log("SUCCESSFUL CREATED TEST --> ", createdTest)
        res.send(createdTest)
      })
  })

router.route('/:id')
  .get((req, res) => {
    console.log("ID of test to find is... ", req.params.id)
    // Get a single test
    db.Test.findById(req.params.id).populate('questions')
      .exec((err, test) => {
        if (err) throw err;
        console.log("Returned Test is... ", test)
        res.send(test)
      }) 
  })
  .put((req, res) => {
    console.log("ID of test to update is... ", req.params.id)    
    // ADDING A QUESTION TO TEST
    if (req.body.qId) {
      eval(require('locus'))
      addQuestionToTest(req.params.id, req.body.qId).then((updatedTest) => {
        res.send(updatedTest)
      })

    // UPDATING TITLE/CATEGORY OF TEST
    } else {
      db.Test.findByIdAndUpdate(req.params.id, req.body.test, (err, updatedTest) => {
        if (err) throw err;
        console.log("SUCCESSFUL UPDATED TEST --> ", updatedTest)
        res.send(updatedTest)
      })
    }
  })
  .delete((req, res) => {
    console.log("ID of test to be deleted is... ", req.params.id)    
    db.Test.findByIdAndRemove(req.params.id, (err, deletedTest) => {
      if (err) throw err;
      console.log("SUCCESSFUL DELETED TEST --> ", deletedTest)
      res.send(deletedTest)
    })
  })

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
  function addQuestionToTest(testId, qId) {
    return new Promise((resolve) => {
      db.Test.findById(testId, (err, foundTest) => {
        foundTest.questions.push(qId)
        foundTest.save()
        console.log("Found Test after save...", foundTest)
        resolve(foundTest)
      })
    })
  }

  function populateTest(testId) {
    return new Promise((resolve) => {
      db.Test.findById(testId).populate('questions')
        .exec((err, populatedTest) => {
          if (err) throw err;
          console.log("Returned Test is... ", populatedTest)
          resolve(populatedTest)
        })
    })
  }  


module.exports = router;