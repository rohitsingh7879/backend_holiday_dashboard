const categorySchema = require("../../../Models/categoryModel");
const customFunction = require("../../../util/customFunction");
const category_obj = {};

category_obj.categorySave = async (req, res) => {
  try {
    const { categoryName, categoryImage, categoryType } = req.body;
    let categoryImageBase64 = null;
    if (categoryImage) {
      categoryImageBase64 = categoryImage;
    } else if (req.files["categoryImage"]?.[0]) {
      categoryImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["categoryImage"]?.[0]
      );
    }

    const categoryObj = new categorySchema({
      categoryName: categoryName,
      categoryImage: categoryImageBase64,
      categoryType: categoryType,
    });

    const categoryResult = await categoryObj.save();
    if (categoryResult) {
      return res.status(200).json({
        message:
          categoryType === "Footer"
            ? "Succesfully Added Footer data "
            : "Succesfully Added Category data",
        success: true,
        data: categoryResult,
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
      data: "",
      success: false,
      status: 500,
    });
  }
};

category_obj.categoryGet = async (req, res) => {
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

    const totalCategory = await categorySchema.countDocuments();

    const categoryResult = await categorySchema
      .find()
      .skip(skip)
      .limit(limitNumber);

    if (categoryResult) {
      return res.status(200).json({
        message: "Successfully fetch category Data",
        success: true,
        data: categoryResult,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total: totalCategory,
          totalPages: Math.ceil(totalCategory / limitNumber),
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
      success: false,
      status: 500,
    });
  }
};

category_obj.categoryUpdate = async (req, res) => {
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
    const getCategoryData = await categorySchema.find({ _id: id });
    if (!getCategoryData || getCategoryData.length === 0) {
      res.status(400).json({
        message: "Id not present",
        data: "",
        success: false,
        status: 400,
      });
    }

    const { categoryName, categoryImage, categoryType } = req.body;
    let categoryImageBase64 = null;
    if (categoryImage) {
      categoryImageBase64 = categoryImage;
    } else if (req.files["categoryImage"]?.[0]) {
      categoryImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["categoryImage"]?.[0]
      );
    }
    const updateData = {};
    if (
      categoryName &&
      categoryName !== null &&
      categoryName !== undefined &&
      categoryName.trim() !== ""
    ) {
      updateData.categoryName = categoryName;
    } else {
      res.status(400).json({
        message: "Category Name is Required",
        data: "",
        success: false,
        status: 400,
      });
    }
    if (categoryImageBase64) {
      updateData.categoryImage = categoryImageBase64;
    } else {
      res.status(400).json({
        message: "Category Image is Missing",
        data: "",
        success: false,
        status: 400,
      });
    }
    if (!categoryType) {
      res.status(400).json({
        message: "Category Type is Required",
        data: "",
        success: false,
        status: 400,
      });
    } else {
      updateData.categoryType = categoryType;
    }
    const updateCategoryData = await categorySchema.updateOne(
      { _id: id },
      { $set: updateData }
    );
    if (updateCategoryData) {
      return res.status(200).json({
        message:
          categoryType === "Footer"
            ? "Succesfully updated Footer data "
            : "Succesfully updated Category data",
        data: updateCategoryData,
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
      data: "",
      success: false,
      status: 500,
    });
  }
};

category_obj.categoryDelete = async (req, res) => {
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
    const getCategoryData = await categorySchema.find({ _id: id });
    if (!getCategoryData || getCategoryData.length === 0) {
      res.status(400).json({
        message: "Id not present",
        data: "",
        success: false,
        status: 400,
      });
    }

    const deleteCategoryData = await categorySchema.deleteOne({ _id: id });
    //   console.log("---updateBannerData-- ",updateBannerData);
    if (deleteCategoryData) {
      return res.status(200).json({
        message: "Succesfully delete Category data ",
        data: deleteCategoryData,
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

category_obj.categoryShowOnHome = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isShowOnHomePage } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Missing category ID",
        data: "",
        success: false,
        status: 400,
      });
    }

    const category = await categorySchema.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        data: "",
        success: false,
        status: 404,
      });
    }

    if (typeof status !== "undefined") {
      category.status = status; 
    }

    if (typeof isShowOnHomePage !== "undefined") {
      category.isShowOnHomePage = isShowOnHomePage;
    }

    const updatedCategory = await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};



module.exports = category_obj;
