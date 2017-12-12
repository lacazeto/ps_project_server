const express = require("express");
const router = express.Router();
const Request = require("../models/request");

router.post("/", function(req, res, next) {
  /*  const owner = req.body.owner;
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
    }); */
});

module.exports = router;
