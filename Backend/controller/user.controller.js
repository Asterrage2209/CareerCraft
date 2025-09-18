import userModel from "../models/user.model.js";

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await user.generateJWT();

        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }

        res.json({
            token, user:
                { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const isExists = await User.findOne({ email });
        if (isExists) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await userModel.hashedPassword(password);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT
        const token = await newUser.generateJWT();

        res.json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
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
module.exports = { 
    login, 
    signup,
    getUserProfile
};
