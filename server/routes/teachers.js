var express = require('express')
    router = express.Router(),
    db = require('../models')

router.route('/')
  .get((req, res) => {
    // Get all tests
    db.Test
    .find({}).populate('questions')
      .exec((err, tests) => {
        if (err) throw err;
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


module.exports = router;