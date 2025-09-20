const mongoose = require("mongoose");

const CareerPathSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetRole: { type: String },
  steps: [
    {
      title: String,
      description: String,
      resources: [String], 
      status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const careerPathModel = mongoose.model("CareerPath", CareerPathSchema);
module.exports = careerPathModel;