const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Feedback Schema
const ChildSchema = new Schema({
    childName: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
});

mongoose.model('child', ChildSchema);