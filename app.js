"use strict";

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

const configurePassport = require("./helpers/passport");

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
app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}));

// session setup
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    secret: "pets",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
);

// passport setup
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/places", places);
app.use("/users", users);
app.use("/auth", auth);

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
  if (!res.headersSent) {
    res.status(500).json({ message: "Unexpected error", err: err });
  }
});

module.exports = app;
