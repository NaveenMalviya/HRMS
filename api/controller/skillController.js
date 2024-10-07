const Skills = require('../models/skillModel'); // Assuming this is the model path
const status = require('../config/status');

// Create Skill
exports.createSkill = async (req, res) => {
    try {
        const skillData = {
            skills: req.body.skills,
            profile: req.body.profile,
            description: req.body.description,
            profile_id: req.body.profile_id
        };

        const newSkill = new Skills(skillData);
        let result = await newSkill.save();
        res.json({ success: true, status: status.OK, msg: 'Skill created successfully.' });
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Skill creation failed.' });
    }
};

// Get All Skills
exports.getSkills = async (req, res) => {
    try {
        const data = await Skills.find().lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get skills failed.' });
    }
};

// Update Skill
exports.updateSkill = async (req, res) => {
    const id = req.body._id;
    if (!id) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    try {
        let result = await Skills.findOneAndUpdate(
            { _id: id },
            { $set: req.body }
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Skill updated successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Skill Id not found' });
        }
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update skill failed.' });
    }
};

// Get Skill By ID
exports.getSkillById = async (req, res) => {
    try {
        const skillId = req.query.id;
        if (!skillId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await Skills.findOne({ _id: skillId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get skill failed.' });
    }
};

// Delete Skill
exports.deleteSkill = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await Skills.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Skill deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Skill Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete skill failed.' });
    }
};

// Multi Delete
exports.multiDelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: "IDs parameter not available or invalid" });
        }

        const result = await Skills.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'Skills deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'No skills found with the given IDs.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.searchSkill = async (req, res) => {
    try {
        const query = req.query.search;

        // If no query is provided, return an error
        if (!query) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, message: 'No search query provided' });
        }

        // Construct the search query using regex for partial matching
        const searchQuery = {
            $or: [
                { skills: { $regex: new RegExp(query, "i") } },
                { profile: { $regex: new RegExp(query, "i") } },
                { description: { $regex: new RegExp(query, "i") } },
                { profile_id: { $regex: new RegExp(query, "i") } }
            ]
        };

        // Execute the search query
        const results = await Skills.find(searchQuery).lean().exec();

        // Return the results
        res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);

        // Return an error if something goes wrong
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
    }
};
