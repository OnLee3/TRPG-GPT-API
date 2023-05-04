const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Additional user fields can be added here
});

module.exports = mongoose.model("User", userSchema);
