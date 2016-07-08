// var mongoose = require("mongoose");
var db = require('../models')

var seedQuestions = [
  {
    text: "What was the first state in the United States?",
    category: "Social Studies",
    choices: [
          {id: 1, text: 'Delaware'},
          {id: 2, text: 'Maryland'},
          {id: 3, text: 'New York'},
          {id: 4, text: 'Pennsylvania'}],
    correct: {id: 1, text: 'Delaware'},
    tests: []
  },
  {
    text: "Who was the first President of the United States?",
    category: "Social Studies",
    choices: [
          {id: 1, text: 'John Adams'},
          {id: 2, text: 'Alexander Hamilton'},
          {id: 3, text: 'Abraham Lincoln'},
          {id: 4, text: 'George Washington'}],
    correct: {id: 4, text: 'George Washington'},
    tests: []
  },
  {
    text: "When did the United States declare its independence?",
    category: "Social Studies",
    choices: [
          {id: 1, text: '1706'},
          {id: 2, text: '1776'},
          {id: 3, text: '1789'},
          {id: 4, text: '1812'}],
    correct: {id: 2, text: '1776'},
    tests: []
  },
  {
    text: "What country did the United States declare its independence from?",
    category: "Social Studies",
    choices: [
          {id: 1, text: 'France'},
          {id: 2, text: 'Spain'},
          {id: 3, text: 'England'},
          {id: 4, text: 'Germany'}],
    correct: {id: 3, text: 'England'},
    tests: []
  },
  {
    text: "How many colonies did the United States have?",
    category: "Social Studies",
    choices: [
          {id: 1, text: '7'},
          {id: 2, text: '18'},
          {id: 3, text: '0'},
          {id: 4, text: '13'}],
    correct: {id: 4, text: '13'},
    tests: []
  }
]

var seedQsWithPromises = []


// Creating a Promise for each create operation
seedQuestions.forEach((question) => {
  seedQsWithPromises.push(saveQuestionAsync(question));
})


// Running all Promise sequentially, and THEN 
  // clearing Tests and Creating the new test
Promise.all(seedQsWithPromises).then((questions) => {
  // "questions" has no ._id property
  console.log("QUESTIONS CREATED -->", questions[0]._id)
  var seedTest = {
    title: "Founding of America",
    category: "Social Studies",
    questions: questions
  }
  db.Test.remove({})
    .then(function() {
      console.log("SEED TEST:  ", seedTest.questions[0].choices)
      db.Test.create(seedTest, function(err) {
        if (err) console.log("ERROR", err.errors)
        console.log("TEST CREATED")
        process.exit(0)
      })
    })
})

// Function return a Promise
function saveQuestionAsync(questionData) {
  return new Promise((resolve,reject) => {
    db.Question.create(questionData, function(err, createdQuestion) {
      if (err) {reject(err)}
      else {
        console.log("QUESTION CREATED: ", createdQuestion)
        resolve(createdQuestion);
      }
    })
  })
}








