const multer = require("multer");

const middleware = {};

middleware.uploadImage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 100000) + "_" + Date.now() + "_" + file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
      { name: "cruise_image", maxCount: 1 },
      { name: "sales_banner_image", maxCount: 1 },
      { name: "cruise_banner_image", maxCount: 1 },
      { name: "mobile_cruise_banner_image", maxCount: 1 },
      { name: "tour_list[]"},
      // { name: "whats_included[]"},
      // {name : "summary[]"} 
  ]);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error in File Upload", data: "", success: false, status: 400 });
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
        Math.floor(Math.random() * 100000) + "_" + Date.now() + "_" + file.originalname
      );
    },
  });

  const upload = multer({ storage: storage }).fields([
    { name: "cruise_image", maxCount: 1 },
    { name: "sales_banner_image", maxCount: 1 },
    { name: "cruise_banner_image", maxCount: 1 },
    { name: "mobile_cruise_banner_image", maxCount: 1 },
  ]);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error in File Upload", data: "", success: false, status: 400 });
    }
    next();
  });
};

module.exports = middleware;
