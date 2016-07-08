var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
var Schema = mongoose.Schema

var questionSchema = new Schema({
  text: String,
  category: String,
  choices: [{id: Number, text: String}],
  correct: {id: Number, text: String},
  tests: [{type: Schema.Types.ObjectId, ref: 'Test'}]
})

var Question = mongoose.model("Question", questionSchema)

module.exports = Question;