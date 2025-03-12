const categorySchema = require("../../../Models/categoryModel");
const customFunction = require("../../../util/customFunction");
const category_obj = {};

category_obj.categorySave = async (req,res)=>{
    try {
        const {categoryName,categoryImage} = req.body;
        let  categoryImageBase64 = null;
        if(categoryImage){
            categoryImageBase64 = categoryImage;
        }else if(req.files["categoryImage"]?.[0]){
            categoryImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
                req.files["categoryImage"]?.[0]
            );
        }
        const categoryObj = new categorySchema({
            categoryName : categoryName,
            categoryImage : categoryImageBase64
        })
    
        const categoryResult = await categoryObj.save();
        if(categoryResult){
            return res.status(200).json({ message: "Successfully Insert New Category Details", success: true, data: categoryResult,  status : 200 });
        }else{
            
            res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
        } 
      } catch (error) {
        console.log("--- error--",error)
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
    }
}

category_obj.categoryGet = async (req,res)=>{
    try {
        const categoryResult = await categorySchema.find();
        if(categoryResult){
            return res.status(200).json({ message: "Successfully fetch category Data", success: true, data: categoryResult });
        }else{
            res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
    }
}

category_obj.categoryUpdate = async(req,res)=>{
    try {
      const {id} = req.params;
      if(!id){
        res.status(400).json({ message: "Missing data", data: "" , success : false , status : 400 });
      }
      const getCategoryData = await categorySchema.find({ _id: id });
      if(!getCategoryData ||  getCategoryData.length === 0){
        res.status(400).json({ message: "Id not present", data: '' , success : false ,  status : 400 });
      }

      const {categoryName,categoryImage} = req.body;
      let  categoryImageBase64 = null;
        if(categoryImage){
            categoryImageBase64 = categoryImage;
        }else if(req.files["categoryImage"]?.[0]){
            categoryImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
                req.files["categoryImage"]?.[0]
            );
        }
        const updateData = {};
        if(categoryName && categoryName !== null && categoryName !== undefined && categoryName.trim() !== "" ) {
            updateData.categoryName = categoryName;
        }  
        if (categoryImageBase64){
            updateData.categoryImage = categoryImageBase64
        }
        const updateCategoryData = await categorySchema.updateOne({ _id: id }, { $set: updateData });
        if(updateCategoryData) {
            return res.status(200).json({ message: "Succesfully update Category data ", data: updateCategoryData , success : true , status : 200 });
        } else {
            res.status(400).json({ message: "Error in updating Data", data: "", success : false , status:400 });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500});
    }
}

category_obj.categoryDelete = async(req,res)=>{
    try {
      const {id} = req.params;
      if(!id){
        res.status(400).json({ message: "Missing data", data: "" , success : false , status : 400 });
      }
      const getCategoryData = await categorySchema.find({ _id: id });
      if(!getCategoryData ||  getCategoryData.length === 0){
        res.status(400).json({ message: "Id not present", data: '' , success : false ,  status : 400 });
      }

      const deleteCategoryData = await categorySchema.deleteOne({ _id: id });
    //   console.log("---updateBannerData-- ",updateBannerData);
      if(deleteCategoryData) {
        return res.status(200).json({ message: "Succesfully delete Category data ", data: deleteCategoryData , success : true , status : 200 });
      } else {
         res.status(400).json({ message: "Error in deleting Data", data: "", success : false , status:400 });
      }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500});
    }
}

module.exports = category_obj;