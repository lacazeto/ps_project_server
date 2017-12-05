"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  owner: Schema.Types.ObjectId,
  host: Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    Default: "Pending"
  },
  start_Date: Date,
  end_Date: Date
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
