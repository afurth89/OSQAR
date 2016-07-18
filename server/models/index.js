require('dotenv').load();

var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));

if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
  mongoose.connect('mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds023455.mlab.com:23455/osqar_db')
} else {
  mongoose.connect("mongodb://localhost/OSQAR")
}
mongoose.set("debug", true);

// module.exports.MODEL_NAME = require("./model_name")
module.exports.Question = require("./question")
module.exports.Test = require("./test")
module.exports.Session = require("./session")