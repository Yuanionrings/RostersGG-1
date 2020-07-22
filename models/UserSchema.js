const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines mongoose schema for user documents
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    invitations: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Uses UserSchema for documents in collection: users
module.exports = mongoose.model("users", UserSchema);