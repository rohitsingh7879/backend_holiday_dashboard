const formSchemaModel = require("../../../Models/newPackagesModel")
const  customFunction  = require("../../../util/customFunction")
const moment = require('moment')
const newPackages_obj ={};


newPackages_obj.newpackageSave = async(req,res)=>{
  try {
    let {
      name,
      reference,
      operator,
      ship,
      region,
      cruise_nights,
      general_type,
      general_Start,
      general_end,
      general_categories,
      general_range,
      summary,
      sales_message,
      text_banner,
      overview,
      whats_included,
      extras,
      package_cruise_value1,
      package_cruise_value2,
      package_cruise_value3,
      package_cruise_value4,
      package_cruise_value5,
      package_cruise_value6,
      package_cruise_value_pp_inside,
      package_cruise_value_solo_inside,
      fare_sets,
      itinerary,
      adjustment_type,
      adjustment_amount,
      restrict_start_date,
      restrict_end_date,
      options_name,
      options_amount,
      options_select,
      tour_title,
      tour_list,
      cruise_image,
      mobile_cruise_banner_image,
      teaser,
      introduction ,
      unique_feature,
      gratuities ,
      video_url,
      accommodation,
      dining,
      enrichment,
      entertainment,
      health_and_fitness,
      kids_and_teens,
      accomodation_types,
      deckplans,
      dining_options,
      enrichment_types ,
      entertainment_types ,
      health_fitness_types,
      useful_types,
      cruises,
      holidays,
      sales_banner_image,
      cruise_banner_image
    } = req.body;

    if (general_Start) {
      general_Start = moment(new Date(general_Start)).unix(); 
    }

    if(general_end){
      general_end = moment(new Date(general_end)).unix(); 
    }
    if(fare_sets){
      fare_sets = JSON.parse(fare_sets)
    }else{
      fare_sets = []
    }

    if(accommodation){
      accommodation = JSON.parse(accommodation);
    }else{
      accommodation = {}
    }

    if(dining){
      dining = JSON.parse(dining);
    }else{
      dining = {}
    }

    if(enrichment){
      enrichment = JSON.parse(enrichment);
    }else{
      enrichment = {}
    }
    if(entertainment){
      entertainment = JSON.parse(entertainment);
    }else{
      entertainment = {}
    }

    if(health_and_fitness){
      health_and_fitness = JSON.parse(health_and_fitness);
    }else{
      health_and_fitness = {}
    }
    if(kids_and_teens){
      kids_and_teens = JSON.parse(kids_and_teens);
    }else{
      kids_and_teens = {}
    }
    if(accomodation_types){
      accomodation_types = JSON.parse(accomodation_types);
    }else{
      accomodation_types = []
    }

    if(deckplans){
      deckplans = JSON.parse(deckplans);
    }else{
      deckplans = []
    }

    if(dining_options){
      dining_options = JSON.parse(dining_options);
    }else{
      dining_options = []
    }


    if(enrichment_types){
      enrichment_types = JSON.parse(enrichment_types);
    }else{
      enrichment_types = []
    }

    if(entertainment_types){
      entertainment_types = JSON.parse(entertainment_types);
    }else{
      entertainment_types = []
    }

    if(health_fitness_types){
      health_fitness_types = JSON.parse(health_fitness_types);
    }else{
      health_fitness_types = []
    }

    if(useful_types){
      useful_types = JSON.parse(useful_types);
    }else{
      useful_types = []
    }

    if(cruises){
      cruises = JSON.parse(cruises);
    }else{
      cruises = []
    }
  
    if(holidays){
      holidays = JSON.parse(holidays);
    }else{
      holidays = []
    }
    if(itinerary){
      itinerary = JSON.parse(itinerary)
      if (Array.isArray(itinerary)) {
        itinerary = itinerary.map(item => ({
            ...item,
            check_in_date: item.check_in_date ? moment(item.check_in_date).unix() : null,
            check_out_date: item.check_out_date ? moment(item.check_out_date).unix() : null
        }));
      } else {
          itinerary = [];
      }
    }else{
      itinerary = []
    }
    // console.log("--- itinerary---",itinerary);
     // Constructing fareSets array
    let  cruiseImageBase64 = null;
    if(cruise_image){
      cruiseImageBase64 = cruise_image;
    }else if(req.files["cruise_image"]?.[0]){
      cruiseImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_image"]?.[0]
      );
    }

    let  salesBannerImageBase64 = null;
    if(sales_banner_image){
      salesBannerImageBase64 = sales_banner_image;
    }else if(req.files["sales_banner_image"]?.[0]){
      salesBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["sales_banner_image"]?.[0]
      );
    }

    let  cruiseBannerImageBase64 = null;
    if(cruise_banner_image){
      cruiseBannerImageBase64 = cruise_banner_image;
    }else if(req.files["cruise_banner_image"]?.[0]){
      cruiseBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_banner_image"]?.[0]
      );
    }

    let  mobileCruiseBannerImageBase64 = null;
    if(mobile_cruise_banner_image){
      mobileCruiseBannerImageBase64 = mobile_cruise_banner_image;
    }else if(req.files["mobile_cruise_banner_image"]?.[0]){
      mobileCruiseBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["mobile_cruise_banner_image"]?.[0]
      );
    }

    // if(tour_list){
    //  tour_list = JSON.parse(tour_list)
    //  const tourListWithImages = tour_list.map((tourItem, index) => {
    //   return {
    //     name: tourItem.name,
    //     icon: req.files['tour_list[]']?.[index]
    //       ? convertFileToBase64(req.files['tour_list[]']?.[index])
    //       : null,
          
    //   };
    // });
    // tour_list = tourListWithImages;
    // }else{
    //   tour_list = []
    // }
    if (tour_list) {
      tour_list = JSON.parse(tour_list);
      if (Array.isArray(tour_list) && tour_list.length > 0) {
        const updatedTourList = [];
        for (const [index, tourItem] of tour_list.entries()) {
          const icon = req.files['tour_list[]']?.[index]
            ? await customFunction.uploadImageOnAwsReturnUrl(req.files['tour_list[]'][index])
            : null;
          updatedTourList.push({
            name: tourItem?.name || "", 
            icon: icon,
          });
        }
  
        tour_list = updatedTourList;
      } else {
        tour_list = []; 
      }
    } else {
      tour_list = [];
    }
    const formData = new formSchemaModel({
      name: name,
      reference: reference,
      operator: operator,
      ship: ship,
      region: region,
      cruise_nights : cruise_nights,
      general_type: general_type,
      general_Start: general_Start,
      general_end: general_end,
      general_categories: general_categories,
      general_range: general_range,
      cruise_image: cruiseImageBase64,
      sales_banner_image: salesBannerImageBase64,
      cruise_banner_image: cruiseBannerImageBase64,
      mobile_cruise_banner_image: mobileCruiseBannerImageBase64,
      summary  : summary,
      sales_message : sales_message,
      text_banner : text_banner,
      overview : overview,
      whats_included : whats_included,
      extras : extras,
      package_cruise_value1: package_cruise_value1,
      package_cruise_value2: package_cruise_value2,
      package_cruise_value3: package_cruise_value3,
      package_cruise_value4: package_cruise_value4,
      package_cruise_value5: package_cruise_value5,
      package_cruise_value6: package_cruise_value6,
      package_cruise_value_pp_inside : package_cruise_value_pp_inside,
      package_cruise_value_solo_inside : package_cruise_value_solo_inside,
      fare_sets: fare_sets,
      adjustment_type : adjustment_type,
      adjustment_amount : adjustment_amount,
      restrict_start_date :restrict_start_date,
      restrict_end_date : restrict_end_date,
      itinerary : itinerary,
      options_name : options_name,
      options_amount : options_amount,
      options_select : options_select,
      tour_title : tour_title,
      tour : tour_list,
      teaser : teaser,
      introduction :introduction,
      unique_feature : unique_feature,
      gratuities :gratuities,
      video_url : video_url,
      accommodation : accommodation,
      dining : dining,
      enrichment : enrichment,
      entertainment : entertainment,
      health_and_fitness : health_and_fitness,
      kids_and_teens : kids_and_teens,
      accomodation_types : accomodation_types,
      deckplans : deckplans,
      dining_options : dining_options,
      enrichment_types :enrichment_types,
      entertainment_types : entertainment_types,
      health_fitness_types : health_fitness_types,
      useful_types : useful_types,
      cruises : cruises,
      holidays : holidays
    });
 
    // console.log("-- formData---",formData);
    const formResult = await formData.save();
    console.log("---formResult--- ",formResult);
    if (formResult) {
      return res.status(200).json({ message: "Succesfully Insert Data ", data: formResult , success : true , status : 200});
    } else {
      res.status(400).json({ message: "Error in insert data  ", data: "", success : false , status : 400});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: "", success : false, status : 500 });
  }
}

newPackages_obj.newpackageGet = async(req,res)=>{
  try {
      const { id } = req.query;
      if(id){
        const getData = await formSchemaModel.find({ _id: id });
        // console.log(getData);
        if (getData && getData.length > 0) {
            return res.status(200).json({ message: "Data fetched successfully", success: true, data: getData , status :200 });
        } else {
            return res.status(400).json({ message: "Data not found", data: '', success: false , status:400 });
        }
      }else{
        let getData = await formSchemaModel.find();
        if(getData){
            res.status(200).json({ message: "fetch data Successfully", success : true, data: getData , status:200 });
        }else{
            res.status(400).json({ message: "Data not Found", data: '' , success : false, status : 400});
        }
      }   
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500});
  }
}


newPackages_obj.newpackageUpdate = async(req,res)=>{
  try {
    const {id} = req.params;
    let {
      name,
      reference,
      operator,
      ship,
      region,
      general_type,
      general_Start,
      general_end,
      general_categories,
      general_range,
      summary,
      sales_message,
      text_banner,
      overview,
      whats_included,
      extras,
      itinerary,
      cruise_image,
      mobile_cruise_banner_image,
      sales_banner_image,
      cruise_banner_image
    } = req.body;
    if(!id){
      res.status(400).json({ message: "Missing data", data: "" , success : false , status : 400 });
    }
    const getData = await formSchemaModel.find({ _id: id });
    if(!getData ||  getData.length === 0){
      res.status(400).json({ message: "Data not Found", data: '' , success : false ,  status : 400 });
    }
    if(itinerary){
      itinerary = JSON.parse(itinerary)
    }else{
      itinerary = []
    }

    let  cruiseImageBase64 = null;
    if(cruise_image){
      cruiseImageBase64 = cruise_image;
    }else if(req.files["cruise_image"]?.[0]){
      cruiseImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_image"]?.[0]
      );
    }
    let  salesBannerImageBase64 = null;
    if(sales_banner_image){
      salesBannerImageBase64 = sales_banner_image;
    }else if(req.files["sales_banner_image"]?.[0]){
      salesBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["sales_banner_image"]?.[0]
      );
    }

    let  cruiseBannerImageBase64 = null;
    if(cruise_banner_image){
      cruiseBannerImageBase64 = cruise_banner_image;
    }else if(req.files["cruise_banner_image"]?.[0]){
      cruiseBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_banner_image"]?.[0]
      );
    }

    let  mobileCruiseBannerImageBase64 = null;
    if(mobile_cruise_banner_image){
      mobileCruiseBannerImageBase64 = mobile_cruise_banner_image;
    }else if(req.files["mobile_cruise_banner_image"]?.[0]){
      mobileCruiseBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["mobile_cruise_banner_image"]?.[0]
      );
    }
    const updateData = {};
    if(name && name !== null && name !== undefined && name.trim() !== "") {
      updateData.name = name;
    }  
    if (reference && reference !== null && reference !== undefined){
      updateData.reference = reference;
    } 
    if (operator && operator !== null && operator !== undefined) {
      updateData.operator = operator;
    }  
    if (ship && ship !== null && ship !== undefined){
      updateData.ship = ship;
    }
    if (region && region !== null && region !== undefined){
      updateData.region = region;
    } 
    if (general_type && general_type !== null && general_type !== undefined){
      updateData.general_type = general_type;
    }
    if (general_Start && general_Start && general_Start !== null && general_Start !== undefined) {
      updateData.general_Start = general_Start;
    }  
    if (general_end && general_end !== null && general_end !== undefined){
      updateData.general_end = general_end;
    } 
    if ( general_categories && general_categories !== null && general_categories !== undefined) {
      updateData.general_categories = general_categories;
    }  
    if (general_range && general_range !== null && general_range !== undefined) {
      updateData.general_range = general_range;
    } 
    if ( summary && summary !== null && summary !== undefined) {
      updateData.summary = summary;
    }  
    if (sales_message && sales_message !== null && sales_message !== undefined) {
      updateData.sales_message = sales_message;
    }
    if (text_banner && text_banner !== null && text_banner !== undefined){
      updateData.text_banner = text_banner;
    } 
    if ( overview && overview !== null && overview !== undefined){
      updateData.overview = overview;
    }
    if (whats_included && whats_included !== null && whats_included !== undefined) {
      updateData.whats_included = whats_included;
    }  
    if (extras && extras !== null && extras !== undefined){
      updateData.extras = extras;
    } 
    if (itinerary && itinerary !== null && itinerary !== undefined) {
      if (Array.isArray(itinerary) && itinerary.length > 0) {
        updateData.itinerary = itinerary;
      }
    }  
    if (cruise_image && cruise_image !== null && cruise_image !== undefined) {
      updateData.cruise_image = cruiseImageBase64;
    }  
    if (mobile_cruise_banner_image && mobile_cruise_banner_image !== null && mobile_cruise_banner_image !== undefined) {
      updateData.mobile_cruise_banner_image = mobileCruiseBannerImageBase64;
    }  
    if (sales_banner_image && sales_banner_image !== null && sales_banner_image !== undefined){
      updateData.sales_banner_image = salesBannerImageBase64
    } 
    if (cruise_banner_image && cruise_banner_image !== null && cruise_banner_image !== undefined) {
      updateData.cruise_banner_image = cruiseBannerImageBase64;
    }  

    // Perform the update
    const updateFormData = await formSchemaModel.updateOne({ _id: id }, { $set: updateData });
    if(updateFormData) {
      return res.status(200).json({ message: "Succesfully update Data ", data: updateFormData , success : true , status : 200 });
    } else {
      res.status(400).json({ message: "Error in updating Data", data: "", success : false , status:400 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500});
  }
}

newPackages_obj.newpackageSearchFilter = async (req, res) => {
  try {
      let { cruise_category, departure_month, destination, cruise_line, cruise_ship, ports, duration, price_range, recommended } = req.query;
      let filter = {};
      if (cruise_category) filter.general_categories = cruise_category;
      if (destination) filter.region = destination;
      if(cruise_line) filter.operator = cruise_line;
      if(cruise_ship) filter.ship = cruise_ship;
      if (ports) {
        filter.itinerary = { $elemMatch: { port: ports } };
      }
      if (duration) {
        let durationValue = Number(duration);
        if (!isNaN(durationValue) && durationValue >= 0 && durationValue <= 50) {
          filter.cruise_nights = { $gte: durationValue  }; 
        }
      }

      if(price_range){
        filter.package_cruise_value1 = price_range;
      }
      if (departure_month) {
        departure_month = moment(departure_month, "DD MMMM YYYY").unix();
        filter.itinerary = { $elemMatch: { check_in_date: { $gte: departure_month } } };
      }

      let SortQuery = {};
      if(recommended){
        if(recommended == "Price (Low to High)"){
          SortQuery['package_cruise_value1'] = 1
        }else if(recommended == "Price (High to Low)"){
          SortQuery['package_cruise_value1'] = -1
        }else if(recommended == "Departure Date (Soonest First)"){
          SortQuery['itinerary.check_in_date.0'] = 1;
        }else if(recommended == "Departure Date (Furthest First)"){
          SortQuery['last_check_in_date'] = -1;
        }
      }
      // console.log("--- SortQuery---",SortQuery);
      let searchFilterData = [];
      if(recommended  && Object.keys(SortQuery).length > 0){
        // searchFilterData = await formSchemaModel.find(filter).sort(SortQuery);
        searchFilterData = await formSchemaModel.aggregate([
          { $match: filter },
          { 
            $addFields: { 
              last_check_in_date: { $arrayElemAt: ["$itinerary.check_in_date", 0] }
            } 
          },
          { $sort: SortQuery }
        ]);
      }else{
        searchFilterData = await formSchemaModel.find(filter);
      }
      
      return res.status(200).json({ message: "fetch data Successfully", success : true, data: searchFilterData ,status:200 });

  } catch (error) {
    console.error("Error in searchCruises:", error);
    return res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
  }
};


module.exports = newPackages_obj;
