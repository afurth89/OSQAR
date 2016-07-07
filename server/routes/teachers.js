var express = require('express')
    router = express.Router(),
    db = require('../models')

router.route('/')
  .get((req, res) => {
    // Get all tests
    db.Test.find({}, (err, tests) => {
      if (err) throw err;
      console.log(tests)
      res.send(tests)
    })
  })


module.exports = router;