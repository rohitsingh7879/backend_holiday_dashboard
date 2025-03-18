const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  have_a_ques: {
    type: String,
    required: true,
  },
  freq_ask_ques: {
    type: String,
    required: true,
  },
  meta_desc: {
    type: String,
    required: true,
  },
  still_need_help: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  FAQ_image: {
    type: String,
    required: true,
  },
  FAQ_head_desc: [
    {
      heading: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    default: "Active",
  },
});

const FAQ = mongoose.model("FAQ", FAQSchema);

module.exports = FAQ;
