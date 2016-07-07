// var mongoose = require("mongoose");
var db = require('../models')

var seedQuestion = {
  text: "What was the first state in the United States?",
  category: "Social Studies",
  choices: [
        {id: 1, text: 'Delaware'},
        {id: 2, text: 'Maryland'},
        {id: 3, text: 'New York'},
        {id: 4, text: 'Pennsylvania'}],
  correct: {id: 1, text: 'Delaware'},
  tests: []
}

db.Question.remove({})
  .then(function(){
    db.Question.create(seedQuestion, function(){
      console.log("QUESTION CREATED!")
    })
  })

var seedTest = {
  title: "Founding of America",
  category: "Social Studies",
  questions: [{
    question: seedQuestion._id
  }]
}


db.Test.remove({})
  .then(function() {
    db.Test.create(seedTest, function() {
      console.log("TEST CREATED")
      process.exit(0)
    })
  })

