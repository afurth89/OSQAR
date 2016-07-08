var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/OSQAR")
mongoose.set("debug", true);

// module.exports.MODEL_NAME = require("./model_name")
module.exports.Question = require("./question")
module.exports.Test = require("./test")
module.exports.Session = require("./session")