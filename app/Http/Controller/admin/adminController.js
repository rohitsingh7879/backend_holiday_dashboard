const Admin = require("../../../Models/adminModel");
const path = require("path");
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
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}?token=${resetToken}`;

    await transporter.sendMail({
      from: `"Holiday2.com" <${process.env.EMAIL_USER}>`,
      to: admin?.userName,
      subject: "Password Reset Request",
      html: `
     <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; color: #333; padding: 24px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:logoImage" alt="Holiday2.com Logo" style="max-width: 180px;" />
      </div>

      <h2 style="color: #0a85ea;">Password Reset Request</h2>

      <p style="font-size: 16px; line-height: 1.6;">
        Dear Admin,<br><br>
        We received a request to reset your password. You can reset it by clicking the button below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" target="_blank" style="background-color: #0a85ea; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
          Reset Your Password
        </a>
      </div>

      <p style="font-size: 15px; line-height: 1.6;">
        This link will expire in 1 hour for your security.
      </p>

      <p style="font-size: 15px; line-height: 1.6;">
        If you didn't request a password reset, you can safely ignore this email.
      </p>

      <p style="margin-top: 40px;">Best regards,<br /><strong>The Holiday2.com Team</strong></p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />

      <footer style="font-size: 12px; color: #777; text-align: center;">
        © ${new Date().getFullYear()} Holiday2.com. All rights reserved.
      </footer>
    </div>
  `,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../../../../uploads/logo.png"),
          cid: "logoImage",
        },
      ],
    });

    return res.status(200).json({
      message: "Password reset link sent",
      success: true,
      token: resetToken,
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
        status: 401,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.tokenVersion += 1;
    await admin.save();

    return res.status(200).json({
      message: "Password successfully updated",
      success: true,
      status: 200,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token has expired. Please request a new one.",
        success: false,
        status: 401,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token. Please request a new one.",
        success: false,
        status: 401,
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      status: 500,
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
