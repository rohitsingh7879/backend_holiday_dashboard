const Admin = require("../../../Models/adminModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ userName });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10); // Salt rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new Admin instance
    const newAdmin = new Admin({
      userName,
      password: hashedPassword,
    });

    // Save the new admin to the database
    const result = await newAdmin.save();

    // Send a response indicating successful registration
    if (result) {
      return res.status(201).json({
        message: "Admin registered successfully",
        success: true,
        data: {
          admin: {
            userName: newAdmin.userName,
            _id: newAdmin._id,
          },
        },
      });
    } else {
      return res.status(400).json({
        message: "Error in database.",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error updating content:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error?.message,
      success: false,
      status: 500,
      data: "",
    });
  }
};

// Login Controller Function
const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, userName: admin.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure this is true in production with HTTPS
      sameSite: "Strict", // Helps prevent CSRF attacks
      maxAge: 3600000, // 1 hour expiration
    });

    // res.cookie("token", token, {
    //   httpOnly: true, // Cookie is not accessible via JavaScript
    //   // secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    //   sameSite: "Strict", // Optional, helps prevent CSRF attacks
    //   maxAge: 3600000, // Cookie expires in 1 hour (in milliseconds)
    // });

    return res.status(200).json({
      message: "Login successful",
      status: 200,
      success: true,
      data: {
        token: token,
        admin: {
          userName: admin.userName,
          _id: admin._id,
        },
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

const updatePassword = async (req, res) => {
  const { userName, oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ userName });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedPassword;
    await admin.save();

    return res.status(200).json({
      message: "Password updated successfully",

      success: true,
      data: {
        admin: {
          userName: admin.userName,
          _id: admin._id,
        },
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = { login, register, updatePassword };
