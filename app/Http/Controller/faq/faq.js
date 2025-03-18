const FAQSchema = require("../../../Models/faqModel");
const FAQ = {};
const customFunction = require("../../../util/customFunction");

FAQ.FAQSave = async (req, res) => {
  try {
    let {
      have_a_ques,
      freq_ask_ques,
      meta_desc,
      still_need_help,
      description,
      FAQ_image,
      FAQ_head_desc,
    } = req.body;

    console.log(req.body);

    let FAQImageBase64 = null;

    // Handle image upload logic, check for file first
    if (FAQ_image) {
      FAQImageBase64 = FAQ_image;
    } else if (req.files && req.files["FAQ_image"]?.[0]) {
      FAQImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["FAQ_image"][0]
      );
    }

    // If FAQ_head_desc is a string, parse it
    if (typeof FAQ_head_desc === "string") {
      console.log("FAQ_head_desc before parsing:",typeof FAQ_head_desc); 
      try {
        FAQ_head_desc = JSON.parse(FAQ_head_desc);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid JSON format in FAQ_head_desc",
          error: error.message,
          success: false,
          status: 400,
        });
      }
    }

    const FAQObj = new FAQSchema({
      have_a_ques: have_a_ques,
      freq_ask_ques: freq_ask_ques,
      meta_desc: meta_desc,
      still_need_help: still_need_help,
      description: description,
      FAQ_image: FAQImageBase64,
      FAQ_head_desc: FAQ_head_desc,
    });

  
    const FAQResult = await FAQObj.save();

    if (FAQResult) {
      return res.status(200).json({
        message: "Successfully Added FAQ Data",
        success: true,
        data: FAQResult,
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Error in database",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error saving FAQ:", error);  // Added more error logging
    res.status(500).json({
      message: "Internal Server Error",
      data: error.message || error,  // Return specific error message
      success: false,
      status: 500,
    });
  }
};

module.exports = FAQ;


FAQ.FAQGet = async (req, res) => {
  try {
    const FAQResult = await FAQSchema.find();
    if (FAQResult) {
      return res.status(200).json({
        message: "Successfully fetch FAQ Data",
        success: true,
        data: FAQResult,
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

FAQ.updateFAQ = async (req, res) => {
    try {
      const { id } = req.params; 
      let {
        have_a_ques,
        freq_ask_ques,
        meta_desc,
        still_need_help,
        description,
        FAQ_head_desc,
      } = req.body; 
   
      let faq = await FAQSchema.findById(id);
  
      if (!faq) {
        return res.status(404).json({
          message: "FAQ not found",
          success: false,
          status: 404,
        });
      }
  
      if (have_a_ques) faq.have_a_ques = have_a_ques;
      if (freq_ask_ques) faq.freq_ask_ques = freq_ask_ques;
      if (meta_desc) faq.meta_desc = meta_desc;
      if (still_need_help) faq.still_need_help = still_need_help;
      if (description) faq.description = description;
  
      if (typeof FAQ_head_desc === "string") {
        try {
          FAQ_head_desc = JSON.parse(FAQ_head_desc);
        } catch (error) {
          console.error("Invalid JSON format for FAQ_head_desc:", error);
          return res.status(400).json({
            message: "Invalid FAQ_head_desc format.",
            success: false,
            status: 400,
          });
        }
      }
      
  
      if (FAQ_head_desc) faq.FAQ_head_desc = FAQ_head_desc;
  
      let FAQImageBase64 = faq.FAQ_image; 
      if (req.files && req.files["FAQ_image"]) {
        const uploadedImageUrl = await customFunction.uploadImageOnAwsReturnUrl(req.files["FAQ_image"][0]);
        FAQImageBase64 = uploadedImageUrl; 
      }
  
      faq.FAQ_image = FAQImageBase64; 
  
      const updatedFAQ = await faq.save();
  
      return res.status(200).json({
        message: "FAQ updated successfully",
        success: true,
        data: updatedFAQ,
        status: 200,
      });
      
    } catch (error) {
      console.error("Error updating FAQ:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        data: error.message || error,
        success: false,
        status: 500,
      });
    }
  };
  


FAQ.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;  
    const faq = await FAQSchema.findById(id);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
        success: false,
        status: 404,
      });
    }

    const newStatus = faq.status === "Active" ? "Inactive" : "Active";

    faq.status = newStatus;
    const updatedFAQ = await faq.save();  

    return res.status(200).json({
      message: `FAQ status updated to ${newStatus}`,
      success: true,
      data: '',
      status: 200,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: error.message || error,
      success: false,
      status: 500,
    });
  }
};


module.exports = FAQ;
