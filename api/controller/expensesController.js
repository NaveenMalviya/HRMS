const Expenses = require("../models/expensesModel");
const status = require("../config/status");

// Add a new expense
exports.addExpense = async (req, res) => {
    try {
        // Check if an expense with the same transaction_id already exists
        let expenseExists = await Expenses.findOne({ transaction_id: req.body.transaction_id }).lean().exec();
        if (expenseExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Expense with this transaction ID already exists.' });
        }

        const obj = {
            expenses_purpose: req.body.expenses_purpose,
            expenses_bill: req.body.expenses_bill,
            expenses_amount: req.body.expenses_amount,
            expenses_voucher: req.body.expenses_voucher,
            expenses_remark: req.body.expenses_remark,
            expenses_by_cash: req.body.expenses_by_cash,
            expenses_by_cheque: req.body.expenses_by_cheque,
            expenses_cash_recieved_by: req.body.expenses_cash_recieved_by,
            date_of_expenses: req.body.date_of_expenses,
            transaction_id: req.body.transaction_id
        };

        // Save the new expense
        const newExpense = new Expenses(obj);
        await newExpense.save();
        res.json({ success: true, status: status.OK, msg: 'New expense added successfully.' });

    } catch (err) {
        console.error("Error in adding expense:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save expense failed.' });
    }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const data = await Expenses.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error(`Error in getting expenses: ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get expenses failed.' });
    }
};

// Update an existing expense by ID
exports.updateExpense = async (req, res) => {
    const id = req.body._id;
    if (!id) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
    }

    try {
        let result = await Expenses.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    expenses_purpose: req.body.expenses_purpose,
                    expenses_bill: req.body.expenses_bill,
                    expenses_amount: req.body.expenses_amount,
                    expenses_voucher: req.body.expenses_voucher,
                    expenses_remark: req.body.expenses_remark,
                    expenses_by_cash: req.body.expenses_by_cash,
                    expenses_by_cheque: req.body.expenses_by_cheque,
                    expenses_cash_recieved_by: req.body.expenses_cash_recieved_by,
                    date_of_expenses: req.body.date_of_expenses,
                    transaction_id: req.body.transaction_id
                }
            },
            { new: true } // return the updated document
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Expense updated successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Expense ID not found' });
        }
    } catch (err) {
        console.error("Error in updating expense:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update expense failed.' });
    }
};

// Get expense by ID
exports.getExpenseById = async (req, res) => {
    try {
        const expenseId = req.query.id;
        if (!expenseId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        const data = await Expenses.findOne({ _id: expenseId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error("Error in getting expense by ID:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get expense failed.' });
    }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        let result = await Expenses.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Expense deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Expense ID not found' });
        }
    } catch (err) {
        console.error("Error in deleting expense:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete expense failed.' });
    }
};

// Search expenses by query
exports.searchExpenses = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ success: false, msg: 'No search query provided' });
        }

        // Define the search logic
        const searchQuery = {
            $or: [
                { expenses_purpose: { $regex: new RegExp(query, "i") } },
                { expenses_remark: { $regex: new RegExp(query, "i") } },
                { expenses_by_cash: { $regex: new RegExp(query, "i") } },
                { expenses_by_cheque: { $regex: new RegExp(query, "i") } },
                { transaction_id: { $regex: new RegExp(query, "i") } }
            ]
        };

        const results = await Expenses.find(searchQuery).lean().exec();
        res.json({ success: true, data: results });
    } catch (err) {
        console.error("Error in searching expenses:", err);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Multi-delete expenses by array of IDs
exports.multideleteExpenses = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, message: "IDs parameter not available or invalid" });
        }

        const result = await Expenses.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, message: 'Expenses deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, message: 'No expenses found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, message: error.message });
    }
};



exports.multidelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, message: "IDs parameter not available or invalid" });
        }

        const result = await Expenses.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, message: 'Expenses deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, message: 'No Expenses found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, message: error.message });
    }
};
























































































// const Expenses = require("../models/expensesModel");
// const status = require("../config/status");

// // Add a new expense
// exports.addExpense = async (req, res) => {
//     try {
//         const newExpense = new Expenses(req.body);
//         let result = await newExpense.save();
//         res.json({ success: true, status: status.OK, msg: 'Expense added successfully.', data: result });
//     } catch (err) {
//         console.error("Error in adding expense:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Add expense failed.' });
//     }
// };

// // Get all expenses
// exports.getExpenses = async (req, res) => {
//     try {
//         const data = await Expenses.find({}).lean().exec();
//         return res.json({ data: data, success: true, status: status.OK });
//     } catch (err) {
//         console.error(`Error in getting expenses: ${err}`);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get expenses failed.' });
//     }
// };

// // Get expense by ID
// exports.getExpenseById = async (req, res) => {
//     try {
//         let expenseId = req.query.id;
//         if (!expenseId) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'ID Parameter Not Available' });
//         }
//         const data = await Expenses.findOne({ _id: expenseId }).lean().exec();
//         return res.json({ data: data, success: true, status: status.OK });
//     } catch (err) {
//         console.error("Error in getting expense by ID:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get expense failed.' });
//     }
// };

// // Update expense
// exports.updateExpense = async (req, res) => {
//     var id = req.body._id;
//     if (!id) {
//         return res.json({ success: false, status: status.NOTFOUND, msg: 'ID Parameter Not Available' });
//     }
//     try {
//         let result = await Expenses.findOneAndUpdate(
//             { _id: id },
//             { $set: req.body },
//             { new: true }  // return the updated document
//         ).lean().exec();

//         if (result) {
//             res.json({ success: true, status: status.OK, msg: 'Expense updated successfully.', data: result });
//         } else {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Expense ID not found' });
//         }
//     } catch (err) {
//         console.error("Error in updating expense:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update expense failed.' });
//     }
// };

// // Delete expense by ID
// exports.deleteExpense = async (req, res) => {
//     try {
//         const ID = req.query.id;
//         if (!ID) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'ID Parameter Not Available' });
//         }
//         let result = await Expenses.findOneAndDelete({ _id: ID }).lean().exec();
//         if (result) {
//             res.json({ success: true, status: status.OK, msg: 'Expense deleted successfully.' });
//         } else {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Expense ID not found' });
//         }
//     } catch (err) {
//         console.error("Error in deleting expense:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete expense failed.' });
//     }
// };

// // Search expenses
// exports.searchExpenses = async (req, res) => {
//     try {
//         const query = req.query.search;
//         if (!query) {
//             return res.status(400).json({ success: false, msg: 'No search query provided' });
//         }

//         const searchQuery = {
//             $or: [
//                 { expenses_purpose: { $regex: new RegExp(query, "i") } },
//                 { expenses_remark: { $regex: new RegExp(query, "i") } },
//                 { expenses_by_cash: { $regex: new RegExp(query, "i") } },
//                 { expenses_by_cheque: { $regex: new RegExp(query, "i") } },
//                 { transaction_id: { $regex: new RegExp(query, "i") } }
//             ]
//         };

//         const results = await Expenses.find(searchQuery).lean().exec();
//         res.json({ success: true, data: results });
//     } catch (err) {
//         console.error("Error in search expenses:", err);
//         return res.status(500).json({ success: false, msg: 'Internal Server Error' });
//     }
// };
