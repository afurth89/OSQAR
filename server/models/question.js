var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
  text: String,
  category: String,
  choices: [{id: Number, text: String}],
  correct: {id: Number, text: String},
  tests: [{type: Schema.Types.ObjectId, ref: 'Test'}]
})

var Question = mongoose.model("Question", questionSchema)

module.exports = Question;