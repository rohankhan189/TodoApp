const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const url = process.env.DATABASE;

mongoose.connect(url, {
})
.then(() => {
  console.log("db is connected");
})
.catch((err) => {
  console.error("Connection failed", err);
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection failed"));

module.exports = mongoose;