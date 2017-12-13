"use strict";

require("dotenv").config();

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
const pet = require("./routes/pet");
const request = require("./routes/requests");

// -- CONNECT TO DB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
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
  origin: [process.env.CLIENT_URL]
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
app.use("/place", places);
app.use("/profile", users);
app.use("/auth", auth);
app.use("/pet", pet);
app.use("/request", request);

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
    res.status(500).json({ message: "Unexpected error" });
  }
});

module.exports = app;
