const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
const userRoutes = require('./routes/user.routes');
const consultancyRoutes = require('./routes/consultancy.routes');

app.use('/api/users', userRoutes);
app.use('/api/consultancy', consultancyRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Instead of using * wildcard, use a specific catch-all route
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Static files path: ${path.join(__dirname, '../Frontend/dist')}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));