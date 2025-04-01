const { staticContentModel } = require("../../../Models/staticContentModel");
const staticContent_obj = {};

staticContent_obj.staticContentSave = async (req, res) => {
  try {
    const { content, type, heading, description } = req.body;

    const isContentResult = await staticContentModel.findOne({ type: type });
    if (
      isContentResult &&
      type !== "CareerOportunity" &&
      type !== "PrivacyAndPolicy"
    ) {
      return res.status(400).json({
        message: "Already added you can update",
        success: true,
        data: isContentResult,
      });
    }

    const newStaticContent = new staticContentModel({

      content:
        type === "CareerOportunity" || type === "PrivacyAndPolicy"
          ? undefined
          : content,

      type: type,

      heading:
        type === "CareerOportunity" || type === "PrivacyAndPolicy"
          ? heading
          : undefined,

      description:
        type === "CareerOportunity" || type === "PrivacyAndPolicy"
          ? description
          : undefined,
    });

    const contentResult = await newStaticContent.save();

    if (contentResult) {
      return res.status(200).json({
        message: "Successfully added content.",
        success: true,
        data: contentResult,
        status: 200,
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
    console.log("--- error--", error);
    res.status(500).json({
      message: "Internal Server Error.",
      data: "",
      error: error?.message,
      success: false,
      status: 500,
    });
  }
};

staticContent_obj.staticContentUpdate = async (req, res) => {
  try {
    const { type, content, _id, heading, description } = req.body;
    //   if (!type || !['AboutUs', 'ContactUs'].includes(type)) {
    //     return res.status(400).json({
    //       message: "Invalid type parameter. Allowed values are 'AboutUs' or 'ContactUs'.",
    //       success: false,
    //       status: 400,
    //     });
    //   }

    if (
      !content &&
      type !== "CareerOportunity" &&
      type !== "PrivacyAndPolicy"
    ) {
      return res.status(400).json({
        message: "Content must be provided for update.",
        success: false,
        status: 400,
      });
    }

    let updatedContent;

    if (type === "CareerOportunity" || type === "PrivacyAndPolicy") {
      updatedContent = await staticContentModel.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          $set: {
            heading: heading,
            description: description,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      updatedContent = await staticContentModel.findOneAndUpdate(
        { type: type },
        { content: content },
        {
          new: true, // Return the updated document
          runValidators: true, // Ensure validation is run on the update
        }
      );
    }

    if (updatedContent) {
      return res.status(200).json({
        message: "Content successfully updated.",
        success: true,
        data: updatedContent,
      });
    } else {
      return res.status(404).json({
        message: "Content not found for the specified type.",
        success: false,
        status: 404,
        data: "",
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

staticContent_obj.staticContentGet = async (req, res) => {
  try {
    const { type } = req.query;

    let contentResult;
    if (type === "CareerOportunity" || type==='PrivacyAndPolicy') {
      contentResult = await staticContentModel.find({ type: type });
    } else {
      contentResult = await staticContentModel.findOne({ type: type });
    }

    if (contentResult) {
      return res.status(200).json({
        message: "Successfully fetch content Data",
        success: true,
        data: contentResult,
      });
    } else {
      res.status(400).json({
        message: "Content not found",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: "",
      errro: error?.message,
      success: false,
      status: 500,
    });
  }
};

module.exports = staticContent_obj;
