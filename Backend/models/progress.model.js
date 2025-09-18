const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    badges: [{ type: String }], // gamification
    completedSkills: [{ type: String }],
    careerStage: { 
        type: String, 
        enum: ["beginner", "intermediate", "advanced"], default: "beginner" 
    },
}, { timestamps: true });

const progressModel = mongoose.model("Progress", ProgressSchema);
module.exports = progressModel;