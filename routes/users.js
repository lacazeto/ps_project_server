const express = require("express");
const router = express.Router();
const UserProfile = require("../models/user");
const Pet = require("../models/pet");

/* GET users listing. */
router.get("/:id", function(req, res, next) {
  const userId = req.params.id;
  UserProfile.findById(userId, (err, profile) => {
    if (err) {
      return next(err);
    }
    return res.json(profile);
  });
});

/* router.get("/:id/pet", function(req, res, next) {
  const userId = req.params.id;
  Pet.findById(userId, (err, profile) => {
    if (err) {
      return next(err);
    }
    return res.json(profile);
  });
}); */

module.exports = router;
