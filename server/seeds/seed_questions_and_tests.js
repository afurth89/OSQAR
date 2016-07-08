//***************************************************************************
// OLD SEED FILE (using native Promises)
//***************************************************************************



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

//***************************************************************************
// Promise structure derived from: http://stackoverflow.com/questions/35662618/turning-a-mongoose-seeding-script-into-a-promise
//***************************************************************************

// Creating a Promise for each Create operation
seedQuestions.forEach((question) => {
  seedQsWithPromises.push(saveQuestionAsync(question));
})

// Function return a Promise that will resolve once question is created
  // These Promises will be passed as an array into Promise.all
function saveQuestionAsync(questionData) {
  return new Promise((resolve,reject) => {
    // Create a question with object data
    db.Question.create(questionData, function(err, createdQuestion) {
      if (err) {reject(err)}
      else {
        // createdQuestion returned
        // CONTAINS '_id' for that question
        // which is needed to create reference in Test
        console.log("QUESTION CREATED: ", createdQuestion)
        resolve(createdQuestion);
      }
    })
  })
}

db.Question.remove({}).then(() => {
  // Won't resolve until each individual Promise has resolved
   // 'questions' is an array that contains the 'createdQuestion' 
   // passed through the 'resolve' callback above
  Promise.all(seedQsWithPromises).then((questions) => {

    console.log("QUESTIONS CREATED -->", questions)
    var seedTest = {
      title: "Founding of America",
      category: "Social Studies",
      // Array of created questions (with '_id')
        // Without '_id' reference in Test could not be made
        // 'CastError' would occur
      questions: questions
    }
    // Remove any existing tests
    db.Test.remove({})
      .then(function() {
        console.log("SEED TEST:  ", seedTest)
        // Create new test with reference to questions
        db.Test.create(seedTest, function(err, createdTest) {
          if (err) console.log("ERROR", err.errors)
          console.log("TEST CREATED", createdTest)
          process.exit(0)
        })
      })
  })
})










