const SocialMedia = require("../../../Models/socialMediaModel");
const customFunction = require("../../../util/customFunction");
const socialMedia_obj = {};

socialMedia_obj.socialMediaSave = async (req, res) => {
  try {
    const { name, link, iconImg } = req.body;
    let socialMediaImageBase64 = null;
    if (iconImg) {
      socialMediaImageBase64 = iconImg;
    } else if (req.files["iconImg"]?.[0]) {
      socialMediaImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["iconImg"]?.[0]
      );
    }

    const socialMediaData = new SocialMedia({
      name: name,
      iconImg: socialMediaImageBase64,
      link: link,
    });

    const socialMediaResult = await socialMediaData.save();
    if (socialMediaResult) {
      return res.status(200).json({
        message: "Succesfully Added Social Media data",
        success: true,
        data: socialMediaResult,
        status: 200,
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
    console.log("--- error--", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message,
      data: "",
      success: false,
      status: 500,
    });
  }
};

socialMedia_obj.socialMediaGet = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      return res.status(400).json({
        message: "Page and limit must be positive integers.",
        success: false,
        data: "",
      });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const totalsocialMedia = await SocialMedia.countDocuments();

    const socialMediaResult = await SocialMedia
      .find()
      .skip(skip)
      .limit(limitNumber);


    if (socialMediaResult) {
      return res.status(200).json({
        message: "Successfully fetch socila media Data",
        success: true,
        data: socialMediaResult,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total: totalsocialMedia,
          totalPages: Math.ceil(totalsocialMedia / limitNumber),
        },
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
      error: error?.message,
      success: false,
      status: 500,
    });
  }
};


socialMedia_obj.socialMediaUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: "Missing data",
        data: "",
        success: false,
        status: 400,
      });
    }

    const getsocialMediaData = await SocialMedia.find({ _id: id });

    if (!getsocialMediaData || getsocialMediaData.length === 0) {
      res.status(400).json({
        message: "Data not found",
        data: "",
        success: false,
        status: 400,
      });
    }

    const { name,link,iconImg } = req.body;

    let socialMediaImageBase64 = null;

    if (iconImg) {
      socialMediaImageBase64 = iconImg;
    } else if (req.files["iconImg"]?.[0]) {
      socialMediaImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["iconImg"]?.[0]
      );
    }

    const updateData = {
      name: name,
      iconImg: socialMediaImageBase64,
      link: link,
    };

    const updatesocialMediaData = await SocialMedia.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatesocialMediaData) {
      return res.status(200).json({
        message: "Succesfully updated Social Media data",
        data: updatesocialMediaData,
        success: true,
        status: 200,
      });
    } else {
      res.status(400).json({
        message: "Error in updating Data",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message,
      data: "",
      success: false,
      status: 500,
    });
  }
};

socialMedia_obj.socialMediaDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "Missing data",
        data: "",
        success: false,
        status: 400,
      });
    }
    const getsocialMediaData = await SocialMedia.find({ _id: id });
    if (!getsocialMediaData || getsocialMediaData.length === 0) {
      res.status(400).json({
        message: "Data not found",
        data: "",
        success: false,
        status: 400,
      });
    }

    const deletesocialMediaData = await SocialMedia.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    //   console.log("---updateBannerData-- ",updateBannerData);
    if (deletesocialMediaData) {
      return res.status(200).json({
        message: "Succesfully delete Category data ",
        data: deletesocialMediaData,
        success: true,
        status: 200,
      });
    } else {
      res.status(400).json({
        message: "Error in deleting Data",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

module.exports = socialMedia_obj;
