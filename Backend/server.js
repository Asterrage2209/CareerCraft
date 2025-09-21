const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://careercraft-1-if2x.onrender.com'
        : 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/user.routes');
const consultancyRoutes = require("./routes/consultancy.routes");
app.use('/api/auth', userRoutes);
app.use("/api/consultancy", consultancyRoutes);

// Health check route
app.get("/api/health", (req, res) => {
    res.json({ message: "CareerCraft API is running!", status: "healthy" });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));