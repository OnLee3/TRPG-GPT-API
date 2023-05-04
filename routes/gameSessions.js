const express = require("express");
const router = express.Router();
const GameSession = require("../models/GameSession");
const jwt = require("jsonwebtoken");

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // The token is usually in the format: "Bearer {token}"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

// Route to create a new game session
router.post("/create", isAuthenticated, async (req, res) => {
  const { sessionName } = req.body;

  const newGameSession = new GameSession({
    sessionName,
    gameMaster: req.user.id,
  });

  try {
    const savedGameSession = await newGameSession.save();
    res.json(savedGameSession);
  } catch (err) {
    res.status(500).json({ message: "Error creating game session", err });
  }
});

// Route to join an existing game session
router.put("/join/:id", isAuthenticated, async (req, res) => {
  try {
    const gameSession = await GameSession.findById(req.params.id);
    if (!gameSession) {
      return res.status(404).json({ message: "Game session not found" });
    }

    gameSession.players.push(req.user.id);
    const updatedGameSession = await gameSession.save();
    res.json(updatedGameSession);
  } catch (err) {
    res.status(500).json({ message: "Error joining game session", err });
  }
});

// Route to get all available game sessions
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const gameSessions = await GameSession.find().populate(
      "gameMaster",
      "email"
    );
    res.json(gameSessions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching game sessions", err });
  }
});

module.exports = router;
