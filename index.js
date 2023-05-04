const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const gameSessionRoutes = require("./routes/gameSessions");
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
app.use("/auth", authRoutes);
app.use("/game-session", gameSessionRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
