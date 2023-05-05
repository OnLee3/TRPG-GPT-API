const Character = require("../models/Character");

exports.createCharacter = async (req, res) => {
  try {
    const character = new Character({ ...req.body, user: req.user.user.id });
    const savedCharacter = await character.save();
    res.status(201).json(savedCharacter);
  } catch (err) {
    res.status(400).json({ message: "Error creating character", error: err });
  }
};

exports.getCharacters = async (req, res) => {
  try {
    const characters = await Character.find({ user: req.user.user.id });
    res.json(characters);
  } catch (err) {
    res.status(400).json({ message: "Error fetching characters", error: err });
  }
};

exports.getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (character && character.user.toString() === req.user.user.id) {
      res.json(character);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error fetching character", error: err });
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const updatedCharacter = await Character.findOneAndUpdate(
      { _id: req.params.id, user: req.user.user.id },
      req.body,
      { new: true }
    );
    if (updatedCharacter) {
      res.json(updatedCharacter);
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error updating character", error: err });
  }
};

exports.deleteCharacter = async (req, res) => {
  try {
    const deletedCharacter = await Character.findOneAndDelete({
      _id: req.params.id,
      user: req.user.user.id,
    });
    if (deletedCharacter) {
      res.json({ message: "Character deleted successfully" });
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error deleting character", error: err });
  }
};
