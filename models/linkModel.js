const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, "Please post a valink streaming link"],
  },
  Name: {
    type: String,
    required: [true, "The radio channel must have a name"],
  },
  Description: {
    type: String,
  },
});
module.exports = mongoose.model("Link", linkSchema);
