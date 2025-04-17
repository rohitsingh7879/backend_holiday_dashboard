const enquirySchema = require("../../../Models/enquiryModel");
const path = require("path");
const nodemailer = require("nodemailer");

const enquiry = {};

enquiry.enquirySave = async (req, res) => {
  try {
    const {
      cruise_package,
      date,
      nights,
      operator,
      ship,
      cruise_id,
      fname,
      lname,
      email,
      mobile_no,
      best_time_to_call,
      cabins_rating1,
      cabins_rating2,
      cabins_type,
      preferred_departure_airport,
      comments,
      hear_about_us,
      status,
    } = req.body;
    const enquiryObj = new enquirySchema({
      cruise_package: cruise_package,
      date: date,
      nights: nights,
      operator: operator,
      ship: ship,
      cruise_id: cruise_id,
      fname: fname,
      lname: lname,
      email: email,
      mobile_no: mobile_no,
      best_time_to_call: best_time_to_call,
      cabins_rating1: cabins_rating1,
      cabins_rating2: cabins_rating2,
      cabins_type: cabins_type,
      preferred_departure_airport: preferred_departure_airport,
      comments: comments,
      hear_about_us: hear_about_us,
      status: status,
    });

    const enquiryResult = await enquiryObj.save();

    if (!enquiryResult) {
      return res.status(400).json({
        message: "Error saving enquiry data",
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
        subject: "Thank You for Your Cruise Enquiry at Holiday2.com 🌊",
        html: `
           <div style="max-width: 650px; margin: auto; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; border-radius: 8px; overflow: hidden;">

           <div style="background-color: #ffffff; padding: 20px; text-align: center;">
                <img
                    src="https://yourdomain.com/logo.png"
                    alt="Holiday2.com Logo"
                    style="max-width: 180px;"
                />
            </div>
  
        <div style="padding: 20px;">
          <h1 style="color: #0a85ea;">🛳️ Cruise Enquiry Received</h1>
          <p style="font-size: 16px; line-height: 1.6;">
                <h2 style="color:rgb(5, 255, 39);">Hi ${fname || "there"},</h2>
            <br />
            Thank you for your interest in our cruise packages. Below is a summary
            of your enquiry:
          </p>
  
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
  
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 220px;">
                Cruise Package:
              </td>
              <td style="padding: 8px;">${cruise_package}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">Date:</td>
              <td style="padding: 8px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Nights:</td>
              <td style="padding: 8px;">${nights}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">Operator:</td>
              <td style="padding: 8px;">${operator}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Ship:</td>
              <td style="padding: 8px;">${ship}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">Cruise ID:</td>
              <td style="padding: 8px;">${cruise_id}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${fname} ${lname}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Mobile No:</td>
              <td style="padding: 8px;">${mobile_no}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">Best Time to Call:</td>
              <td style="padding: 8px;">${best_time_to_call}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">
                Cabin Rating (Primary):
              </td>
              <td style="padding: 8px;">${cabins_rating1}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">
                Cabin Rating (Secondary):
              </td>
              <td style="padding: 8px;">${cabins_rating2}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Cabin Type:</td>
              <td style="padding: 8px;">${cabins_type}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">
                Preferred Departure Airport:
              </td>
              <td style="padding: 8px;">${preferred_departure_airport}</td>
            </tr>
  
            <tr>
              <td style="padding: 8px; font-weight: bold;">Comments:</td>
              <td style="padding: 8px; white-space: pre-wrap;">${comments || "N/A"}</td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 8px; font-weight: bold;">Heard About Us:</td>
              <td style="padding: 8px;">${hear_about_us}</td>
            </tr>
          </table>
  
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />
  
          <p style="font-size: 15px;">
            While you wait, feel free to${" "}
            <a
              href="https://holiday2.com"
              target="_blank"
              style="color: #0a85ea; text-decoration: none;"
            >
              explore more exciting cruise packages
            </a>${" "}
            on our website.
          </p>
        </div>
  
        <div style="text-align: center; font-size: 12px; color: #777; padding: 16px 0; background-color: #ffffff;">
          © ${new Date().getFullYear()} Holiday2.com. All rights reserved.
        </div>
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
        to: process.env.EMAIL_FOR_CONTACT_AND_ENQUIRY,
        subject: `📥 New Cruise Enquiry Received – ${fname} ${lname}`,
        html: `
         <div style="max-width: 650px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        
            <div style="background-color: #f9f9f9; padding: 20px; text-align: center;">
                <img
                    src="cid:logoImage"
                    alt="Holiday2.com Logo"
                    style="max-width: 180px;"
                />
                </div>
        
                <div style="padding: 20px;">
                <h2 style="color: #0a85ea; margin-bottom: 10px;">
                    📥 New Cruise Enquiry Submission
                </h2>
                <p style="font-size: 16px;">
                    A new enquiry has been submitted. Here are the full details:
                </p>
        
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />
        
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                    <td style="padding: 8px; font-weight: bold; width: 220px;">
                        Cruise Package:
                    </td>
                    <td style="padding: 8px;">${cruise_package}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">Date:</td>
                    <td style="padding: 8px;">${date}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Nights:</td>
                    <td style="padding: 8px;">${nights}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">Operator:</td>
                    <td style="padding: 8px;">${operator}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Ship:</td>
                    <td style="padding: 8px;">${ship}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">Cruise ID:</td>
                    <td style="padding: 8px;">${cruise_id}</td>
                    </tr>
        
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Full Name:</td>
                    <td style="padding: 8px;">${fname} ${lname}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">Email:</td>
                    <td style="padding: 8px;">${email}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Mobile No:</td>
                    <td style="padding: 8px;">${mobile_no}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">Best Time to Call:</td>
                    <td style="padding: 8px;">${best_time_to_call}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Cabin Rating 1:</td>
                    <td style="padding: 8px;">${cabins_rating1}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">Cabin Rating 2:</td>
                    <td style="padding: 8px;">${cabins_rating2}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Cabin Type:</td>
                    <td style="padding: 8px;">${cabins_type}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">
                        Preferred Departure Airport:
                    </td>
                    <td style="padding: 8px;">${preferred_departure_airport}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Comments:</td>
                    <td style="padding: 8px; white-space: pre-wrap;">${comments || "N/A"}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px; font-weight: bold;">Heard About Us:</td>
                    <td style="padding: 8px;">${hear_about_us}</td>
                    </tr>
                </table>
        
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />
        
                </div>
        
                <div style="text-align: center; font-size: 12px; color: #777; padding: 16px 0; background-color: #f9f9f9;">
                © ${new Date().getFullYear()} Holiday2.com. All rights reserved.
                </div>

         </div> `,
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "../../../../uploads/logo.png"),
            cid: "logoImage",
          },
        ],
      });

      return res.status(200).json({
        message: "Enquiry saved and email sent successfully",
        success: true,
        data: enquiryResult,
        status: 200,
      });

    } catch (emailErr) {
      return res.status(200).json({
        message: "Enquiry saved, but email failed to send",
        success: false,
        data: enquiryResult,
        error: emailErr?.message,
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: "",
      error: error?.message,
      success: false,
      status: 500,
    });
  }
};

enquiry.enquiryGet = async (req, res) => {
  try {
    const enquiryResult = await enquirySchema.find();
    if (enquiryResult) {
      return res.status(200).json({
        message: "Successfully fetch enquiry Data",
        success: true,
        data: enquiryResult,
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
module.exports = enquiry;
