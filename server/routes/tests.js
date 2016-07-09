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
    console.log("REQUEST --> ", req.body.test)
    db.Test.create(req.body.test, (err, createdTest) => {
        if (err) throw err;
        console.log("SUCCESSFUL CREATED TEST --> ", createdTest)
        res.send(createdTest)
      })
  })


module.exports = router;