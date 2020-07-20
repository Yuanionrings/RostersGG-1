const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RosterSchema = new Schema({
  teamname: {
    type: String,
    required: true,
    index: true
  },
  leader: {
    type: String,
    required: true,
    index: true
  },
  players: {
    type: [String]
  }
});

module.exports = mongoose.model("rosters", RosterSchema);