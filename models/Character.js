const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  race: String,
  characterClass: String,
  level: {
    type: Number,
    default: 1,
  },
  attributes: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
  },
  // Add other character-related fields as needed
});

module.exports = mongoose.model("Character", characterSchema);
