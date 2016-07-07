var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  // Look for link to another collection ref
  test_id: Number,
  // Link to another collection ref
  user_id: Number,
  answers: [{
    // Link to another collection
    q_id: Number,
    u_answer: {id: Number, text: String}

  }]
})

var Session = mongoose.model("Session", sessionSchema)

module.exports = Session;