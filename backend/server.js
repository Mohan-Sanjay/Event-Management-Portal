// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { initDatabases } = require("./config/dbConnections");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

initDatabases().then(() => console.log("Connected to all seminar DBs"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/organizer", require("./routes/organizer"));
app.use("/api/admin", require("./routes/admin"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
