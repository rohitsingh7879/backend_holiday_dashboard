const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const isJson = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.length > 0;
  } catch {
    return false;
  }
};

const cruiseValidator = [
  body("name").notEmpty().withMessage("Name is required."),
  body("reference").notEmpty().withMessage("Reference is required."),
  body("operator").notEmpty().withMessage("Operator is required."),
  body("ship").notEmpty().withMessage("Ship is required."),
  body("region").notEmpty().withMessage("Region is required."),
  body("cruise_nights")
    .notEmpty()
    .withMessage("Cruise nights is required.")
    .isInt({ gt: 0 })
    .withMessage("Cruise nights must be a positive integer."),
  body("general_type").notEmpty().withMessage("General type is required."),
  body("general_Start")
    .notEmpty()
    .withMessage("General start date is required."),
  body("general_end").notEmpty().withMessage("General end date is required."),
  body("general_categories")
    .custom((value) => isJson(value))
    .withMessage("General categories must be have one data."),
  body("general_range").notEmpty().withMessage("General range is required."),
  body("summary").notEmpty().withMessage("Summary is required."),
  body("sales_message").notEmpty().withMessage("Sales message is required."),
  body("text_banner").notEmpty().withMessage("Text banner is required."),
  body("overview").notEmpty().withMessage("Overview is required."),
  body("whats_included")
    .custom((value) => isJson(value))
    .withMessage("Whats included must be have one data."),
  body("addOn")
    .custom((value) => isJson(value))
    .withMessage("AddOn must be have one data."),
  body("priceStartFrom")
    .notEmpty()
    .withMessage("Price start from is required.")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number."),
  body("insidePerPersonWas")
    .notEmpty()
    .withMessage("Inside Per Person Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("insidePerPersonNow")
    .notEmpty()
    .withMessage("Inside Per Person Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("outsidePerPersonWas")
    .notEmpty()
    .withMessage("Outside Per Person Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("outsidePerPersonNow")
    .notEmpty()
    .withMessage("Outside Per Person Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("balconyPerPersonWas")
    .notEmpty()
    .withMessage("Balcony Per Person Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("balconyPerPersonNow")
    .notEmpty()
    .withMessage("Balcony Per Person Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("suitePerPersonWas")
    .notEmpty()
    .withMessage("Suite Per Person Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("suitePerPersonNow")
    .notEmpty()
    .withMessage("Suite Per Person Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("insideSoloWas")
    .notEmpty()
    .withMessage("Inside Solo Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("insideSoloNow")
    .notEmpty()
    .withMessage("Inside Solo Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("outsideSoloWas")
    .notEmpty()
    .withMessage("Outside Solo Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("outsideSoloNow")
    .notEmpty()
    .withMessage("Outside Solo Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("balconySoloWas")
    .notEmpty()
    .withMessage("Balcony Solo Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("balconySoloNow")
    .notEmpty()
    .withMessage("Balcony Solo Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("SuiteSoloWas")
    .notEmpty()
    .withMessage("Suite Solo Was is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("SuiteSoloNow")
    .notEmpty()
    .withMessage("Suite Solo Now is required.")
    .isFloat()
    .withMessage("Must be a number."),
  body("fare_sets")
    .custom((value) => isJson(value))
    .withMessage("Fare sets must be have one data."),
  body("itinerary")
    .custom((value) => isJson(value))
    .withMessage("Itinerary must be have one data."),
  body("adjustment_type")
    .notEmpty()
    .withMessage("Adjustment type is required."),
  body("adjustment_amount")
    .notEmpty()
    .withMessage("Adjustment amount is required.")
    .isFloat()
    .withMessage("Adjustment amount must be a number."),
  body("restrict_start_date")
    .notEmpty()
    .withMessage("Restrict start date is required."),
  body("restrict_end_date")
    .notEmpty()
    .withMessage("Restrict end date is required."),
  body("options_name").notEmpty().withMessage("Options name is required."),
  body("options_amount")
    .notEmpty()
    .withMessage("Options amount is required.")
    .isFloat()
    .withMessage("Options amount must be a number."),
  body("options_select").notEmpty().withMessage("Options select is required."),
  body("tour_title").notEmpty().withMessage("Tour title is required."),
  body("tour_list")
    .custom((value) => isJson(value))
    .withMessage("Tour list must be have one data."),
];

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array()?.[0],
    });
  }
  next();
};

const validateCruiseImages = (req, res, next) => {
  const errors = [];

  if (
    !req.body.cruise_image &&
    (!req.files ||
      !req.files["cruise_image"] ||
      !req.files["cruise_image"].length)
  ) {
    errors.push({
      field: "cruise_image",
      message: "Cruise image is required.",
    });
  }

  if (
    !req.body.sales_banner_image &&
    (!req.files ||
      !req.files["sales_banner_image"] ||
      !req.files["sales_banner_image"].length)
  ) {
    errors.push({
      field: "sales_banner_image",
      message: "Sales banner image is required.",
    });
  }

  if (
    !req.body.cruise_banner_image &&
    (!req.files ||
      !req.files["cruise_banner_image"] ||
      !req.files["cruise_banner_image"].length)
  ) {
    errors.push({
      field: "cruise_banner_image",
      message: "Cruise banner image is required.",
    });
  }

  if (
    !req.body.mobile_cruise_banner_image &&
    (!req.files ||
      !req.files["mobile_cruise_banner_image"] ||
      !req.files["mobile_cruise_banner_image"].length)
  ) {
    errors.push({
      field: "mobile_cruise_banner_image",
      message: "Mobile cruise banner image is required.",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: false,
      errors,
    });
  }

  next();
};

module.exports = {
  cruiseValidator,
  validateCruiseImages,
  validateResult,
};
