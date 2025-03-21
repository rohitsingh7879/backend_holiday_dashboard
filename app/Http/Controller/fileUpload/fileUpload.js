const customFunction = require("../../../util/customFunction");
const File = require("../../../Models/fileModel");
const fileUpload = async (req, res) => {
  try {
    const { type, title, description } = req.body;

    if (!type || !["AboutUs", "Gallery", "Other"].includes(type)) {
      return res.status(400).json({ message: "Invalid or missing 'type'" });
    }

    if (type === "AboutUs") {
      if (!title || !description) {
        return res.status(400).json({
          message: "'title' and 'description' are required for 'AboutUs' type",
        });
      }
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files.Images; 
    const fileUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const fileUrl = await customFunction.uploadImageOnAwsReturnUrl(file);

      if (fileUrl) {
        fileUrls.push(fileUrl);
      } else {
        return res
          .status(500)
          .json({ message: `Error uploading file: ${file.originalname}` });
      }
    }

    let uploadedFiles = [];
    const fileMetadataPromises = files.map(async (file, index) => {
      const fileData = {
        filename: file.originalname,
        url: fileUrls[index],
        s3Key: `uploads/${Date.now()}_${file.originalname}`,
        uploadDate: Date.now(),
      };

      uploadedFiles.push(fileData);
    });

    let resultData = {
      type,
      title: type === "AboutUs" ? title : null,
      description: type === "AboutUs" ? description : null,
      files: uploadedFiles,
    };
    await Promise.all(fileMetadataPromises);
    const savedFiles = new File(resultData);
    await savedFiles.save();

    return res.status(200).json({
      message: "Files uploaded and data saved successfully",
      success: true,
      data: savedFiles,
      status: 200,
    });
  } catch (error) {
    console.error("--- error --", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
      status: 500,
    });
  }
};


const getFilesAndContent = async (req, res) => {
  try {
    const { type } = req.query;
    const contentResult = await File.find({ type: type });
    if (contentResult) {
      return res.status(200).json({
        message: "Successfully fetched Data",
        success: true,
        data: contentResult,
      });
    } else {
      res.status(400).json({
        message: "Data not found",
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

module.exports = { fileUpload, getFilesAndContent };
