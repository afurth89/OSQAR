// var mongoose = require("mongoose");
var db = require('../models')

db.Question.remove({}).then(function(){
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

  db.Question.create(seedQuestion, function(){
    console.log("CREATED!")
    process.exit(0)
  })
})

/* Connect to the DB */
// mongoose.connect('mongodb://localhost/OSQAR',function(){
//      Drop the DB 
//     mongoose.connection.db.Question.remove({});
// });
