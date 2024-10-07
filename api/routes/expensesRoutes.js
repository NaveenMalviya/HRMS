const express = require("express");
const router = express.Router();
const expensesController = require("../controller/expensesController");

router.route('/add').post(expensesController.addExpense);
router.route('/list').get(expensesController.getExpenses);
router.route('/getById').get(expensesController.getExpenseById);
router.route('/update').put(expensesController.updateExpense);
router.route('/delete').delete(expensesController.deleteExpense);
router.route('/search').get(expensesController.searchExpenses);
router.route('/multidelete').delete(expensesController.multidelete);
module.exports = router;
