const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Feedback Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

mongoose.model('users', UserSchema);