const mongoose = require("mongoose");
const dbConfig = require("../config");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.comment = require("./comments")(mongoose);
db.blog = require("./blog")(mongoose);

module.exports = db;
