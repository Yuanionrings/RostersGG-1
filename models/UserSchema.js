const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines mongoose schema for user documents
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        text: true
    },
    username: {
        type: String,
        lowercase: true,
        match: /^[A-Za-z0-9-_]+$/,
        required: true,
        text: true
    },
    biography: {
        type: String,
        default: 'I have not yet changed my biography, this is the default!'
    },
    email: {
        type: String,
        lowercase: true,
        required: true
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
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

// Uses UserSchema for documents in collection: users
module.exports = mongoose.model('users', UserSchema);