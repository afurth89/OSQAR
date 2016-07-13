var express = require('express')
    router = express.Router(),
    db = require('../models'),
    Promise = require("bluebird");

router.route('/')
  .get((req, res) => {

  })
  .post((req, res) => {
    console.log("REQ: ", req)
    db.Session.create(req.body.session, (err, createdSession) => {
      console.log("SUCCESSFUL CREATED SESSION", createdSession)
      res.send(createdSession)
    })
  })

router.route('/:id')
  .get((req, res) => {

  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  })

  //***************************************************************************
  // HELPER FUNCTIONS
  //***************************************************************************
 


module.exports = router;