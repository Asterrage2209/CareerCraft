const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await user.generateJWT();

        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }

        res.json({
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                phone: user.phone, 
                role: user.role,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password, phone, role = "student", profilePicture } = req.body;

        const isExists = await userModel.findOne({ email });
        if (isExists) return res.status(400).json({ message: "User already exists" });

        const newUser = new userModel({ name, email, password, phone, role, profilePicture });
        await newUser.save();

        const token = await newUser.generateJWT();

        res.json({ 
            token, 
            user: { 
                id: newUser._id, 
                name: newUser.name, 
                email: newUser.email, 
                phone: newUser.phone, 
                role: newUser.role,
                profilePicture: newUser.profilePicture
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, profilePicture, skills, interests } = req.body;
        const userId = req.user.id;

        const updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (profilePicture) updateData.profilePicture = profilePicture;
        if (skills) updateData.skills = skills;
        if (interests) updateData.interests = interests;

        const user = await userModel.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profilePicture: user.profilePicture,
                skills: user.skills,
                interests: user.interests
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = { 
    login, 
    signup,
    getUserProfile,
    updateUserProfile
};
