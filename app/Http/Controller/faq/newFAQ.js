const NewFAQSchema = require("../../../Models/newFAQModel");
const NewFAQ = {};
const customFunction = require("../../../util/customFunction");

NewFAQ.FAQSave = async (req, res) => {
  try {
    let { heading, description } = req.body;
    const FAQObj = new NewFAQSchema({
      heading: heading,
      description: description,
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
    console.error("Error saving FAQ:", error); // Added more error logging
    res.status(500).json({
      message: "Internal Server Error",
      data: error.message || error, // Return specific error message
      success: false,
      status: 500,
    });
  }
};

NewFAQ.FAQGet = async (req, res) => {
  try {
    const FAQResult = await NewFAQSchema.find();
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


NewFAQ.FAQGetSingle = async (req, res) => {
  try {
    let { id } = req.params;
    const FAQResult = await NewFAQSchema.findOne({ _id: id });

    if (!FAQResult) {
        return res.status(404).json({
          message: "FAQ not found",
          success: false,
          status: 404,
        });
      }
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

NewFAQ.FAQDelete = async (req, res) => {
  try {
    let { id } = req.params;
    const FAQResult = await NewFAQSchema.findByIdAndDelete({ _id: id });

    if (!FAQResult) {
        return res.status(404).json({
          message: "FAQ not found",
          success: false,
          status: 404,
        });
      }
    if (FAQResult) {
      return res.status(200).json({
        message: "Successfully deleted FAQ Data",
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

NewFAQ.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    let { heading, description } = req.body;

    let faq = await NewFAQSchema.findById(id);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
        success: false,
        status: 404,
      });
    }

    if (heading) faq.heading = heading;
    if (description) faq.description = description;

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

NewFAQ.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await NewFAQSchema.findById(id);

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
      data: updatedFAQ,
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

module.exports = NewFAQ;
