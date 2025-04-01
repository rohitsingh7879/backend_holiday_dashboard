const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Active",
  },
});

const NewFAQ = mongoose.model("NewFAQ", FAQSchema);

module.exports = NewFAQ;
