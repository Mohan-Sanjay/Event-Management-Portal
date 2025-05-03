const mongoose = require("mongoose");
const eventSchema = require("../models/eventModel");

const homijeConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/homije_baba");

const Event = homijeConnection.model("Event", eventSchema);

module.exports = { Event };
