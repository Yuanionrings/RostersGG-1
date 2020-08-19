const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines mongoose schema for roster documents
const RosterSchema = new Schema({
    teamname: {
        type: String,
        required: true
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

// Define compound text index
RosterSchema.index(
    { teamname: 'text', team_desc: 'text', game: 'text' },
    {name: 'Roster Text Search Index', weights: {teamname: 5, team_desc: 4, game: 1}}
);

// Uses RosterSchema for documents in collection: rosters
module.exports = mongoose.model('rosters', RosterSchema);