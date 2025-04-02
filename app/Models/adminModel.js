const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"], 
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  tokenVersion:{
    type:Number,
    default:0
  }
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
