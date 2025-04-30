const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    iconImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SocialMedia = mongoose.model("socialMedia", socialMediaSchema);

module.exports = SocialMedia;
