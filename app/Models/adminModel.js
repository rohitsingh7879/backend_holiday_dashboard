const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"], // Custom error message if the field is empty
    unique: true, // Ensure username is unique in the collection
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
