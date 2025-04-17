const contactSchema = require("../../../Models/contactUsModel");
const nodemailer = require("nodemailer");
const path = require("path");

const contact_us = {};

contact_us.contactSave = async (req, res) => {
  try {
    const { fname, lname, email, phone, message } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is Required",
        data: "",
        success: false,
        status: 400,
      });
    }
    const contactObj = new contactSchema({
      fname: fname,
      lname: lname,
      email: email,
      phoneNumber: phone,
      message: message,
    });

    const contactResult = await contactObj.save();

    if (!contactResult) {
      return res.status(400).json({
        message: "Error saving contact data",
        success: false,
        data: "",
        status: 400,
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Holiday2.com" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for contacting Holiday2.com!",
        html: `
             <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; color: #333; padding: 24px;">
                  <div style="text-align: center; margin-bottom: 20px;">
                      <img src="cid:logoImage" alt="Holiday2.com Logo" style="max-width: 180px;" />
                  </div>
  
                  <h2 style="color: #0a85ea;">Hi ${fname || "there"},</h2>
  
                  <p style="font-size: 16px; line-height: 1.6;">
                      Thank you for contacting <strong>Holiday2.com</strong>! We’ve received your message and a member of our team will get back to you as soon as possible.
                  </p>
  
                  <div style="background-color: #f9f9f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
                      <h3 style="margin-bottom: 12px; color: #0a85ea;">📄 Message Summary</h3>
                      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                      <tr>
                          <td style="padding: 8px; font-weight: bold;">Full Name:</td>
                          <td style="padding: 8px;">${fname} ${lname}</td>
                      </tr>
                      <tr style="background-color: #f1f1f1;">
                          <td style="padding: 8px; font-weight: bold;">Email:</td>
                          <td style="padding: 8px;">${email}</td>
                      </tr>
                      <tr>
                          <td style="padding: 8px; font-weight: bold;">Phone:</td>
                          <td style="padding: 8px;">${phone || "N/A"}</td>
                      </tr>
                      <tr style="background-color: #f1f1f1;">
                          <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
                          <td style="padding: 8px; white-space: pre-wrap;">${message}</td>
                      </tr>
                      </table>
                  </div>
  
                  <p style="font-size: 15px; margin-top: 20px;">
                      In the meantime, feel free to <a href="https://holiday2.com" style="color: #0a85ea; text-decoration: none;">browse our latest travel offers</a> or check your inbox for updates.
                  </p>
  
                  <p style="margin-top: 40px;">Warm regards,<br /><strong>The Holiday2.com Team</strong></p>
  
                  <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />
  
                  <footer style="font-size: 12px; color: #777; text-align: center;">
                      © ${new Date().getFullYear()} Holiday2.com. All rights reserved.
                  </footer>
              </div>
          `,
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "../../../../uploads/logo.png"), // adjust path
            cid: "logoImage", // same as src in img tag
          },
        ],
      });

      await transporter.sendMail({
        from: `"Holiday2.com" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_FOR_CONTACT,
        subject: "New Contact Form Submission",
        html: `
          <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; color: #333; padding: 24px;">
              <div style="text-align: center; margin-bottom: 20px;">
                  <img
                  src="cid:logoImage"
                  alt="Holiday2.com Logo"
                  style="max-width: 180px;"
                  />
              </div>
  
              <div style="background-color: #f9f9f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
                  <h2 style="color: #0a85ea; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                  📥 New Contact Form Submission
                  </h2>
  
                  <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
                  <tr>
                      <td style="padding: 8px; font-weight: bold; width: 150px;">
                      Full Name:
                      </td>
                      <td style="padding: 8px;">
                      ${fname} ${lname}
                      </td>
                  </tr>
                  <tr style="background-color: #f1f1f1;">
                      <td style="padding: 8px; font-weight: bold;">Email:</td>
                      <td style="padding: 8px;">${email}</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; font-weight: bold;">Phone:</td>
                      <td style="padding: 8px;">${phone || "N/A"}</td>
                  </tr>
                  <tr style="background-color: #f1f1f1;">
                      <td style="padding: 8px; font-weight: bold;">Submitted At:</td>
                      <td style="padding: 8px;">${new Date().toLocaleString()}</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; font-weight: bold; vertical-align: top;">
                      Message:
                      </td>
                      <td style="padding: 8px; white-space: pre-wrap;">${message}</td>
                  </tr>
                  </table>
              </div>
  
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
        message: "Contact data saved and email sent successfully",
        success: true,
        data: contactResult,
        status: 200,
      });
    } catch (emailErr) {
      return res.status(200).json({
        message: "Contact saved, but email failed to send",
        success: false,
        data: contactResult,
        error: emailErr?.message,
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: "",
      error: error?.message,
      success: false,
      status: 500,
    });
  }
};

contact_us.contactGet = async (req, res) => {
  try {
    const contactResult = await contactSchema.find();
    if (contactResult) {
      return res.status(200).json({
        message: "Successfully fetch contact Us Data",
        success: true,
        data: contactResult,
      });
    } else {
      res.status(400).json({
        message: "Error in database",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

module.exports = contact_us;
