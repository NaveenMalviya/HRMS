const profileController = require("../controller/profileController");
const express = require("express");
const router = express.Router();

router.route('/createprofile').post(profileController.createProfile);

router.route('/getprofiles').get(profileController.getProfiles);
router.route('/updateprofile').put(profileController.updateProfile);
router.route('/getprofilebyid').get(profileController.getProfileById);
router.route('/deleteprofile').delete(profileController.deleteProfile);
router.route('/multidelete').delete(profileController.multiDelete);  // Multi-delete route added

router.route('/searchprofile').get(profileController.searchProfile);

module.exports = router;
