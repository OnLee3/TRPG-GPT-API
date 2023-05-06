const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  generateStoryEvent,
  generateCharacterBackground,
  generateCharacterInteraction,
} = require("../config/gptAPI");

router.post("/generate-story-event", isAuthenticated, generateStoryEvent);
router.post(
  "/generate-character-background",
  isAuthenticated,
  generateCharacterBackground
);
router.post(
  "/generate-character-interaction",
  isAuthenticated,
  generateCharacterInteraction
);

module.exports = router;
