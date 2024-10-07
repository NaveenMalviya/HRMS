const employeeController = require("../controller/employeeController");
const express = require("express");
const router = express.Router();

router.route('/signup').post(employeeController.signup);
router.route('/list').get(employeeController.getEmployees);
router.route('/update').put(employeeController.updateEmployee);
router.route('/getEmployeeById').get(employeeController.getEmployeeById);
router.route('/delete').delete(employeeController.deleteEmployee);
router.route('/search').get(employeeController.search);
router.route('/multidelete').delete(employeeController.multidelete);
router.route('/get-dob').get(employeeController.getBirthday)

module.exports = router;
