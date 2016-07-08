// var mongoose = require("mongoose");
var db = require('../models')
var Promise = require('bluebird')


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

Promise.join(deleteQs(), createQs(seedQuestions), (_ ,createdQuestions) => {
  // eval(require('locus'))
  console.log("createdQuestions here", createdQuestions)
  Promise.join(deleteTests(), createTest(createdQuestions), (_, createdTest) => {
    process.exit(0)
  })
})


//***************************************************************************
// HELPER FUNCTIONS
//***************************************************************************

// Remove all docs from questions collections
function deleteQs() {
  return db.Question.remove({})
}

// Creates an array of Promises to create each Question doc,
// and resolve all those promises, returning the array of created questions (w/ Ids)
// 1. Take in array of question data
function createQs(arrQs) {

  // 2. Promise.map creates an array of RESOLVED promises, 
      // (each of which resolves when the document is created in DB)
  return Promise.map(arrQs, (question) => {
    return db.Question.create(question)

  // 3. Array of 'createdQuestions' (once complete) is passed to '.then' and returned
  }).then((createdQuestions) => {
    // eval(require('locus'))
    // return array of newly created questions to callback for first 'Promise.join'
    return createdQuestions
  })
}


// Remove all docs from tests collection
function deleteTests() {
  return db.Test.remove({})
}
// Create test document (containing ids of recently created question docs)
function createTest(arrCreatedQs) {
  var seedTest = {
    title: "Founding of America",
    category: "Social Studies",
    // Array of created questions (with '_id') from the result of 'createQs'
      // Without '_id' reference in Test could not be made
      // 'CastError' would occur
    questions: arrCreatedQs
  }
  return db.Test.create(seedTest)
}



