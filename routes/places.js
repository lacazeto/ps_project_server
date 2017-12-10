const express = require("express");
const router = express.Router();
const Place = require("../models/place");

/* GET max 5 places */
router.get("/", function(req, res, next) {
  Place.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    return res.json(data);
  }).limit(5);
});

router.get("/:id", function(req, res, next) {
  const placeId = req.params.id;
  Place.findById(placeId, (err, place) => {
    if (err) {
      return next(err);
    }
    return res.json(place);
  });
});

router.post("/place", function(req, res, next) {
  const name = req.body.name;
  // todo
});

module.exports = router;
