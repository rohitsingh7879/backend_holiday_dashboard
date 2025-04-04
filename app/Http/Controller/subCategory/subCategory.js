const subCategorySchema = require("../../../Models/subCategorySchema");
const customFunction = require("../../../util/customFunction");
const subCategory_obj = {};

subCategory_obj.subCategorySave = async (req, res) => {
  try {
    const { subCategoryName, subCategoryImage, category } = req.body;
    let subCategoryImageBase64 = null;
    if (subCategoryImage) {
      subCategoryImageBase64 = subCategoryImage;
    } else if (req.files["subCategoryImage"]?.[0]) {
      subCategoryImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["subCategoryImage"]?.[0]
      );
    }

    const subCategoryData = new subCategorySchema({
      subCategoryName: subCategoryName,
      subCategoryImage: subCategoryImageBase64,
      category: category,
    });

    const subCategoryResult = await subCategoryData.save();
    if (subCategoryResult) {
      return res.status(200).json({
        message: "Succesfully Added Sub Category data",
        success: true,
        data: subCategoryResult,
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

subCategory_obj.subCategoryGet = async (req, res) => {
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

    const totalSubCategory = await subCategorySchema.countDocuments();

    const subCategoryResult = await subCategorySchema
      .find()
      .populate("category", "categoryName")
      .skip(skip)
      .limit(limitNumber);

    const formattedSubcategories = subCategoryResult.map((subcategory) => ({
      ...subcategory.toObject(),
      categoryId: subcategory?.category?._id,
      categoryName: subcategory?.category?.categoryName,
      category: undefined,
    }));

    if (formattedSubcategories) {
      return res.status(200).json({
        message: "Successfully fetch sub category Data",
        success: true,
        data: formattedSubcategories,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total: totalSubCategory,
          totalPages: Math.ceil(totalSubCategory / limitNumber),
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

subCategory_obj.subCategoryGetByCatId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        message: "Category ID is required.",
        success: false,
        data: "",
      });
    }

    const subCategoryResult = await subCategorySchema
      .find({ category: categoryId })
      .populate("category", "categoryName");

    if (subCategoryResult && subCategoryResult.length > 0) {
      const formattedSubcategories = subCategoryResult.map((subcategory) => ({
        ...subcategory.toObject(),
        categoryId: subcategory?.category?._id,
        categoryName: subcategory?.category?.categoryName,
        category: undefined,
      }));

      return res.status(200).json({
        message: "Successfully fetched subcategory data",
        success: true,
        status: 200,
        data: formattedSubcategories,
      });
    } else {
      return res.status(404).json({
        message: "No subcategories found for the provided category.",
        success: false,
        status: 404,
        data: "",
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

subCategory_obj.subCategoryUpdate = async (req, res) => {
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

    const getSubCategoryData = await subCategorySchema.find({ _id: id });

    if (!getSubCategoryData || getSubCategoryData.length === 0) {
      res.status(400).json({
        message: "Data not found",
        data: "",
        success: false,
        status: 400,
      });
    }

    const { subCategoryName, subCategoryImage, category } = req.body;

    let subCategoryImageBase64 = null;

    if (subCategoryImage) {
      subCategoryImageBase64 = subCategoryImage;
    } else if (req.files["subCategoryImage"]?.[0]) {
      subCategoryImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["subCategoryImage"]?.[0]
      );
    }

    const updateData = {
      subCategoryName: subCategoryName,
      subCategoryImage: subCategoryImageBase64,
      category: category,
    };

    const updateSubCategoryData = await subCategorySchema.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (updateSubCategoryData) {
      return res.status(200).json({
        message: "Succesfully updated Sub Category data",
        data: updateSubCategoryData,
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

subCategory_obj.subCategoryDelete = async (req, res) => {
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
    const getSubCategoryData = await subCategorySchema.find({ _id: id });
    if (!getSubCategoryData || getSubCategoryData.length === 0) {
      res.status(400).json({
        message: "Data not found",
        data: "",
        success: false,
        status: 400,
      });
    }

    const deleteSubCategoryData = await subCategorySchema.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    //   console.log("---updateBannerData-- ",updateBannerData);
    if (deleteSubCategoryData) {
      return res.status(200).json({
        message: "Succesfully delete Category data ",
        data: deleteSubCategoryData,
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

module.exports = subCategory_obj;
