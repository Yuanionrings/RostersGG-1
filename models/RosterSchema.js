const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines mongoose schema for roster documents
const RosterSchema = new Schema({
    teamname: {
        type: String,
        required: true,
        text: true
    },
    game: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    team_desc: {
        type: String,
        required: true
    },
    leader: {
        type: String,
        required: true
    },
    players: {
        type: [String]
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

// Uses RosterSchema for documents in collection: rosters
module.exports = mongoose.model('rosters', RosterSchema);