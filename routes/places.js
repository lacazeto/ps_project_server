const express = require("express");
const router = express.Router();
const Place = require("../models/place");

/* GET places */
router.get("/", function(req, res, next) {
  Place.find({}, (err, data) => {
    if (err) {
      return next(err); // use return or "else{}", otherwise application will send error and skip to next line.
    }
    res.json({message: "Places found!", data: data});
  }).limit(5);
});

module.exports = router;
