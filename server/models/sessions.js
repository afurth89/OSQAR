var mongoose = require("mongoose");

var sessionsSchema = new mongoose.Schema({
  // Look for link to another collection
  test_id: Number,
  // Link to another collection
  user_id: Number,
  user_answers: [{
    // Link to another collection
    q_id: Number,
    q_correct: {id: Number, text: String},
    u_answer: {id: Number, text: String},
    correct: Boolean
  }]
})

var Session = mongoose.model("Session", sessionsSchema)

module.exports = Session;