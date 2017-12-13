const express = require("express");
const router = express.Router();
const Place = require("../models/place");

router.get("/", function(req, res, next) {
  Place.find({}, (err, data) => {
    if (err) {
      return next(err);
    }
    return res.json(data);
  }).limit(5); /* GET max 5 places */
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

router.get("/user/:id", function(req, res, next) {
  const placeOwner = req.params.id;
  Place.find({owner: placeOwner}, (err, places) => {
    if (err) {
      return next(err);
    }
    return res.json(places);
  });
});

router.post("/", function(req, res, next) {
  const owner = req.body.owner;
  const description = req.body.description;
  const price = req.body.price;
  const city = req.body.city;
  const isEnabled = req.body.isEnabled;
  const typeAccepted = req.body.type;
  const newPlace = Place({
    owner: owner,
    description: description,
    price: price,
    city: city,
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

router.post("/search", function(req, res, next) {
  const price = req.body.price + 1;
  const city = req.body.city;
  const isEnabled = true;
  const typeAccepted = req.body.type_accepted;
  Place.find({$and: [{isEnabled: isEnabled}, {type_accepted: typeAccepted}, {city: city}, {price: {$lt: price}}]}, (err, places) => {
    if (err) {
      return next(err);
    }
    return res.json(places);
  });
});

router.put("/", function(req, res, next) {
  const placeID = req.body._id;
  const filter = {
    _id: placeID
  };
  const update = {
    isEnabled: false
  };
  Place.findOneAndUpdate(filter, update, (err, res) => {
    if (err) {
      return next(err);
    }
    if (!res) {
      return next(err);
    }
  });
  res.status(200).json({});
});

module.exports = router;
