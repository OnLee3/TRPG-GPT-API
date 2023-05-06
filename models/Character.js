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
  background: String, // describe the character's background that giving to GPT-3.5 API as a system prompt.
});

module.exports = mongoose.model("Character", characterSchema);
