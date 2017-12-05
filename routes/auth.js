const express = require("express");
const router = express.Router();

// User model
const User = require("../models/user").User;

// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.post("/login", function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.status(401);
    res.json({errorMessage: "Indicate a username and a password to sign up"});
    return;
  }

  User.findOne({ "username": username }, (err, user) => {
    if (err || !user) {
      res.status(401);
      res.json({errorMessage: "The username or password are invalid!"});
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      // Save the login in the session!
      req.session.currentUser = user;
      res.status(200);
      res.json({response: "Logging in"});
    } else {
      res.status(401);
      res.json({errorMessage: "The username or password are invalid!"});
    }
  });
});

router.post("/signup", function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = User({
    username: username,
    password: hashPass,
    name: name
  });

  newUser.save((err) => {
    if (err) {
      next(err);
    }
    res.status(200);
    res.json({response: "User registered!"}); ;
  });
});

// -- LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200);
  res.json({response: "Logging Out"}); ;
});

module.exports = router;
