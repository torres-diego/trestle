const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

// load Child model
require('../models/Child');
const Child = mongoose.model('child');


// Get child/index page
router.get('/index', ensureAuthenticated, (req, res) => {
    Child.find({})
    .then(children => {
        res.render('child/index', {
            children: children
        });
    });
});

// Get child/add page
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('child/add');
});

// Process Add Child Form
router.post('/', ensureAuthenticated, (req, res) => {
    let errors = [];

    if(!req.body.childName){
        errors.push({text: 'Please Fill In A Name'});
    }

    if(!req.body.grade){
        errors.push({text: 'Please Fill In A Grade'});
    }

    if(errors.length > 0){
        res.render('child/add', {
            errors: errors,
            childName: req.body.childName,
            grade: req.body.grade
        });
    } else {
        const newChild = {
            childName: req.body.childName,
            grade: req.body.grade
        }
        new Child(newChild)
        .save()
        .then(child => {
            req.flash('success_msg', 'Child Added Successfully');
            res.redirect('/child/index');
        });
    }
});

module.exports = router;