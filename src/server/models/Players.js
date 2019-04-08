const mongoose = require("mongoose");
const prikey = "c88f2647-7551-492f-953f-656b4f321f5a";
const Team = require("../models/Team.js");
const Players = new mongoose.Schema({
  //_id: { type: mongoose.Schema.Types.String },
  //_id: { type: mongoose.Schema.Types.String, ref: "players" },
  _id: String,
  name: String,
  last_name: String,
  image_url: String,
  hometown: String,
  role: String,
  //current_team__id: String
  current_team__id: { type: mongoose.Schema.Types.String, ref: "teams" }
});

module.exports = mongoose.model("Players", Players);
