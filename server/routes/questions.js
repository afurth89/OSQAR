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
    db.Question.create(req.body.question, (err, createdQuestion) => {
      if (err) throw err;
      console.log("The created question data is... ", createdQuestion)
      res.send(createdQuestion)
    })
  })

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
    
  })
  .delete((req, res) => {
    console.log("ID of question to be deleted is... ", req.params.id)    
    db.Question.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
      if (err) throw err;
      console.log("SUCCESSFUL DELETED QUESTION --> ", deletedQuestion)
      res.send(deletedQuestion)
    })
  })

module.exports = router;