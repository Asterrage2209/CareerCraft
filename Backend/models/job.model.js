const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobTitle: String,
  company: String,
  location: String,
  source: String, 
  matchScore: { type: Number },
  applied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const jobModel = mongoose.model("Job", JobSchema); 
module.exports = jobModel;