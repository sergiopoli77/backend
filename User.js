const mongoose = require("mongoose");

//Buat Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  status: String,
});

//Buat Model
const User = mongoose.model("User", userSchema);

module.exports = User;
