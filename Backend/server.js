const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Debug middleware - Add detailed logging
app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.path}`);
    console.log('[DEBUG] Headers:', req.headers);
    if (req.method === 'POST') {
        console.log('[DEBUG] Body:', req.body);
    }
    next();
});

// Core middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// API Routes
const userRoutes = require('./routes/user.routes');
const consultancyRoutes = require('./routes/consultancy.routes');

// Mount routes with explicit paths
app.use('/api/users', userRoutes);
app.use('/api/consultancy', consultancyRoutes);

// Static file serving
const distPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(distPath));

// SPA handler - No wildcard, use middleware
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        next();
        return;
    }
    res.sendFile(path.join(distPath, 'index.html'), err => {
        if (err) {
            console.error('[ERROR] Failed to send file:', err);
            next(err);
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// MongoDB and Server startup
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('[INFO] MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`[INFO] Server running on port ${PORT}`);
            console.log(`[INFO] Environment: ${process.env.NODE_ENV}`);
            console.log(`[INFO] Static files path: ${distPath}`);
            // Print all registered routes
            app._router.stack.forEach(r => {
                if (r.route && r.route.path) {
                    console.log(`[INFO] Route: ${r.route.path}`);
                }
            });
        });
    })
    .catch(err => {
        console.error('[ERROR] MongoDB connection failed:', err);
        process.exit(1);
    });