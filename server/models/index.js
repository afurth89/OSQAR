var mongoose = require("mongoose")
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/OSQAR")
mongoose.set("debug", true);

// module.exports.MODEL_NAME = require("./model_name")
module.exports.Question = require("./questions")
module.exports.Test = require("./tests")