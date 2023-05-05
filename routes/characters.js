const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// Character CRUD routes
router.post("/create", isAuthenticated, characterController.createCharacter);
router.get("/", isAuthenticated, characterController.getCharacters);
router.get("/:id", isAuthenticated, characterController.getCharacterById);
router.put("/:id", isAuthenticated, characterController.updateCharacter);
router.delete("/:id", isAuthenticated, characterController.deleteCharacter);

module.exports = router;
