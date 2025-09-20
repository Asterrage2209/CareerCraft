const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sessionId: { 
        type: String, 
        required: true 
    },
    messages: [{
        role: { 
            type: String, 
            enum: ['user', 'assistant'], 
            required: true 
        },
        content: { 
            type: String, 
            required: true 
        },
        timestamp: { 
            type: Date, 
            default: Date.now 
        }
    }],
    context: {
        userProfile: {
            name: String,
            role: String,
            skills: [String],
            interests: [String]
        },
        careerGoals: [String],
        currentSession: {
            topic: String,
            lastAdvice: String,
            followUpQuestions: [String]
        }
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true
});

ChatSchema.index({ userId: 1, sessionId: 1 });
ChatSchema.index({ userId: 1, isActive: 1 });

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
