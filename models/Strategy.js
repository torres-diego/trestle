const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Feedback Schema
const StrategySchema = new Schema({
    strategyDate: {
        type: String,
        required: true
    },
    timeOfDay: {
        type: String,
        required: true
    },
    learningStrategy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    effectiveness: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('strategy', StrategySchema);