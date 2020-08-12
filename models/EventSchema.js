const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines mongoose schema for event documents
const EventSchema = new Schema({
    name: {
        type: String,
        required: true,
        text: true
    },
    description: {
        type: String,
        default: 'Team Event'
    },
    when: {
        type: Date,
        required: true
    },
    team_names: {
        type: [String],
        required: true
    },
    team_ids: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

// Uses EventSchema for documents in collection: events
module.exports = mongoose.model('events', EventSchema);