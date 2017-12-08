"use strict";

const passport = require("passport");
const express = require("express");
const router = express.Router();

// User model
const User = require("../models/user");

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// -- LOGIN
router.post("/login", function(req, res, next) {
  if (req.user) {
    return res.status(403).json({ message: "Forbidden" });
  }
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      next(err);
    }
    if (!theUser) {
      return res.status(404).json({ message: "The username or password are invalid!" });
    }

    req.login(theUser, (err) => {
      if (err) {
        next(err);
      }

      // We are now logged in (notice req.user)
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

// -- SIGNUP
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({});
  }

  User.findOne({ username: username }, "_id", (err, foundUser) => {
    if (err) {
      next(err);
    }
    if (foundUser) {
      return res.status(400).json({ message: "This username already exists" });
    }

    const newUser = User({
      username: username,
      password: hashPass,
      firstName: firstName,
      lastName: lastName
    });

    newUser.save((err) => {
      if (err) {
        next(err);
      }
      res.status(200).json({}); ;
    });
  });
});

// -- CHECK FOR SESSION
router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }

  return res.status(404).json({ message: "Unauthorized" });
});

// -- LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).res.json({});
});

module.exports = router;
