const mongoose = require("mongoose");
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
        default: "Basic RostersGG Event (no description given)"
    },
    when: {
        type: Date,
        required: true
    }
});

// Uses EventSchema for documents in collection: events
module.exports = mongoose.model("events", EventSchema);