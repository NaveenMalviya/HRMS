const Employee = require("../models/employeeModel");
const status = require("../config/status");

exports.signup = async (req, res) => {
    try {
        let employeeExists = await Employee.findOne({ employee_email: req.body.employee_email }).lean().exec();
        if (employeeExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Employee already registered.' });
        }

        const obj = {
            employee_code: req.body.employee_code,
            employee_first_name: req.body.employee_first_name,
            employee_last_name: req.body.employee_last_name,
            employee_mobile: req.body.employee_mobile,
            employee_alternate_mobile: req.body.employee_alternate_mobile,
            employee_email: req.body.employee_email,
            employee_password: req.body.employee_password,
            employee_address: req.body.employee_address,
            employee_city: req.body.employee_city,
            employee_state: req.body.employee_state,
            employee_other_info: req.body.employee_other_info,
            employee_dob: req.body.employee_dob,
            employee_doj: req.body.employee_doj,
            employee_skills: req.body.employee_skills,
            employee_experience: req.body.employee_experience,
            employee_resume: req.body.employee_resume,
            employee_id_proof: req.body.employee_id_proof,
            employee_pan_card: req.body.employee_pan_card,
            employee_marksheet: req.body.employee_marksheet,
            employee_experience_letter: req.body.employee_experience_letter,
            employee_permanant_address_proof: req.body.employee_permanant_address_proof,
            employee_local_address_proof: req.body.employee_local_address_proof,
            employee_reference_one_name: req.body.employee_reference_one_name,
            employee_reference_one_mobile: req.body.employee_reference_one_mobile,
            employee_reference_two_name: req.body.employee_reference_two_name,
            employee_reference_two_mobile: req.body.employee_reference_two_mobile,
            image: req.body.image
        };

        const newEmployee = new Employee(obj);
        await newEmployee.save();
        res.json({ success: true, status: status.OK, msg: 'New employee added successfully.' });

    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Employee failed.' });
    }
}

exports.getEmployees = async (req, res) => {
    try {
        const data = await Employee.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log(`getting this error ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Employees failed.' });
    }
}

exports.updateEmployee = async (req, res) => {
    const id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }

    try {
        let result = await Employee.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    employee_code: req.body.employee_code,
                    employee_first_name: req.body.employee_first_name,
                    employee_last_name: req.body.employee_last_name,
                    employee_mobile: req.body.employee_mobile,
                    employee_alternate_mobile: req.body.employee_alternate_mobile,
                    employee_email: req.body.employee_email,
                    employee_password: req.body.employee_password,
                    employee_address: req.body.employee_address,
                    employee_city: req.body.employee_city,
                    employee_state: req.body.employee_state,
                    employee_other_info: req.body.employee_other_info,
                    employee_dob: req.body.employee_dob,
                    employee_doj: req.body.employee_doj,
                    employee_skills: req.body.employee_skills,
                    employee_experience: req.body.employee_experience,
                    employee_resume: req.body.employee_resume,
                    employee_id_proof: req.body.employee_id_proof,
                    employee_pan_card: req.body.employee_pan_card,
                    employee_marksheet: req.body.employee_marksheet,
                    employee_experience_letter: req.body.employee_experience_letter,
                    employee_permanant_address_proof: req.body.employee_permanant_address_proof,
                    employee_local_address_proof: req.body.employee_local_address_proof,
                    employee_reference_one_name: req.body.employee_reference_one_name,
                    employee_reference_one_mobile: req.body.employee_reference_one_mobile,
                    employee_reference_two_name: req.body.employee_reference_two_name,
                    employee_reference_two_mobile: req.body.employee_reference_two_mobile,
                    image: req.body.image,
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Employee updated successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Employee Id not found' });
        }
    } catch (err) {
        console.log(err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Employee failed.' });
    }
}

exports.getEmployeeById = async (req, res) => {
    try {
        let employeeId = req.query.id;
        if (employeeId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await Employee.findOne({ _id: employeeId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get employee failed.' });
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await Employee.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Employee deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Employee Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Employee data failed.' });
    }
}

exports.search = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        const searchTerms = query.split(',').map(term => term.trim());

        const searchQuery = {
            $or: [
                { employee_first_name: { $regex: new RegExp(query, "i") } },
                { employee_last_name: { $regex: new RegExp(query, "i") } },
                { employee_email: { $regex: new RegExp(query, "i") } },
                { employee_address: { $regex: new RegExp(query, "i") } },
                { employee_city: { $regex: new RegExp(query, "i") } },
                { employee_state: { $regex: new RegExp(query, "i") } },
                { employee_skills: { $in: searchTerms } },
            ]
        };

        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');

            searchQuery.$or.push({
                $and: [
                    { employee_first_name: { $regex: new RegExp(firstName, "i") } },
                    { employee_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }

        const results = await Employee.find(searchQuery).lean().exec();
        res.json({ success: true, data: results });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};

exports.multidelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, message: "IDs parameter not available or invalid" });
        }

        const result = await Employee.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, message: 'Employees deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, message: 'No employees found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, message: error.message });
    }
};

exports.getBirthday = async (req, res) => {
    try {
        const data = await Employee.find({}).select("id employee_first_name employee_last_name employee_dob").lean().exec();
        return res.json({ data: data, success: true, status: status.OK, msg: 'Get Birthday Successfully.' });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Birthday failed.' });

    }
}