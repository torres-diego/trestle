const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

// Load User Model
require("../models/User");
const User = mongoose.model("users");

// User Register Route
router.get("/register", (req, res) => {
  res.render("users/register");
});

// User Login Route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Login Form POST
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "../",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Register Form POST
router.post("/register", (req, res) => {
  let errors = [];

  if (req.body.password != req.body.confirmPassword) {
    errors.push({ text: "Passwords Do Not Match" });
  }

  if (req.body.password.length < 5) {
    errors.push({ text: "Password Must Be At Least Five Characters" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash("error_msg", "Email Already Registered");
        res.redirect("/users/register");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You Are Now Registered And Can Now Login"
                );
                res.redirect("/users/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

// Logout User
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You Have Logged Out');
    res.redirect('/users/login');
});

module.exports = router;
