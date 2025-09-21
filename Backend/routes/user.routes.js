const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/user.controller');

// Debug middleware for user routes
router.use((req, res, next) => {
    console.log(`[User Route] ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
