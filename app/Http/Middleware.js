const multer = require("multer");
const middleware = {};
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

middleware.uploadImage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "cruise_image", maxCount: 1 },
    { name: "sales_banner_image", maxCount: 1 },
    { name: "cruise_banner_image", maxCount: 1 },
    { name: "mobile_cruise_banner_image", maxCount: 1 },
    { name: "tour_list[]" },
    { name: "whats_included[]" },
    { name: "addOn[]" },
  ]);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error in File Upload",
        data: "",
        success: false,
        status: 400,
      });
    }
    next();
  });
};

middleware.uploadImageUpdate = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "cruise_image", maxCount: 1 },
    { name: "sales_banner_image", maxCount: 1 },
    { name: "cruise_banner_image", maxCount: 1 },
    { name: "mobile_cruise_banner_image", maxCount: 1 },
    { name: "tour_list[]" },
    { name: "whats_included[]" },
    { name: "addOn[]" },
  ]);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error in File Upload",
        data: "",
        success: false,
        status: 400,
      });
    }
    next();
  });
};

middleware.uploadBannerImage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "bannerImage", maxCount: 1 },
  ]);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error in File Upload",
        data: "",
        success: false,
        status: 400,
      });
    }
    next();
  });
};

middleware.uploadCategoryImage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "categoryImage", maxCount: 1 },
  ]);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error in File Upload",
        data: "",
        success: false,
        status: 400,
      });
    }
    next();
  });
};
middleware.uploadSubCategoryImage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "subCategoryImage", maxCount: 1 },
  ]);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error in File Upload",
        data: "",
        success: false,
        status: 400,
      });
    }
    next();
  });
};

middleware.uploadFAQImage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "FAQ_image", maxCount: 1 },
  ]);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error in File Upload",
        data: "",
        success: false,
        status: 400,
      });
    }
    next();
  });
};
middleware.uploadMultipleFiles = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) +
          "_" +
          Date.now() +
          "_" +
          file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "Images", maxCount: 10 },
  ]);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error in File Upload",
        data: "",
        error: err?.message,
        success: false,
        status: 400,
      });
    }
    next();
  });
};


middleware.validateRegisterInput = [
  body('userName')
    .isString()
    .withMessage('User name must be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('User name must be between 3 and 20 characters'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/)
    .withMessage('Password must contain at least one number and one special character'),
];
middleware.validateUpdatePassword = [
  body('userName')
    .isString()
    .withMessage('User name must be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('User name must be between 3 and 20 characters'),

  body('oldPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/)
    .withMessage('Password must contain at least one number and one special character'),

  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/)
    .withMessage('Password must contain at least one number and one special character'),
];

middleware.verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = middleware;
  