const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

// Load Feedback Model
require('../models/Strategy');
const Strategy = mongoose.model('strategy');

// Feedback Index Page
router.get('/', ensureAuthenticated, (req, res) => {
    Strategy.find({})
    .sort({date: 'desc'})
    .then(strategies => {
        res.render('strategy/index', {
            strategies: strategies
        });
    });
});

// Add Feedback Form Route
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('strategy/add');
});
router.get('/index', ensureAuthenticated, (req, res) => {
    res.render('strategy/index');
});



// Process Add Feedback Form
router.post('/', ensureAuthenticated, (req, res) => {
    // console.log(req.body);
    let errors = [];

    if(!req.body.strategyDate){
        errors.push({text: 'Please Select A Date'});
    }
    if(!req.body.timeOfDay){
        errors.push({text: 'Please Select A Time Of Day'});
    }
    if(!req.body.learningStrategy){
        errors.push({text: 'Please Select A Learning Strategy'});
    }
    if(!req.body.description){
        errors.push({text: 'Please Fill in A Description'});
    }
    if(!req.body.effectiveness){
        errors.push({text: 'Please Select An Effectiveness Option'});
    }

    // IF WE HAVE ERRORS
    if(errors.length > 0){
        res.render('strategy/add', {
            errors: errors,
            strategyDate: req.body.strategyDate,
            timeOfDay: req.body.timeOfDay,
            learningStrategy: req.body.learningStrategy,
            description: req.body.description,
            effectiveness: req.body.effectiveness
        });
    } else {
        // res.send('passed');
        const newUser = {
            strategyDate: req.body.strategyDate,
            timeOfDay: req.body.timeOfDay,
            learningStrategy: req.body.learningStrategy,
            description: req.body.description,
            effectiveness: req.body.effectiveness
        }
        new Strategy(newUser)
        .save()
        .then(strategy => {
            req.flash('success_msg', 'Strategy Posted Successfully');
            res.redirect('/strategy');
        });
    }
});

module.exports = router;