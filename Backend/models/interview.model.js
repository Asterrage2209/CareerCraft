const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionDate: { type: Date, default: Date.now },
  questions: [String],
  transcript: String,
  sentimentScore: { type: Number },
  feedback: String
}, { timestamps: true });

const interviewModel = mongoose.model("Interview", InterviewSchema);
module.exports = interviewModel;