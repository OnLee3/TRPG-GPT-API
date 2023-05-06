const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { generateStoryEvent } = require("../config/gptApi");
const {
  createGameSession,
  joinGameSession,
  getGameSessions,
} = require("../controllers/gameSessionController");

router.post("/create", isAuthenticated, createGameSession);
router.put("/join/:id", isAuthenticated, joinGameSession);
router.get("/", isAuthenticated, getGameSessions);
router.post("/generateEvent", isAuthenticated, generateStoryEvent);

module.exports = router;
