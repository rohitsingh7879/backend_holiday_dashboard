const mongoose = require("mongoose");
const Category = mongoose.model("category");

const subcategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    unique: true,
    required: true,
  },
  subCategoryImage: {
    type: String,
    default: null,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
});

subcategorySchema.pre("save", async function (next) {
  try {
    const categoryExists = await Category.exists({ _id: this.category });

    if (!categoryExists) {
      return next(new Error("Category does not exist"));
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Subcategory = mongoose.model("subcategory", subcategorySchema);

module.exports = Subcategory;
