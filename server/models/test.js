var mongoose = require("mongoose");

var testSchema = new mongoose.Schema({
  title: String,
  category: String
})

var Test = mongoose.model("Test", testSchema);

module.exports = Test;