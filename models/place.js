"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  owner: {
    type: String,
    required: [true, "owner is required"]
  },
  city: {
    type: String,
    required: [true, "city is required"]
  },
  address: String,
  description: {
    type: String,
    required: [true, "description is required"]
  },
  price: {
    type: Number,
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
  },
  requests: [{
    owner: String,
    start_Date: Date,
    end_Date: Date,
    status: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending"],
      default: "Pending"
    }
  }]
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
