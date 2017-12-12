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

router.post("/", function(req, res, next) {
  const owner = req.body.owner;
  const description = req.body.description;
  const price = req.body.price;
  const isEnabled = req.body.isEnabled;
  const typeAccepted = req.body.type;
  const newPlace = Place({
    owner: owner,
    description: description,
    price: price,
    isEnabled: isEnabled,
    type_accepted: typeAccepted
  });
  newPlace.save((err) => {
    if (err) {
      next(err);
    }
    res.status(200).json({});
  });
});

module.exports = router;
