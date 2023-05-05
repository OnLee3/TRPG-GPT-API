const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const gameSessionRoutes = require("./routes/gameSessions");
const characterRoutes = require("./routes/characters");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/game-session", gameSessionRoutes);
app.use("/api/characters", characterRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
