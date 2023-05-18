const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
  link: { type: String },
  Name: { type: String },
  Description: {
    type: String,
  },
});
module.exports = mongoose.model("Link", linkSchema);
