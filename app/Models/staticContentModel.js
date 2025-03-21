const mongoose = require("mongoose");

const staticContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['AboutUs','ContactUs'], 
  },
  content: {
    type: String,
    required: true,
  },
});

const staticContentModel= mongoose.model('staticContent', staticContentSchema);

module.exports = { staticContentModel };
