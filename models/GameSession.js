const mongoose = require("mongoose");

const gameSessionSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
  },
  gameMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["waiting", "in-progress", "completed"],
    default: "waiting",
  },
});

const GameSession = mongoose.model("GameSession", gameSessionSchema);

module.exports = GameSession;
