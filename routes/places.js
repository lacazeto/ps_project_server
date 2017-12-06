const express = require("express");
const router = express.Router();
const Place = require("../models/place");

/* GET max 5 places */
router.get("/", function(req, res, next) {
  Place.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json({data: data});
  }).limit(5);
});

module.exports = router;
