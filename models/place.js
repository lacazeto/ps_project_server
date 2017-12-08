"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  owner: Schema.Types.ObjectId,
  description: {
    type: String,
    required: [true, "description is required"]
  },
  price: {
    type: String,
    required: [true, "price is required"]
  },
  type_accepted: {
    type: String,
    enum: ["Dog", "Cat", "Any"],
    Default: "Any",
    required: [true, "type is required"]
  },
  isEnabled: {
    type: Boolean,
    Default: true
  }
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
