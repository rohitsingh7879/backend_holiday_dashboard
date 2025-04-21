const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const contactController = require("../Http/Controller/contactUs/contactUs");
const operatorControlller = require("../Http/Controller/operator/operator");
const newPackageController = require("../Http/Controller/newPackages/newPackages");
const middleware = require("../Http/Middleware");
const enquiryController = require("../Http/Controller/enquiry/enquiry");
const newBannerController = require("../Http/Controller/newBanner/newBanner");
const categoryController = require("../Http/Controller/category/category");
const subCategoryController = require("../Http/Controller/subCategory/subCategory");

const FAQController = require("../Http/Controller/faq/faq");
const NewFAQController = require("../Http/Controller/faq/newFAQ");

const subscriberController = require("../Http/Controller/subscribe/subscribe");
const staticContentController = require("../Http/Controller/staticContent/staticContent");
const {
  fileUpload,
  getFilesAndContent,
} = require("../Http/Controller/fileUpload/fileUpload");

const multer = require("multer");
const {
  register,
  login,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("./Controller/admin/adminController");
const {
  getAllMembers,
  addSubscriber,
} = require("./Controller/mailChimp/mailChimpController");
const {
  validateCruiseImages,
  cruiseValidator,
  validateResult,
} = require("../validators/CruiseValidator");
const upload = multer({ dest: "uploads/" });
// add New Packages cruises
router.post(
  "/newpackage/",
  middleware.uploadImage,
  cruiseValidator,
  validateResult,
  validateCruiseImages,
  newPackageController.newpackageSave
);
router.get("/newpackage/", newPackageController.newpackageGet);
router.delete("/newpackage/:id", newPackageController.newpackageDelete);
router.patch(
  "/newpackage/:id",
  middleware.uploadImageUpdate,
  cruiseValidator,
  validateResult,
  validateCruiseImages,
  newPackageController.newpackageUpdate
);
router.get(
  "/newpackage/searchFilter",
  newPackageController.newpackageSearchFilter
);
router.patch(
  "/newpackage/pickCruiseCollection/:id",
  newPackageController.newpackagePickCruiseCollection
);
// operator
router.post("/operator/", operatorControlller.operatorSave);
router.get("/operator/", operatorControlller.operatorGet);
// contact
router.post("/contact/", contactController.contactSave);
router.get("/contact/", contactController.contactGet);
// enquiry
router.post("/enquiry/", enquiryController.enquirySave);
router.get("/enquiry/", enquiryController.enquiryGet);
// banner
router.post(
  "/newBanner/",
  middleware.uploadBannerImage,
  newBannerController.newBannerSave
);
router.get("/newBanner/", newBannerController.newBannerGet);
router.patch(
  "/newBanner/:id",
  middleware.uploadBannerImage,
  newBannerController.newBannerUpdate
);
router.delete("/newBanner/:id", newBannerController.newBannerDelete);

// add category
router.post(
  "/newCategory/",
  middleware.uploadCategoryImage,
  categoryController.categorySave
);

router.get("/newCategory/", categoryController.categoryGet);

router.patch(
  "/newCategory/:id",
  middleware.uploadCategoryImage,
  categoryController.categoryUpdate
);

router.put(
  "/newCategory/status-home/:id",
  categoryController.categoryShowOnHome
);

router.delete("/newCategory/:id", categoryController.categoryDelete);

// sub category
router.post(
  "/sub-category/add-new",
  middleware.verifyToken,
  middleware.uploadSubCategoryImage,
  subCategoryController.subCategorySave
);

router.get(
  "/sub-category/get-all",
  middleware.verifyToken,
  subCategoryController.subCategoryGet
);

router.get(
  "/sub-category/get-all-by-category/:categoryId",
  // middleware.verifyToken,
  subCategoryController.subCategoryGetByCatId
);

router.put(
  "/sub-category/update-subcategory/:id",
  middleware.verifyToken,
  middleware.uploadSubCategoryImage,
  subCategoryController.subCategoryUpdate
);

router.delete(
  "/sub-category/delete-subcategory/:id",
  middleware.verifyToken,
  subCategoryController.subCategoryDelete
);

//FAQ
router.post("/add-newfaq/", middleware.uploadFAQImage, FAQController.FAQSave);
router.get("/faq/get-faq/", FAQController.FAQGet);
router.put("/faq/update-status/:id", FAQController.updateStatus);
router.get("/faq/get-faq/:id", FAQController.FAQGetSingle);
router.put(
  "/faq/update/:id",
  middleware.uploadFAQImage,
  FAQController.updateFAQ
);

//NewFAQ
router.get("/new-faq/get-faq/:id", NewFAQController.FAQGetSingle);
router.get("/new-faq/get-faq", NewFAQController.FAQGet);
router.post("/new-faq/add-faq/", NewFAQController.FAQSave);
router.put("/new-faq/update-status/:id", NewFAQController.updateStatus);
router.put("/new-faq/update-faq/:id", NewFAQController.updateFAQ);
router.delete("/new-faq/delete-faq/:id", NewFAQController.FAQDelete);

// Subscriber
router.post("/subscriber/add-new", subscriberController.subscribeSave);
router.post(
  "/subscriber/add-new-with-email",
  subscriberController.subscribeWithEmailSave
);
router.get("/subscriber/get-all", subscriberController.subscribeGet);
router.get(
  "/subscriber/get-all-email",
  subscriberController.subscribeWithEmailGet
);

router.get("/subscriber/get-all-members", getAllMembers);
router.post("/subscriber/add-member", addSubscriber);

//static Content
router.post(
  "/static-content/add-new",
  staticContentController?.staticContentSave
);
router.put(
  "/static-content/update",
  staticContentController?.staticContentUpdate
);
router.get(
  "/static-content/get-all",
  staticContentController?.staticContentGet
);

//file upload
router.post("/files/upload-images", middleware.uploadMultipleFiles, fileUpload);
router.get("/files/get-images-data", getFilesAndContent);

//Admin
router.post("/admin/add-new", middleware.validateRegisterInput, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  register(req, res);
});

router.post("/admin/login", middleware.validateRegisterInput, login);
router.put(
  "/admin/update-password",
  middleware.verifyToken,
  middleware.validateUpdatePassword,
  updatePassword
);
router.post("/admin/forget-password", forgotPassword);
router.put("/admin/reset-password", resetPassword);

module.exports = router;
