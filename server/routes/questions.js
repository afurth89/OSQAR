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
    
  })
  .put((req, res) => {
    
  })
  .delete((req, res) => {
    
  })

module.exports = router;