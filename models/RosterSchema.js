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
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  players: {
    type: [Schema.Types.ObjectId]
  }
});

module.exports = mongoose.model("rosters", RosterSchema);