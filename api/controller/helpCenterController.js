const HelpCenter = require("../models/helpCenterModel");
const status = require("../config/status");

// Create a new help center ticket
exports.createTicket = async (req, res) => {
    try {
        // Check if a ticket with the same ID already exists
        let ticketExists = await HelpCenter.findOne({ helpcenter_ticket_id: req.body.helpcenter_ticket_id }).lean().exec();
        if (ticketExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Ticket with this ID already exists.' });
        }

        const ticketData = {
            helpcenter_ticket_id: req.body.helpcenter_ticket_id,
            helpcenter_employee_id: req.body.helpcenter_employee_id,
            helpcenter_employee_code: req.body.helpcenter_employee_code,
            helpcenter_ticket_description: req.body.helpcenter_ticket_description,
            helpcenter_ticket_priority: req.body.helpcenter_ticket_priority,
            helpcenter_ticket_department: req.body.helpcenter_ticket_department,
            helpcenter_ticket_status: req.body.helpcenter_ticket_status,
            helpcenter_ticket_solved_by: req.body.helpcenter_ticket_solved_by,
            helpcenter_ticket_managed_by: req.body.helpcenter_ticket_managed_by,
            helpcenter_solve_duration: req.body.helpcenter_solve_duration
        };

        const newTicket = new HelpCenter(ticketData);
        await newTicket.save();
        res.json({ success: true, status: status.OK, msg: 'Ticket created successfully.' });

    } catch (err) {
        console.error("Error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Ticket creation failed.' });
    }
};

// Get all help center tickets
exports.getTickets = async (req, res) => {
    try {
        const data = await HelpCenter.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get tickets failed.' });
    }
};

// Update a help center ticket by ID
exports.updateTicket = async (req, res) => {
    const id = req.body._id;
    if (!id) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
    }

    try {
        let result = await HelpCenter.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true } // Return the updated document
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Ticket updated successfully.', data: result });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ticket ID not found' });
        }
    } catch (err) {
        console.error("Error in updating ticket:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update ticket failed.' });
    }
};

// Get a help center ticket by ID
exports.getTicketById = async (req, res) => {
    try {
        const ticketId = req.query.id;
        if (!ticketId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        const data = await HelpCenter.findOne({ _id: ticketId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error("Error in getting ticket by ID:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get ticket failed.' });
    }
};

// Delete a help center ticket by ID
exports.deleteTicket = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        let result = await HelpCenter.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Ticket deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ticket ID not found' });
        }
    } catch (err) {
        console.error("Error in deleting ticket:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete ticket failed.' });
    }
};

// Multi-delete help center tickets by array of IDs
exports.multiDelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'IDs parameter not available or invalid' });
        }

        const result = await HelpCenter.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, msg: 'Tickets deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, msg: 'No tickets found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: error.message });
    }
};

// Search help center tickets by query
exports.searchHelpCenter = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'No search query provided' });
        }

        const searchQuery = {
            $or: [
                { helpcenter_ticket_id: { $regex: new RegExp(query, "i") } },
                { helpcenter_employee_id: { $regex: new RegExp(query, "i") } },
                { helpcenter_employee_code: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_description: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_priority: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_department: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_status: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_solved_by: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_managed_by: { $regex: new RegExp(query, "i") } }
            ]
        };

        const results = await HelpCenter.find(searchQuery).lean().exec();
        res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Internal Server Error' });
    }
};
