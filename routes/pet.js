const express = require("express");
const router = express.Router();
const Pet = require("../models/pet");

router.post("/", function(req, res, next) {
  const owner = req.body.owner;
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

router.delete("/:id", function(req, res, next) {
  const petId = req.params.id;
  Pet.deleteOne({_id: petId}, (err, profile) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({});
  });
});

router.get("/:id", function(req, res, next) {
  const petsOwner = req.params.id;
  Pet.find({owner: petsOwner}, (err, pets) => {
    if (err) {
      return next(err);
    }
    return res.json(pets);
  });
});

module.exports = router;
