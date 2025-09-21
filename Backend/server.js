const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

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
app.use('/api/users', userRoutes);

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