// backend/config/dbConnections.js
const mongoose = require("mongoose");

const connections = {};

const createConnection = async (hallKey, uri) => {
  const conn = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connections[hallKey] = conn;
};

const initDatabases = async () => {
  await createConnection("eie", process.env.MONGO_URI_EIE);
  await createConnection("eee", process.env.MONGO_URI_EEE);
  await createConnection("sh", process.env.MONGO_URI_SH);
};

module.exports = { connections, initDatabases };
