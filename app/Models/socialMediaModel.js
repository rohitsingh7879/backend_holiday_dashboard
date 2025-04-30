const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
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
