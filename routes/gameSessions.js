const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  createGameSession,
  joinGameSession,
  getGameSessions,
  getGameSession,
} = require("../controllers/gameSessionController");

router.post("/create", isAuthenticated, createGameSession);
router.put("/join/:id", isAuthenticated, joinGameSession);
router.get("/", isAuthenticated, getGameSessions);
router.get("/:id", isAuthenticated, getGameSession);

module.exports = router;
