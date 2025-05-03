const mongoose = require("mongoose");
const eventSchema = require("../models/eventModel");

const homijeConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/sir_cv_raman");

const Event = homijeConnection.model("Event", eventSchema);

module.exports = { Event };
