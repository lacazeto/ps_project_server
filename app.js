"use strict";

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// -- REQUIRE ROUTES
const auth = require("./routes/auth");
const users = require("./routes/users");
const places = require("./routes/places");

// -- CONNECT TO DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/pet-surfing", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// -- SETUP APP
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/places", places);
app.use("/users", users);
app.use("/auth", auth);

// -- MIDDLEWARES -- //

// -- SESSION SETUP
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    secret: "pets-surfing",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
);

// -- PASSPORT SETUP
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


// -- LocalStrategy
passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));

// configurePassport()
app.use(passport.initialize());
app.use(passport.session());

// -- ERROR HANDLER AND 404

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404);
  res.json({ error: "not found" });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error("ERROR", req.method, req.path, err);
  // render the error page
  if (!res.headersSent) { res.status(500); }
  res.json({ error: "unexpected", err: err });
});

module.exports = app;
