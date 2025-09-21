const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - should come before static file serving
const userRoutes = require('./routes/user.routes');
const consultancyRoutes = require('./routes/consultancy.routes');

app.use('/api/users', userRoutes);
app.use('/api/consultancy', consultancyRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Static files path:', path.join(__dirname, '../Frontend/dist'));
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));