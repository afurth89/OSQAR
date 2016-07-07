var mongoose = require("mongoose");
var Schema = mongoose.Schema

var sessionSchema = new Schema({
  // Link to Test
  _test: {type: Schema.Types.ObjectId, ref: 'Test'},
  // Link to User
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  answers: [{
    // Link to Question
    _question: {type: Schema.Types.ObjectId, ref: 'Question'},
    u_answer: {id: Number, text: String}

  }]
})

var Session = mongoose.model("Session", sessionSchema)

module.exports = Session;