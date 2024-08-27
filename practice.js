console.log("Starting the server...");

require("dotenv").config();
require("./config/connection");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth_routes");
const notesRoutes = require("./routes/notes_routes");
const usersRoutes = require("./routes/users_routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});

module.exports = app;