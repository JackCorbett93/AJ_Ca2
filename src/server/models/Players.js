const mongoose = require('mongoose');
const Team = require('../models/Team.js');
const PlayersSchema = mongoose.Schema({
  _id: String,
  name: String,
  image_url: String,
  hometown: String,
  role: String,
  //current_team__id: String
  current_team__id: { type: mongoose.Schema.Types.String, ref: 'teams' }
});

module.exports = mongoose.model('Players',PlayersSchema);
