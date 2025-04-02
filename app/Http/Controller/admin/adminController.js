const Admin = require("../../../Models/adminModel");

const nodemailer = require("nodemailer");
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
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
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
  const { oldPassword, newPassword } = req.body;

  try {
    const userName = req.user.userName;
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

const forgotPassword = async (req, res) => {
  try {
    const { userName } = req.body;

    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ ...admin }, process.env.JWT_SECRET_RESET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME_RESET,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: admin?.userName,
      subject: "Password Reset Request",
      html: `
      <p>Dear Admin,</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetUrl}" target="_blank">Click here to reset your password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request a password reset, you can ignore this email.</p>
      <p>Best regards,<br>Holiday2.com</p>
  `,
    });

    res
      .status(200)
      .json({
        message: "Password reset link sent",
        success: true,
        status: 200,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
      success: false,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);
    // console.log('decoded---',decoded);
    const adminDetails = decoded?._doc;
    const userId = adminDetails?._id;

    const admin = await Admin.findById({ _id: userId });
    // console.log('admin---',admin)
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    if (admin?.tokenVersion !== adminDetails?.tokenVersion) {
      return res.status(401).json({
        message: "Token has been invalidated due to a password reset",
        success: false,
        status:401
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.tokenVersion += 1;
    await admin.save();

    return res
      .status(200)
      .json({ message: "Password successfully updated", success: true,status:200 });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token has expired. Please request a new one.",
        success: false,
        status:401
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token. Please request a new one.",
        success: false,
        status:401
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      status:500
    });
  }
};

module.exports = {
  login,
  register,
  updatePassword,
  forgotPassword,
  resetPassword,
};
