require('dotenv').load();

var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
var MONGOLAB_URI = 'mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds023455.mlab.com:23455/osqar_db'
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/OSQAR")
mongoose.set("debug", true);

// module.exports.MODEL_NAME = require("./model_name")
module.exports.Question = require("./question")
module.exports.Test = require("./test")
module.exports.Session = require("./session")