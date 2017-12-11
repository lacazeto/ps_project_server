"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  owner: String,
  name: {
    type: String,
    required: [true, "name is required"]
  },
  type: {
    type: String,
    enum: ["Dog", "Cat"]
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
