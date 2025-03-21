const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["AboutUs", "Gallery", "Other"],
  },
  title: {
    type: String,
    required: function () {
      return this.type === "AboutUs";
    },
  },
  description: {
    type: String,
    required: function () {
      return this.type === "AboutUs";
    },
  },
  files: [
    {
      filename: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      s3Key: {
        type: String,
        required: true,
      },
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
