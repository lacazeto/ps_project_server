const express = require("express");
const router = express.Router();
const Place = require("../models/place");

router.put("/", function(req, res, next) {
  const owner = req.body.owner;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const filter = {
    _id: req.body.placeId
  };
  const update = {
    $push: {
      requests: {
        owner: owner,
        start_Date: startDate,
        end_Date: endDate
      }
    }
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

router.delete("/cancel", function(req, res, next) {
  const owner = req.body._id;
  /* const filter = {
    $pull: {
      requests: {
        owner: owner
      }
    }
  };
  Place.deleteOne(filter, (err, res) => {
    if (err) {
      return next(err);
    }
    if (!res) {
      return res.status(404).json({});
    }
  }); */
  res.status(200).json({});
});

module.exports = router;
