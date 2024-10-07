const consultancyController = require("../controller/consultancyController");
const express = require("express");
const router = express.Router();

router.route('/createconsultancy').post(consultancyController.createConsultancy);

router.route('/getconsultancy').get(consultancyController.getConsultancy);
router.route("/updateconsultancy").put(consultancyController.updateConsultancy);
router.route('/getconsultancybyid').get(consultancyController.getConsultancyById);
router.route('/deleteconsultancy').delete(consultancyController.deleteConsultancy);

router.route('/multidelete').delete(consultancyController.multiDelete);

router.route('/searchconsultancy').get(consultancyController.searchConsultancy);
module.exports = router;