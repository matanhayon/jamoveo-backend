require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const instrumentRoutes = require("./routes/instrumentRoutes");
const songsRoutes = require("./routes/songRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", authRoutes); // Exposes /login and /signup
app.use("/", userRoutes);
app.use("/instruments", instrumentRoutes);
app.use("/songs", songsRoutes);

module.exports = app;
