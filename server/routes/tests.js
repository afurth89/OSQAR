var express = require('express')
    router = express.Router(),
    db = require('../models'),
    Promise = require("bluebird");

router.route('/')
  // Get all tests
  .get((req, res) => {
    db.Test
    .find({}).populate('questions')
      .exec((err, tests) => {
        if (err) throw err;
        res.send(tests)
      })
  })
  // Create new test
  .post((req, res) => {
    db.Test.create(req.body.test, (err, createdTest) => {
        if (err) throw err;
        res.send(createdTest)
      })
  })

router.route('/:id')
  // Get specific test
  .get((req, res) => {
    db.Test.findById(req.params.id).populate('questions')
      .exec((err, test) => {
        if (err) throw err;
        res.send(test)
      }) 
  })
  // Update specific test
  .put((req, res) => {
    // ADDING A QUESTION
    if (req.body.qId) {
      // Add question ref to test
      addQuestionToTest(req.params.id, req.body.qId).then((test) => {
        // Repopulate the test's questions
        populateTest(test._id).then((populatedTest) => {
          // Send back the updated Test
          res.send(populatedTest)
        })
      }) 

    // REMOVING A QUESTION
    } else if (req.body.qIdToDel){
      removeQuestionFromTest(req.params.id, req.body.qIdToDel).then((test) => {
        // Repopulate the test's questions
        populateTest(test._id).then((populatedTest) => {
          // Send back the updated Test
          res.send(populatedTest)
        })
      })
    // UPDATING TITLE/CATEGORY OF TEST
    } else {
      db.Test.findByIdAndUpdate(req.params.id, req.body.test, (err, updatedTest) => {
        if (err) throw err;
        res.send(updatedTest)
      })
    }
  })
  // Find the test and populate with questions
  // Delete a test
  .delete((req, res) => {
    db.Test.findByIdAndRemove(req.params.id, (err, deletedTest) => {
      if (err) throw err;
      res.send(deletedTest)
    })
  })

  //***************************************************************************
  // HELPER FUNCTIONS
  //***************************************************************************

  // Once question has been created, use testId to add reference to that question in test
  function addQuestionToTest(testId, qId) {
    return new Promise((resolve) => {
      db.Test.findById(testId, (err, foundTest) => {
        foundTest.questions.push(qId)
        foundTest.save()
        resolve(foundTest)
      })
    })
  }

  function removeQuestionFromTest(testId, qId) {
    return new Promise((resolve) => {
      // Find test
      db.Test.findById(testId, (err, foundTest) => {
        // Find the index of the question to be removed
        qIdx = foundTest.questions.findIndex((el) => {
          // qId is a string, so el (an object), must also 
          // be converted to a string before comparing
          if (el.toString() === qId) {
            return el
          }
        })
        // Remove the question from questions array
        foundTest.questions.splice(qIdx, 1)
        // Save changes
        foundTest.save()
        // Return updated test
        resolve(foundTest)
      })
    })
  }

  function populateTest(testId) {
    return new Promise((resolve) => {
      // Find the test and populate with questions
      db.Test.findById(testId).populate('questions')
        .exec((err, populatedTest) => {
          if (err) throw err;
          resolve(populatedTest)
        })
    })
  }  


module.exports = router;