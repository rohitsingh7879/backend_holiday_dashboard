const express = require("express");
const router = express.Router();
const contactController = require("../Http/Controller/contactUs/contactUs");
const operatorControlller = require("../Http/Controller/operator/operator");
const newPackageController = require("../Http/Controller/newPackages/newPackages");
const middleware = require("../Http/Middleware");
const enquiryController = require("../Http/Controller/enquiry/enquiry");
const newBannerController = require("../Http/Controller/newBanner/newBanner");
const categoryController = require("../Http/Controller/category/category");
const FAQController = require("../Http/Controller/faq/faq");
const subscriberController = require("../Http/Controller/subscribe/subscribe");
const staticContentController = require("../Http/Controller/staticContent/staticContent");
const {
  fileUpload,
  getFilesAndContent,
} = require("../Http/Controller/fileUpload/fileUpload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// add New Packages cruises
router.post(
  "/newpackage/",
  middleware.uploadImage,
  newPackageController.newpackageSave
);
router.get("/newpackage/", newPackageController.newpackageGet);
router.patch(
  "/newpackage/:id",
  middleware.uploadImageUpdate,
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
router.delete("/newCategory/:id", categoryController.categoryDelete);

//FAQ
router.post("/add-newfaq/", middleware.uploadFAQImage, FAQController.FAQSave);
router.get("/faq/get-faq/", FAQController.FAQGet);
router.put("/faq/update-status/:id", FAQController.updateStatus);
router.put(
  "/faq/update/:id",
  middleware.uploadFAQImage,
  FAQController.updateFAQ
);
router.get("/faq/get-faq/:id", FAQController.FAQGetSingle);

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

module.exports = router;
