"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  firstName: {
    type: String,
    required: [true, "Name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"]
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
