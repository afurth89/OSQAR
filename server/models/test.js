var mongoose = require("mongoose");

var testSchema = new mongoose.Schema({
  title: String,
  category: String,
  questions: [{type: Schema.Types.ObjectId, ref: 'Question' }]
})

var Test = mongoose.model("Test", testSchema);

module.exports = Test;