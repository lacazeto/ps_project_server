"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  owner: String,
  description: String,
  type_accepted: {
    type: String,
    enum: ["Dog", "Cat", "Any"],
    Default: "Any"
  },
  isEnabled: {
    type: Boolean,
    Default: true
  }
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
