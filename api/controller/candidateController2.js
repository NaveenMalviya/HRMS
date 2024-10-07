const Candidate = require("../models/candidateModel.js");
const status = require("../config/status");

exports.createCandidate = async (req, res) => {
    try {
        let candidateExists = await Candidate.findOne({ candidate_email: req.body.candidate_email }).lean().exec();
        if (candidateExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Employee already registered.' });
        }

        var obj = {
            candidate_first_name: req.body.candidate_first_name,
            candidate_last_name: req.body.candidate_last_name,
            candidate_mobile: req.body.candidate_mobile,
            candidate_alternate_mobile: req.body.candidate_alternate_mobile,
            candidate_email: req.body.candidate_email,
            candidate_skype: req.body.candidate_skype,
            candidate_profile: req.body.candidate_profile,
            candidate_skills: req.body.candidate_skills,
            candidate_experience: req.body.candidate_experience,
            candidate_expected_salary: req.body.candidate_expected_salary,
            candidate_expected_joining_date: req.body.candidate_expected_joining_date,
            candidate_marrital_status: req.body.candidate_marrital_status,
            candidate_feedback: req.body.candidate_feedback,
            interview_rounds:req.body.interview_rounds,
            candidate_selection_status:req.body.candidate_selection_status,
            source_of_candidate:req.body.source_of_candidate,
            candidate_address:req.body.candidate_address,
            candidate_document_proof:req.body.candidate_document_proof,
            tenth_percentage:req.body.tenth_percentage,
            twelfth_percentage:req.body.twelfth_percentage,
            graduationPercentage:req.body.graduationPercentage,
            postGraduationPercentage:req.body.postGraduationPercentage,
            profile:req.body.profile,
            // candidate_joining_immediate: req.body.candidate_joining_immediate,
            // candidate_written_round: req.body.candidate_written_round,
            // candidate_machine_round: req.body.candidate_machine_round,
            // candidate_technical_interview_round: req.body.candidate_technical_interview_round,
            // candidate_hr_interview_round: req.body.candidate_hr_interview_round,
            // candidate_selection_status: req.body.candidate_selection_status,
            // candidate_from_consultancy: req.body.candidate_from_consultancy,
           
        };

        const newCandidate = new Candidate(obj);
        await newCandidate.save();
        res.json({ success: true, status: status.OK, msg: 'New candidate added successfully.' });

    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Candidate failed.' });
    }
}

exports.getCandidates = async (req, res) => {
    try {
        const data = await Candidate.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log(`getting this error ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Candidates failed.' });
    }
}

exports.updateCandidate = async (req, res) => {
    const id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }

    try {
        let result = await Candidate.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    candidate_first_name: req.body.candidate_first_name,
                    candidate_last_name: req.body.candidate_last_name,
                    candidate_mobile: req.body.candidate_mobile,
                    candidate_alternate_mobile: req.body.candidate_alternate_mobile,
                    candidate_email: req.body.candidate_email,
                    candidate_skype: req.body.candidate_skype,
                    candidate_linkedIn_profile: req.body.candidate_linkedIn_profile,
                    candidate_skills: req.body.candidate_skills,
                    candidate_experience: req.body.candidate_experience,
                    candidate_expected_salary: req.body.candidate_expected_salary,
                    candidate_expected_joining_date: req.body.candidate_expected_joining_date,
                    candidate_marrital_status: req.body.candidate_marrital_status,
                    interview_rounds: req.body.interview_rounds,
                    candidate_selection_status: req.body.candidate_selection_status,
                    candidate_feedback: req.body.candidate_feedback,
                    source_of_candidate: req.body.source_of_candidate,
                    candidate_address: req.body.candidate_address,
                    candidate_document_proof: req.body.candidate_document_proof,
                    tenth_percentage: req.body.tenth_percentage,
                    twelfth_percentage: req.body.twelfth_percentage,
                    graduationPercentage: req.body.graduationPercentage,
                    postGraduationPercentage: req.body.postGraduationPercentage,
                    profile: req.body.profile,
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Candidate updated successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Candidate Id not found' });
        }
    } catch (err) {
        console.log(err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Candidate failed.' });
    }
}

exports.getCandidateId = async (req, res) => {
    try {
        let candidateId = req.query.id;
        if (candidateId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await Candidate.findOne({ _id: candidateId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get candidate failed.' });
    }
}

exports.deleteCandidate = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await Candidate.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Candidate deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Candidate Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Candidate data failed.' });
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
              { candidate_first_name: { $regex: new RegExp(query, "i") } },
              { candidate_last_name: { $regex: new RegExp(query, "i") } },
              { candidate_email: { $regex: new RegExp(query, "i") } },
              { candidate_mobile: { $regex: new RegExp(query, "i") } },
              { candidate_address: { $regex: new RegExp(query, "i") } },
              { candidate_city: { $regex: new RegExp(query, "i") } },
              { candidate_state: { $regex: new RegExp(query, "i") } },
              { candidate_skills: { $regex: new RegExp(query, "i") } },
              { candidate_experience: { $regex: new RegExp(query, "i") } },
              { candidate_id: { $regex: new RegExp(query, "i") } }
            ]
          };

        if (query.includes(' ')) {
            const [firstName, lastName] = query.split(' ');

            searchQuery.$or.push({
                $and: [
                    { candidate_first_name: { $regex: new RegExp(firstName, "i") } },
                    { candidate_last_name: { $regex: new RegExp(lastName, "i") } }
                ]
            });
        }

        const results = await Candidate.find(searchQuery).lean().exec();
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

        const result = await Candidate.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, message: 'Candidates deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, message: 'No candidates found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, message: error.message });
    }
};
