const GameSession = require("../models/GameSession");

exports.createGameSession = async (req, res) => {
  const { sessionName } = req.body;

  const newGameSession = new GameSession({
    sessionName,
    gameMaster: req.user.user.id,
  });
  try {
    const savedGameSession = await newGameSession.save();
    res.json(savedGameSession);
  } catch (err) {
    res.status(500).json({ message: "Error creating game session", err });
  }
};

exports.joinGameSession = async (req, res) => {
  try {
    const gameSession = await GameSession.findById(req.params.id);
    if (!gameSession) {
      return res.status(404).json({ message: "Game session not found" });
    }

    gameSession.players.push(req.user.user.id);
    const updatedGameSession = await gameSession.save();
    res.json(updatedGameSession);
  } catch (err) {
    res.status(500).json({ message: "Error joining game session", err });
  }
};

exports.getGameSessions = async (req, res) => {
  try {
    const gameSessions = await GameSession.find().populate(
      "gameMaster",
      "email"
    );
    res.json(gameSessions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching game sessions", err });
  }
};
