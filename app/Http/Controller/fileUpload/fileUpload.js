const customFunction = require("../../../util/customFunction");
const File = require("../../../Models/fileModel"); 
const fileUpload = async (req, res) => {
  try {
    const { type } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req?.files?.Images;
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

    const fileMetadataPromises = files?.map(async (file, index) => {
      const fileData = {
        type: type,
        filename: file.originalname,
        url: fileUrls[index], 
        s3Key: `uploads/${Date.now()}_${file.originalname}`,
      };

      const newFile = new File(fileData);
      await newFile.save();

      return newFile; 
    });

    const savedFiles = await Promise.all(fileMetadataPromises);

    return res.status(200).json({
      message: "Files uploaded and saved successfully",
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

module.exports = { fileUpload };
