const express = require("express");
const router = express.Router();
const Pet = require("../models/pet");

router.post("/", function(req, res, next) {
  const owner = req.params.id;
  const name = req.body.name;
  const type = req.body.type;
  const newPet = Pet({
    owner: owner,
    name: name,
    type: type
  });
  newPet.save((err) => {
    if (err) {
      next(err);
    }
    res.status(200).json({});
  });
});

router.delete("/", function(req, res, next) {
  const petId = req.body.id;
  Pet.deleteOne(petId, (err, profile) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({});
  });
});

module.exports = router;
