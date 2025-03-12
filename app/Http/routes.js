const express = require("express");
const router = express.Router();
const contactController = require("../Http/Controller/contactUs/contactUs")
const operatorControlller = require("../Http/Controller/operator/operator")
const newPackageController = require("../Http/Controller/newPackages/newPackages")
const middleware = require("../Http/Middleware")
const enquiryController = require("../Http/Controller/enquiry/enquiry")
const newBannerController = require("../Http/Controller/newBanner/newBanner")


// add New Packages cruises
router.post('/newpackage/',middleware.uploadImage,newPackageController.newpackageSave)
router.get('/newpackage/',newPackageController.newpackageGet)
router.patch('/newpackage/:id',middleware.uploadImageUpdate ,newPackageController.newpackageUpdate)
router.get('/newpackage/searchFilter', newPackageController.newpackageSearchFilter)
router.patch('/newpackage/pickCruiseCollection/:id',newPackageController.newpackagePickCruiseCollection)
// operator
router.post('/operator/',operatorControlller.operatorSave)
router.get('/operator/',operatorControlller.operatorGet)
// contact
router.post('/contact/',contactController.contactSave)
router.get('/contact/',contactController.contactGet)
// enquiry
router.post('/enquiry/',enquiryController.enquirySave)
router.get('/enquiry/',enquiryController.enquiryGet)
// banner
router.post('/newBanner/',middleware.uploadBannerImage,newBannerController.newBannerSave)
router.get('/newBanner/',newBannerController.newBannerGet)
router.patch('/newBanner/:id',middleware.uploadBannerImage, newBannerController.newBannerUpdate)
router.delete('/newBanner/:id',newBannerController.newBannerDelete);



module.exports = router;
