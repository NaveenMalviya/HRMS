const profileModel = require('../models/profileModel');
const status = require('../config/status');

// Create Profile
exports.createProfile = async (req, res) => {
    try {
        const profileData = {
            profile: req.body.profile,
            profile_id: req.body.profile_id,
        };

        const newProfile = new profileModel(profileData);
        const result = await newProfile.save();
        res.json({ success: true, status: status.OK, msg: 'Profile created successfully.', data: result });
    } catch (err) {
        console.error("Error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Profile creation failed.' });
    }
};

// Get All Profiles
exports.getProfiles = async (req, res) => {
    try {
        const data = await profileModel.find().lean().exec();
        return res.json({ success: true, status: status.OK, data: data });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get profiles failed.' });
    }
};

// Get Profile By ID
exports.getProfileById = async (req, res) => {
    try {
        let profileId = req.query.id;
        if (!profileId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile ID parameter not available' });
        }
        const data = await profileModel.findOne({ _id: profileId }).lean().exec();
        if (!data) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile not found' });
        }
        return res.json({ success: true, status: status.OK, data: data });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get profile failed.' });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    const id = req.body.profile_id;
    if (!id) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile ID parameter not available' });
    }
    try {
        const result = await profileModel.findOneAndUpdate(
            { profile_id: id },
            { $set: req.body },
            { new: true }
        ).lean().exec();
        if (!result) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile not found' });
        }
        res.json({ success: true, status: status.OK, msg: 'Profile updated successfully.', data: result });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Profile update failed.' });
    }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
    try {
        const profileId = req.query.id;
        if (!profileId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile ID parameter not available' });
        }
        const result = await profileModel.findOneAndDelete({ _id: profileId }).lean().exec();
        if (!result) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile not found' });
        }
        res.json({ success: true, status: status.OK, msg: 'Profile deleted successfully.' });
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete profile failed.' });
    }
};

// Search Profile
exports.searchProfile = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, message: 'No search query provided' });
        }

        const searchQuery = {
            $or: [
                { profile: { $regex: new RegExp(query, "i") } },
                { profile_id: { $regex: new RegExp(query, "i") } }
            ]
        };

        const results = await profileModel.find(searchQuery).lean().exec();
        return res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
    }
};

// Multi Delete
exports.multiDelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: "IDs parameter not available or invalid" });
        }

        const result = await profileModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'Profiles deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'No profiles found with the given IDs.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
