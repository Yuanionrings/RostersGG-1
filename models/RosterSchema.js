const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines mongoose schema for roster documents
const RosterSchema = new Schema({
    teamname: {
        type: String,
        required: true,
        index: true
    },
    team_desc: {
        type: String,
        required: true
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

// Uses RosterSchema for documents in collection: rosters
module.exports = mongoose.model("rosters", RosterSchema);