const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
  candidate_id: { type: String, required: true, unique: true },
  candidate_first_name: { type: String, required: true },
  candidate_last_name: { type: String, required: true },
  candidate_mobile: { type: String, required: true },
  candidate_alternate_mobile: { type: String },
  candidate_email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value != null && value.trim() !== '';
      },
      message: 'Email cannot be empty',
    }
  },
  candidate_skype: { type: String },
  candidate_linkedIn_profile: { type: String },
  candidate_skills: { type: [String], required: true },
  candidate_experience: { type: Number, required: true },
  candidate_expected_salary: { type: Number, required: true },
  candidate_expected_joining_date: { type: Date },
  candidate_marrital_status: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
  interview_rounds: { type: Number, default: 0 },
  candidate_selection_status: { type: String, enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected'], default: 'Applied' },
  candidate_feedback: { type: String },
  source_of_candidate: { type: String },
  candidate_address: { type: String },
  candidate_document_proof: { type: String },
  tenth_percentage: { type: Number, min: 0, max: 100 },
  twelfth_percentage: { type: Number, min: 0, max: 100 },
  graduationPercentage: { type: Number, min: 0, max: 100 },
  postGraduationPercentage: { type: Number, min: 0, max: 100 },
  profile: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const candidateData = mongoose.model('candidate', candidateSchema);
module.exports = candidateData;