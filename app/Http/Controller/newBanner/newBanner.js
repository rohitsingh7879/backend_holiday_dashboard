const bannerSchema = require("../../../Models/newBannerModel");
const customFunction = require("../../../util/customFunction");
const banner_obj = {};
banner_obj.newBannerSave = async (req,res)=>{
  try {
    const {bannerHeading, bannerDescription,bannerStatus, bannerImage} = req.body;
    let  bannerImageBase64 = null;
    if(bannerImage){
        bannerImageBase64 = bannerImage;
    }else if(req.files["bannerImage"]?.[0]){
        bannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
            req.files["bannerImage"]?.[0]
        );
    }
    const bannerObj = new bannerSchema({
        bannerHeading : bannerHeading,
        bannerDescription : bannerDescription,
        bannerStatus : bannerStatus,
        bannerImage : bannerImageBase64
    })

    const bannerResult = await bannerObj.save();
    if(bannerResult){
        return res.status(200).json({ message: "Successfully Insert New Banner Details", success: true, data: bannerResult,  status : 200 });
    }else{
        
        res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
    } 
  } catch (error) {
    console.log("--- error--",error)
    res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
  }
}

banner_obj.newBannerGet = async (req,res)=>{
    // console.log("-- hello--");
    try {
        const bannerResult = await bannerSchema.find();
        // console.log("-- banner--",bannerResult)
        if(bannerResult){
            return res.status(200).json({ message: "Successfully fetch anner Data", success: true, data: bannerResult });
        }else{
            res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
    }
}

banner_obj.newBannerUpdate = async(req,res)=>{
    try {
      const {id} = req.params;
      if(!id){
        res.status(400).json({ message: "Missing data", data: "" , success : false , status : 400 });
      }
      const getBannerData = await bannerSchema.find({ _id: id });
      if(!getBannerData ||  getBannerData.length === 0){
        res.status(400).json({ message: "Id not present", data: '' , success : false ,  status : 400 });
      }

      const {bannerHeading, bannerDescription,bannerStatus, bannerImage} = req.body;
      let  bannerImageBase64 = null;
      if(bannerImage){
            bannerImageBase64 = bannerImage;
      }else if(req.files["bannerImage"]?.[0]){
            bannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
                req.files["bannerImage"]?.[0]
            );
      }
      const updateData = {};
      if(bannerHeading && bannerHeading !== null && bannerHeading !== undefined && bannerHeading.trim() !== "" ) {
        // console.log("--- bannerHeding--",bannerHeading);
        updateData.bannerHeading = bannerHeading;
      }  

      if(bannerDescription && bannerDescription !== null && bannerDescription !== undefined && bannerDescription.trim() !== "") {
        updateData.bannerDescription = bannerDescription;
      } 

      if (bannerStatus) {
        updateData.bannerStatus = bannerStatus;
      }
      if (bannerImageBase64){
        updateData.bannerImage = bannerImageBase64
      }
    //   console.log("---bannerImageBase64-- ",updateData.bannerImage);
      // Perform the update
      const updateBannerData = await bannerSchema.updateOne({ _id: id }, { $set: updateData });
    //   console.log("---updateBannerData-- ",updateBannerData);
      if(updateBannerData) {
        return res.status(200).json({ message: "Succesfully update Banner data ", data: updateBannerData , success : true , status : 200 });
      } else {
         res.status(400).json({ message: "Error in updating Data", data: "", success : false , status:400 });
      }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500});
    }
}

banner_obj.newBannerDelete = async(req,res)=>{
    try {
      const {id} = req.params;
      if(!id){
        res.status(400).json({ message: "Missing data", data: "" , success : false , status : 400 });
      }
      const getBannerData = await bannerSchema.find({ _id: id });
      if(!getBannerData ||  getBannerData.length === 0){
        res.status(400).json({ message: "Id not present", data: '' , success : false ,  status : 400 });
      }

      const deleteBannerData = await bannerSchema.deleteOne({ _id: id });
    //   console.log("---updateBannerData-- ",updateBannerData);
      if(deleteBannerData) {
        return res.status(200).json({ message: "Succesfully delete Banner data ", data: deleteBannerData , success : true , status : 200 });
      } else {
         res.status(400).json({ message: "Error in deleting Data", data: "", success : false , status:400 });
      }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500});
    }
}

module.exports = banner_obj;