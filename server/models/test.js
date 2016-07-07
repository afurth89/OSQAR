var mongoose = require("mongoose");
var Schema = mongoose.Schema

var testSchema = new Schema({
  title: String,
  category: String,
  // questions: [{type: Schema.Types.ObjectId, ref: 'Question' }]
  questions: [{
      type: Schema.Types.ObjectId, 
      ref: 'Question' 
  }]
})

var Test = mongoose.model("Test", testSchema);

module.exports = Test;