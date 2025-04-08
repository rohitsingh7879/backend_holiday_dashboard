const formSchemaModel = require("../../../Models/newPackagesModel");
const customFunction = require("../../../util/customFunction");
const moment = require("moment");
const newPackages_obj = {};

newPackages_obj.newpackageSave = async (req, res) => {
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
      general_sub_categories,
      general_range,
      summary,
      sales_message,
      text_banner,
      overview,
      whats_included,
      addOn,
      priceStartFrom,
      insidePerPersonWas,
      insidePerPersonNow,
      outsidePerPersonWas,
      outsidePerPersonNow,
      balconyPerPersonWas,
      balconyPerPersonNow,
      suitePerPersonWas,
      suitePerPersonNow,
      insideSoloWas,
      insideSoloNow,
      outsideSoloWas,
      outsideSoloNow,
      balconySoloWas,
      balconySoloNow,
      SuiteSoloWas,
      SuiteSoloNow,
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
      sales_banner_image,
      cruise_banner_image,
      teaser,
      introduction,
      unique_feature,
      gratuities,
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
      enrichment_types,
      entertainment_types,
      health_fitness_types,
      useful_types,
      cruises,
      holidays,
    } = req.body;
    // console.log("--fare_sets first-- ",req.body);

    if (general_Start) {
      general_Start = moment(new Date(general_Start)).unix();
    }

    if (general_end) {
      general_end = moment(new Date(general_end)).unix();
    }
    if (fare_sets) {
      fare_sets = JSON.parse(fare_sets);
    } else {
      fare_sets = [];
    }

    try {
      accommodation = JSON.parse(accommodation) || {};
    } catch (error) {
      accommodation = {};
    }

    try {
      dining = JSON.parse(dining) || {};
    } catch (error) {
      dining = {};
    }

    try {
      enrichment = JSON.parse(enrichment) || {};
    } catch (error) {
      enrichment = {};
    }

    try {
      entertainment = JSON.parse(entertainment) || {};
    } catch (error) {
      entertainment = {};
    }

    try {
      health_and_fitness = JSON.parse(health_and_fitness) || {};
    } catch (error) {
      health_and_fitness = {};
    }

    try {
      kids_and_teens = JSON.parse(kids_and_teens) || {};
    } catch (error) {
      kids_and_teens = {};
    }

    try {
      accomodation_types = JSON.parse(accomodation_types) || [];
    } catch (error) {
      accomodation_types = [];
    }

    try {
      deckplans = JSON.parse(deckplans) || [];
    } catch (error) {
      deckplans = [];
    }

    try {
      dining_options = JSON.parse(dining_options) || [];
    } catch (error) {
      dining_options = [];
    }

    try {
      enrichment_types = JSON.parse(enrichment_types) || [];
    } catch (error) {
      enrichment_types = [];
    }

    try {
      entertainment_types = JSON.parse(entertainment_types) || [];
    } catch (error) {
      entertainment_types = [];
    }

    try {
      health_fitness_types = JSON.parse(health_fitness_types) || [];
    } catch (error) {
      health_fitness_types = [];
    }

    try {
      useful_types = JSON.parse(useful_types) || [];
    } catch (error) {
      useful_types = [];
    }

    try {
      cruises = JSON.parse(cruises) || [];
    } catch (error) {
      cruises = [];
    }

    try {
      holidays = JSON.parse(holidays) || [];
    } catch (error) {
      holidays = [];
    }

    if (itinerary) {
      itinerary = JSON.parse(itinerary);
      if (Array.isArray(itinerary)) {
        itinerary = itinerary.map((item) => ({
          ...item,
          check_in_date: item.check_in_date
            ? moment(item.check_in_date).unix()
            : null,
          check_out_date: item.check_out_date
            ? moment(item.check_out_date).unix()
            : null,
        }));
      } else {
        itinerary = [];
      }
    } else {
      itinerary = [];
    }

    let cruiseImageBase64 = null;
    if (cruise_image) {
      cruiseImageBase64 = cruise_image;
    } else if (req.files["cruise_image"]?.[0]) {
      cruiseImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_image"]?.[0]
      );
    }

    let salesBannerImageBase64 = null;
    if (sales_banner_image) {
      salesBannerImageBase64 = sales_banner_image;
    } else if (req.files["sales_banner_image"]?.[0]) {
      salesBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["sales_banner_image"]?.[0]
      );
    }

    let cruiseBannerImageBase64 = null;
    if (cruise_banner_image) {
      cruiseBannerImageBase64 = cruise_banner_image;
    } else if (req.files["cruise_banner_image"]?.[0]) {
      cruiseBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_banner_image"]?.[0]
      );
    }

    let mobileCruiseBannerImageBase64 = null;
    if (mobile_cruise_banner_image) {
      mobileCruiseBannerImageBase64 = mobile_cruise_banner_image;
    } else if (req.files["mobile_cruise_banner_image"]?.[0]) {
      mobileCruiseBannerImageBase64 =
        await customFunction.uploadImageOnAwsReturnUrl(
          req.files["mobile_cruise_banner_image"]?.[0]
        );
    }

    if (tour_list) {
      tour_list = JSON.parse(tour_list);
      if (Array.isArray(tour_list) && tour_list.length > 0) {
        const updatedTourList = [];
        for (const [index, tourItem] of tour_list.entries()) {
          const icon = req.files["tour_list[]"]?.[index]
            ? await customFunction.uploadImageOnAwsReturnUrl(
                req.files["tour_list[]"][index]
              )
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

    if (whats_included) {
      whats_included = JSON.parse(whats_included);
      if (Array.isArray(whats_included) && whats_included.length > 0) {
        const updatedwhatInculded = [];
        for (const [index, whatIncludedItem] of whats_included.entries()) {
          const icon = req.files["whats_included[]"]?.[index]
            ? await customFunction.uploadImageOnAwsReturnUrl(
                req.files["whats_included[]"][index]
              )
            : null;
          updatedwhatInculded.push({
            name: whatIncludedItem?.name || "",
            icon: icon,
          });
        }

        whats_included = updatedwhatInculded;
      } else {
        whats_included = [];
      }
    } else {
      whats_included = [];
    }

    if (addOn) {
      addOn = JSON.parse(addOn);
      if (Array.isArray(addOn) && addOn.length > 0) {
        const updatedaddOn = [];
        for (const [index, addOnItem] of addOn.entries()) {
          const icon = req.files["addOn[]"]?.[index]
            ? await customFunction.uploadImageOnAwsReturnUrl(
                req.files["addOn[]"][index]
              )
            : null;
          updatedaddOn.push({
            name: addOnItem?.name || "",
            icon: icon,
          });
        }

        addOn = updatedaddOn;
      } else {
        addOn = [];
      }
    } else {
      addOn = [];
    }

    if (general_categories) {
      general_categories = JSON.parse(general_categories);
    } else {
      general_categories = [];
    }
    if (general_sub_categories) {
      general_sub_categories = JSON.parse(general_sub_categories);
    } else {
      general_sub_categories = [];
    }
    const formData = new formSchemaModel({
      name: name,
      reference: reference,
      operator: operator,
      ship: ship,
      region: region,
      cruise_nights: cruise_nights,
      general_type: general_type,
      general_Start: general_Start,
      general_end: general_end,
      general_categories: general_categories,
      general_sub_categories: general_sub_categories,
      general_range: general_range,
      cruise_image: cruiseImageBase64,
      sales_banner_image: salesBannerImageBase64,
      cruise_banner_image: cruiseBannerImageBase64,
      mobile_cruise_banner_image: mobileCruiseBannerImageBase64,
      summary: summary,
      sales_message: sales_message,
      text_banner: text_banner,
      overview: overview,
      whats_included: whats_included,
      // extras : extras,
      addOn: addOn,
      priceStartFrom: priceStartFrom,
      insidePerPersonWas: insidePerPersonWas,
      insidePerPersonNow: insidePerPersonNow,
      outsidePerPersonWas: outsidePerPersonWas,
      outsidePerPersonNow: outsidePerPersonNow,
      balconyPerPersonWas: balconyPerPersonWas,
      balconyPerPersonNow: balconyPerPersonNow,
      suitePerPersonWas: suitePerPersonWas,
      suitePerPersonNow: suitePerPersonNow,
      insideSoloWas: insideSoloWas,
      insideSoloNow: insideSoloNow,
      outsideSoloWas: outsideSoloWas,
      outsideSoloNow: outsideSoloNow,
      balconySoloWas: balconySoloWas,
      balconySoloNow: balconySoloNow,
      SuiteSoloWas: SuiteSoloWas,
      SuiteSoloNow: SuiteSoloNow,
      fare_sets: fare_sets,
      adjustment_type: adjustment_type,
      adjustment_amount: adjustment_amount,
      restrict_start_date: restrict_start_date,
      restrict_end_date: restrict_end_date,
      itinerary: itinerary,
      options_name: options_name,
      options_amount: options_amount,
      options_select: options_select,
      tour_title: tour_title,
      tour: tour_list,
      teaser: teaser,
      introduction: introduction,
      unique_feature: unique_feature,
      gratuities: gratuities,
      video_url: video_url,
      accommodation: accommodation,
      dining: dining,
      enrichment: enrichment,
      entertainment: entertainment,
      health_and_fitness: health_and_fitness,
      kids_and_teens: kids_and_teens,
      accomodation_types: accomodation_types,
      deckplans: deckplans,
      dining_options: dining_options,
      enrichment_types: enrichment_types,
      entertainment_types: entertainment_types,
      health_fitness_types: health_fitness_types,
      useful_types: useful_types,
      cruises: cruises,
      holidays: holidays,
    });

    // console.log("-- formData---",formData);
    const formResult = await formData.save();
    // console.log("---formResult--- ",formResult);
    if (formResult) {
      return res.status(200).json({
        message: "Succesfully Insert Data ",
        data: formResult,
        success: true,
        status: 200,
      });
    } else {
      res.status(400).json({
        message: "Error in  Insert Data",
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

newPackages_obj.newpackageGet = async (req, res) => {
  try {
    const { id, page = 1, limit = 10, region, operator, type } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    if (id) {
      const getData = await formSchemaModel.find({ _id: id });

      if (getData && getData.length > 0) {
        return res.status(200).json({
          message: "Data fetched successfully",
          success: true,
          data: getData,
          status: 200,
        });
      } else {
        return res.status(400).json({
          message: "Data not found",
          data: "",
          success: false,
          status: 400,
        });
      }
    } else {
      let filterQuery = {};

      if (region) {
        filterQuery.region = region;
      }

      if (operator) {
        filterQuery.operator = operator;
      }
      if (type && type !== "All") {
        filterQuery.general_type = type;
      }

      const getData = await formSchemaModel
        .find(filterQuery)
        .skip(skip)
        .limit(parseInt(limit))
        .exec();

      const totalRecords = await formSchemaModel.countDocuments(filterQuery);

      const totalPages = Math.ceil(totalRecords / limit);

      if (getData) {
        return res.status(200).json({
          message: "Data fetched successfully",
          success: true,
          data: getData,
          pagination: {
            page: pageNumber,
            limit: limitNumber,
            total: totalRecords,
            totalPages: totalPages,
          },
          totalRecords,
          totalPages,
          currentPage: parseInt(page),
          status: 200,
        });
      } else {
        return res.status(400).json({
          message: "Data not found",
          data: "",
          success: false,
          status: 400,
        });
      }
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

newPackages_obj.newpackageUpdate = async (req, res) => {
  try {
    const { id } = req.params;
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
      addOn,
      priceStartFrom,
      insidePerPersonWas,
      insidePerPersonNow,
      outsidePerPersonWas,
      outsidePerPersonNow,
      balconyPerPersonWas,
      balconyPerPersonNow,
      suitePerPersonWas,
      suitePerPersonNow,
      insideSoloWas,
      insideSoloNow,
      outsideSoloWas,
      outsideSoloNow,
      balconySoloWas,
      balconySoloNow,
      SuiteSoloWas,
      SuiteSoloNow,
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
      sales_banner_image,
      cruise_banner_image,
    } = req.body;

    // console.log("--- req.body---",req.body);
    if (!id) {
      res.status(400).json({
        message: "Missing data",
        data: "",
        success: false,
        status: 400,
      });
    }
    const getData = await formSchemaModel.find({ _id: id });
    if (!getData || getData.length === 0) {
      res.status(400).json({
        message: "Data not Found",
        data: "",
        success: false,
        status: 400,
      });
    }

    const updateData = {};
    if (name && name !== null && name !== undefined && name.trim() !== "") {
      updateData.name = name;
    }
    if (reference && reference !== null && reference !== undefined) {
      updateData.reference = reference;
    }

    if (operator && operator !== null && operator !== undefined) {
      updateData.operator = operator;
    }
    if (ship && ship !== null && ship !== undefined) {
      updateData.ship = ship;
    }
    if (region && region !== null && region !== undefined) {
      updateData.region = region;
    }
    if (
      cruise_nights &&
      cruise_nights !== null &&
      cruise_nights !== undefined
    ) {
      updateData.cruise_nights = cruise_nights;
    }

    if (general_type && general_type !== null && general_type !== undefined) {
      updateData.general_type = general_type;
    }
    if (
      general_Start &&
      general_Start &&
      general_Start !== null &&
      general_Start !== undefined
    ) {
      general_Start = moment(new Date(general_Start)).unix();
      updateData.general_Start = general_Start;
    }
    if (general_end && general_end !== null && general_end !== undefined) {
      general_end = moment(new Date(general_end)).unix();
      updateData.general_end = general_end;
    }
    if (
      general_categories &&
      general_categories !== null &&
      general_categories !== undefined
    ) {
      try {
        const parsedCategories = JSON.parse(general_categories);
        if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
          updateData.general_categories = parsedCategories;
        }
      } catch (error) {
        console.log("--categories error");
      }
    }

    if (
      general_range &&
      general_range !== null &&
      general_range !== undefined
    ) {
      updateData.general_range = general_range;
    }
    if (summary && summary !== null && summary !== undefined) {
      updateData.summary = summary;
    }
    if (
      sales_message &&
      sales_message !== null &&
      sales_message !== undefined
    ) {
      updateData.sales_message = sales_message;
    }
    if (text_banner && text_banner !== null && text_banner !== undefined) {
      updateData.text_banner = text_banner;
    }
    if (overview && overview !== null && overview !== undefined) {
      updateData.overview = overview;
    }
    // if (whats_included && whats_included !== null && whats_included !== undefined) {
    //   whats_included = JSON.parse(whats_included);
    //   if (Array.isArray(whats_included) && whats_included.length > 0) {
    //       const updatedwhatInculded = [];
    //       for (const [index, whatIncludedItem] of whats_included.entries()) {
    //           const icon = whatIncludedItem.icon ||
    //                        (req.files['whats_included[]']?.[index]
    //                            ? await customFunction.uploadImageOnAwsReturnUrl(req.files['whats_included[]'][index])
    //                            : null);

    //           updatedwhatInculded.push({
    //               name: whatIncludedItem?.name || "",
    //               icon: icon,
    //           });
    //       }

    //       updateData.whats_included = updatedwhatInculded;
    //   }
    // }

    if (
      whats_included &&
      whats_included !== null &&
      whats_included !== undefined
    ) {
      try {
        whats_included = JSON.parse(whats_included);
        if (Array.isArray(whats_included) && whats_included.length > 0) {
          const updatedwhatInculded = [];
          let count = 0;
          for (const [index, whatIncludedItem] of whats_included.entries()) {
            let icon = null;
            // console.log("--- req.files ---", req.files?.['tour_list[]']);
            if (
              whatIncludedItem.icon &&
              typeof whatIncludedItem.icon === "string" &&
              whatIncludedItem.icon.startsWith("http")
            ) {
              icon = whatIncludedItem.icon;
            } else if (req.files?.["whats_included[]"]?.[count]) {
              icon = await customFunction.uploadImageOnAwsReturnUrl(
                req.files["whats_included[]"][count]
              );
              count++;
            }

            updatedwhatInculded.push({
              name: whatIncludedItem?.name || "",
              icon: icon,
            });
          }

          updateData.whats_included = updatedwhatInculded;
        }
      } catch (error) {
        console.error("Error parsing tour_list:", error);
      }
    }

    // if (addOn && addOn !== null && addOn !== undefined) {
    //   addOn = JSON.parse(addOn);
    //   if (Array.isArray(addOn) && addOn.length > 0) {
    //     const updatedaddOn= [];
    //     for (const [index, addOnItem] of addOn.entries()) {
    //       const icon = addOnItem.icon || (req.files['addOn[]']?.[index]
    //         ? await customFunction.uploadImageOnAwsReturnUrl(req.files['addOn[]'][index])
    //         : null);
    //         updatedaddOn.push({
    //         name: addOnItem?.name || "",
    //         icon: icon,
    //       });
    //     }
    //     updateData.addOn = updatedaddOn;
    //   }
    // }

    if (addOn && addOn !== null && addOn !== undefined) {
      try {
        // console.log("--- addOn---",addOn);
        addOn = JSON.parse(addOn);
        // console.log("--- parsed addOn---",addOn);
        if (Array.isArray(addOn) && addOn.length > 0) {
          const updatedaddOn = [];
          let count = 0;
          for (const [index, addOnItem] of addOn.entries()) {
            let icon = null;
            // console.log("--- req.files ---", req.files?.['tour_list[]']);
            if (
              addOnItem.icon &&
              typeof addOnItem.icon === "string" &&
              addOnItem.icon.startsWith("http")
            ) {
              icon = addOnItem.icon;
            } else if (req.files?.["addOn[]"]?.[count]) {
              icon = await customFunction.uploadImageOnAwsReturnUrl(
                req.files["addOn[]"][count]
              );
              count++;
            }

            updatedaddOn.push({
              name: addOnItem?.name || "",
              icon: icon,
            });
          }

          updateData.addOn = updatedaddOn;
        }
      } catch (error) {
        console.error("Error parsing tour_list:", error);
      }
    }

    // console.log("--- updateData.addOn---",updateData.addOn);
    if (
      priceStartFrom &&
      priceStartFrom !== null &&
      priceStartFrom !== undefined
    ) {
      updateData.priceStartFrom = priceStartFrom;
    }

    if (
      insidePerPersonWas &&
      insidePerPersonWas !== null &&
      insidePerPersonWas !== undefined
    ) {
      updateData.insidePerPersonWas = insidePerPersonWas;
    }
    if (
      insidePerPersonNow &&
      insidePerPersonNow !== null &&
      insidePerPersonNow !== undefined
    ) {
      updateData.insidePerPersonNow = insidePerPersonNow;
    }
    if (
      outsidePerPersonWas &&
      outsidePerPersonWas !== null &&
      outsidePerPersonWas !== undefined
    ) {
      updateData.outsidePerPersonWas = outsidePerPersonWas;
    }
    if (
      outsidePerPersonNow &&
      outsidePerPersonNow !== null &&
      outsidePerPersonNow !== undefined
    ) {
      updateData.outsidePerPersonNow = outsidePerPersonNow;
    }

    if (
      balconyPerPersonWas &&
      balconyPerPersonWas !== null &&
      balconyPerPersonWas !== undefined
    ) {
      updateData.balconyPerPersonWas = balconyPerPersonWas;
    }

    if (
      balconyPerPersonNow &&
      balconyPerPersonNow !== null &&
      balconyPerPersonNow !== undefined
    ) {
      updateData.balconyPerPersonNow = balconyPerPersonNow;
    }

    if (
      suitePerPersonWas &&
      suitePerPersonWas !== null &&
      suitePerPersonWas !== undefined
    ) {
      updateData.suitePerPersonWas = suitePerPersonWas;
    }

    if (
      suitePerPersonNow &&
      suitePerPersonNow !== null &&
      suitePerPersonNow !== undefined
    ) {
      updateData.suitePerPersonNow = suitePerPersonNow;
    }

    if (
      insideSoloWas &&
      insideSoloWas !== null &&
      insideSoloWas !== undefined
    ) {
      updateData.insideSoloWas = insideSoloWas;
    }

    if (
      insideSoloNow &&
      insideSoloNow !== null &&
      insideSoloNow !== undefined
    ) {
      updateData.insideSoloNow = insideSoloNow;
    }

    if (
      outsideSoloWas &&
      outsideSoloWas !== null &&
      outsideSoloWas !== undefined
    ) {
      updateData.outsideSoloWas = outsideSoloWas;
    }
    if (
      outsideSoloNow &&
      outsideSoloNow !== null &&
      outsideSoloNow !== undefined
    ) {
      updateData.outsideSoloNow = outsideSoloNow;
    }

    if (
      balconySoloWas &&
      balconySoloWas !== null &&
      balconySoloWas !== undefined
    ) {
      updateData.balconySoloWas = balconySoloWas;
    }

    if (
      balconySoloNow &&
      balconySoloNow !== null &&
      balconySoloNow !== undefined
    ) {
      updateData.balconySoloNow = balconySoloNow;
    }

    if (SuiteSoloWas && SuiteSoloWas !== null && SuiteSoloWas !== undefined) {
      updateData.SuiteSoloWas = SuiteSoloWas;
    }

    if (SuiteSoloNow && SuiteSoloNow !== null && SuiteSoloNow !== undefined) {
      updateData.SuiteSoloNow = SuiteSoloNow;
    }

    if (fare_sets && fare_sets != null && fare_sets !== undefined) {
      fare_sets = JSON.parse(fare_sets);
      if (
        Array.isArray(fare_sets) &&
        fare_sets.length > 0 &&
        fare_sets.some(
          (fare) =>
            fare.fare_set_name ||
            fare.airport_code ||
            fare.deal_code ||
            (Array.isArray(fare.fares) && fare.fares.length > 0)
        )
      ) {
        updateData.fare_sets = fare_sets;
      }
    }

    if (itinerary && itinerary !== null && itinerary !== undefined) {
      itinerary = JSON.parse(itinerary);
      if (Array.isArray(itinerary) && itinerary.length > 0) {
        itinerary = itinerary.map((item) => ({
          ...item,
          check_in_date: item.check_in_date
            ? moment(item.check_in_date).unix()
            : null,
          check_out_date: item.check_out_date
            ? moment(item.check_out_date).unix()
            : null,
        }));
        updateData.itinerary = itinerary;
      }
    }

    if (
      adjustment_type &&
      adjustment_type != null &&
      adjustment_type !== undefined
    ) {
      updateData.adjustment_type = adjustment_type;
    }

    if (
      adjustment_amount &&
      adjustment_amount != null &&
      adjustment_amount !== undefined
    ) {
      updateData.adjustment_amount = adjustment_amount;
    }

    if (
      restrict_start_date &&
      restrict_start_date != null &&
      restrict_start_date !== undefined
    ) {
      updateData.restrict_start_date = restrict_start_date;
    }
    if (
      restrict_end_date &&
      restrict_end_date != null &&
      restrict_end_date !== undefined
    ) {
      updateData.restrict_end_date = restrict_end_date;
    }

    if (options_name && options_name != null && options_name !== undefined) {
      updateData.options_name = options_name;
    }

    if (
      options_amount &&
      options_amount != null &&
      options_amount !== undefined
    ) {
      updateData.options_amount = options_amount;
    }

    if (
      options_select &&
      options_select != null &&
      options_select !== undefined
    ) {
      updateData.options_select = options_select;
    }

    if (tour_title && tour_title != null && tour_title != undefined) {
      updateData.tour_title = tour_title;
    }

    if (tour_list && tour_list !== null && tour_list !== undefined) {
      try {
        tour_list = JSON.parse(tour_list);

        if (Array.isArray(tour_list) && tour_list.length > 0) {
          const updatedTourList = [];
          let count = 0;
          for (const [index, tourItem] of tour_list.entries()) {
            let icon = null;
            // console.log("--- req.files ---", req.files?.['tour_list[]']);
            if (
              tourItem.icon &&
              typeof tourItem.icon === "string" &&
              tourItem.icon.startsWith("http")
            ) {
              icon = tourItem.icon;
            } else if (req.files?.["tour_list[]"]?.[count]) {
              icon = await customFunction.uploadImageOnAwsReturnUrl(
                req.files["tour_list[]"][count]
              );
              count++;
            }

            updatedTourList.push({
              name: tourItem?.name || "",
              icon: icon,
            });
          }

          updateData.tour = updatedTourList;
        }
      } catch (error) {
        console.error("Error parsing tour_list:", error);
      }
    }
    // console.log("---updateData tour_list--- ",updateData.tour_list);

    let cruiseImageBase64 = null;
    if (cruise_image) {
      cruiseImageBase64 = cruise_image;
    } else if (req.files["cruise_image"]?.[0]) {
      cruiseImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_image"]?.[0]
      );
    }
    if (
      cruiseImageBase64 &&
      cruiseImageBase64 !== null &&
      cruiseImageBase64 !== undefined
    ) {
      updateData.cruise_image = cruiseImageBase64;
    }

    let salesBannerImageBase64 = null;
    if (sales_banner_image) {
      salesBannerImageBase64 = sales_banner_image;
    } else if (req.files["sales_banner_image"]?.[0]) {
      salesBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["sales_banner_image"]?.[0]
      );
    }
    if (
      salesBannerImageBase64 &&
      salesBannerImageBase64 !== null &&
      salesBannerImageBase64 !== undefined
    ) {
      updateData.sales_banner_image = salesBannerImageBase64;
    }

    let cruiseBannerImageBase64 = null;
    if (cruise_banner_image) {
      cruiseBannerImageBase64 = cruise_banner_image;
    } else if (req.files["cruise_banner_image"]?.[0]) {
      cruiseBannerImageBase64 = await customFunction.uploadImageOnAwsReturnUrl(
        req.files["cruise_banner_image"]?.[0]
      );
    }
    if (
      cruiseBannerImageBase64 &&
      cruiseBannerImageBase64 !== null &&
      cruiseBannerImageBase64 !== undefined
    ) {
      updateData.cruise_banner_image = cruiseBannerImageBase64;
    }

    let mobileCruiseBannerImageBase64 = null;
    if (mobile_cruise_banner_image) {
      mobileCruiseBannerImageBase64 = mobile_cruise_banner_image;
    } else if (req.files["mobile_cruise_banner_image"]?.[0]) {
      mobileCruiseBannerImageBase64 =
        await customFunction.uploadImageOnAwsReturnUrl(
          req.files["mobile_cruise_banner_image"]?.[0]
        );
    }

    if (
      mobileCruiseBannerImageBase64 &&
      mobileCruiseBannerImageBase64 !== null &&
      mobileCruiseBannerImageBase64 !== undefined
    ) {
      updateData.mobile_cruise_banner_image = mobileCruiseBannerImageBase64;
    }

    // Perform the update
    const updateFormData = await formSchemaModel.updateOne(
      { _id: id },
      { $set: updateData }
    );
    // console.log("--- updateFormData---",updateFormData);
    if (updateFormData) {
      return res.status(200).json({
        message: "Succesfully update Data ",
        data: updateFormData,
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

newPackages_obj.newpackageSearchFilter = async (req, res) => {
  try {
    // console.log("---search Filter-----", req.query);
    let {
      cruise_category,
      departure_month,
      destination,
      cruise_line,
      cruise_ship,
      ports,
      duration,
      price_range,
      recommended,
      page = 1,
      limit = 10,
    } = req.query;
    const skip = (page - 1) * limit;
    // Constructing a dynamic filter object
    let filter = {};

    if (cruise_category) {
      cruise_category = JSON.parse(cruise_category);
      if (Array.isArray(cruise_category) && cruise_category.length > 0) {
        // filter.general_categories = cruise_category;
        filter.general_categories = { $in: cruise_category };
      }
    }
    // console.log("---cruise_category last-- ",cruise_category);
    if (destination) filter.region = destination;
    if (cruise_line) filter.operator = cruise_line;
    if (cruise_ship) filter.ship = cruise_ship;
    if (ports) {
      filter.itinerary = { $elemMatch: { port: ports } };
    }

    // Handle the `duration` condition
    if (duration) {
      let durationValue = Number(duration);
      if (!isNaN(durationValue) && durationValue >= 0 && durationValue <= 50) {
        filter.$expr = filter.$expr || {};

        filter.$expr.cruise_nights_lte = {
          $lte: [{ $toDouble: "$cruise_nights" }, durationValue],
        };
      }
    }

    // Handle the `price_range` condition
    if (price_range) {
      let price_rangeValue = Number(price_range);
      if (
        !isNaN(price_rangeValue) &&
        price_rangeValue >= 0 &&
        price_rangeValue <= 50
      ) {
        filter.$expr = filter.$expr || {};

        filter.$expr.priceStartFrom_lte = {
          $lte: [{ $toDouble: "$priceStartFrom" }, price_rangeValue],
        };
      }
    }

    // Now `filter` will have both conditions merged if both `duration` and `price_range` are present
    // console.log(filter);

    // if (price_range) {
    //   filter.package_cruise_value1 = price_range;
    //   filter.priceStartFrom = { $lte: price_range };
    // }
    if (departure_month) {
      departure_month = moment(departure_month, "DD MMMM YYYY").unix();
      filter.itinerary = {
        $elemMatch: { check_in_date: { $gte: departure_month } },
      };
    }
    let SortQuery = {};
    if (recommended) {
      if (recommended == "Price (Low to High)") {
        SortQuery["package_cruise_value1_numeric"] = 1;
      } else if (recommended == "Price (High to Low)") {
        SortQuery["package_cruise_value1_numeric"] = -1;
      } else if (recommended == "Departure Date (Soonest First)") {
        SortQuery["itinerary.check_in_date.0"] = 1;
      } else if (recommended == "Departure Date (Furthest First)") {
        SortQuery["last_check_in_date"] = -1;
      }
    }

    console.log("-- recommend--", recommended);
    //  console.log("--- SortQuery---",SortQuery);
    let searchFilterData = [];
    // if(recommended  && Object.keys(SortQuery).length > 0){
    //   // searchFilterData = await formSchemaModel.find(filter).sort(SortQuery);
    //   searchFilterData = await formSchemaModel.aggregate([
    //     { $match: filter },
    //     {
    //       $addFields: {
    //         package_cruise_value1_numeric: {
    //           $cond: {
    //             if: { $or: [
    //               { $eq: ["$package_cruise_value1", ""] },
    //               { $eq: ["$package_cruise_value1", null] }
    //             ] },
    //             then: 0,
    //             else: { $toDouble: "$package_cruise_value1" }
    //           }
    //         },
    //         last_check_in_date: { $arrayElemAt: ["$itinerary.check_in_date", 0] }
    //       }
    //     },
    //     { $sort: SortQuery }
    //   ]);
    // }else{
    //   searchFilterData = await formSchemaModel.find(filter);
    // }
    // console.log("filtr", filter);

    if (recommended && Object.keys(SortQuery).length > 0) {
      searchFilterData = await formSchemaModel.aggregate([
        { $match: filter },
        {
          $addFields: {
            package_cruise_value1_numeric: {
              $cond: {
                if: {
                  $or: [
                    { $eq: ["$package_cruise_value1", ""] },
                    { $eq: ["$package_cruise_value1", null] },
                    { $eq: ["$package_cruise_value1", undefined] },
                  ],
                },
                then: 0,
                else: { $toDouble: "$package_cruise_value1" },
              },
            },
            last_check_in_date: {
              $arrayElemAt: ["$itinerary.check_in_date", 0],
            },
          },
        },
        {
          $sort: SortQuery,
        },
      ]);
    } else {
      searchFilterData = await formSchemaModel
        .find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .exec();
    }
    // console.log("---searchFilterData--- ",searchFilterData);

    return res.status(200).json({
      message: "fetch data Successfully",
      success: true,
      data: searchFilterData,
      status: 200,
    });
  } catch (error) {
    console.error("Error in searchCruises:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

newPackages_obj.newpackagePickCruiseCollection = async (req, res) => {
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
    const getData = await formSchemaModel.find({ _id: id });
    if (!getData || getData.length === 0) {
      res.status(400).json({
        message: "Data not Found",
        data: "",
        success: false,
        status: 400,
      });
    }

    const { statusPickCollection } = req.body;
    const updateData = {};
    if (statusPickCollection !== undefined && statusPickCollection !== null) {
      updateData.statusPickCollection = statusPickCollection;
    }

    const updateStatus = await formSchemaModel.updateOne(
      { _id: id },
      { $set: updateData }
    );
    if (updateStatus) {
      return res.status(200).json({
        message: "Succesfully update Status",
        data: updateStatus,
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

module.exports = newPackages_obj;
