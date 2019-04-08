
const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
  _id: String,
  name: String,
  image_url: String,
  player_number: Number
});

module.exports = mongoose.model('Team', TeamSchema);
