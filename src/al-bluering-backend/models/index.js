const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// dbConfig.atlas for connecting to Atlas service, uncomment the line below to run the local mongodb server
db.url = dbConfig.atlas;
// db.url = dbConfig.url;

db.ageGroups = require("./AgeGroups.model.js")(mongoose);
db.modules = require("./Modules.model.js")(mongoose);
db.coaches = require("./Coaches.model.js")(mongoose);
db.materials = require("./Materials.model.js")(mongoose);
db.admins = require("./Administrators.model.js")(mongoose);
db.fileMaterials = require("./FileMaterials.model.js")(mongoose);
db.textureMaterials = require("./TextureMaterials.model.js")(mongoose);
db.assessments = require("./Assessments.model.js")(mongoose);

module.exports = db;
