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
  .delete((req, res) => {
    console.log("ID of test to be deleted is... ", req.params.id)    
    db.Test.findByIdAndRemove(req.params.id, (err, deletedTest) => {
      if (err) throw err;
      console.log("SUCCESSFUL DELETED TEST --> ", deletedTest)
      res.send(deletedTest)
    })
  })


module.exports = router;