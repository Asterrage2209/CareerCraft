const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/user.controller');

// Debug middleware
router.use((req, res, next) => {
    console.log(`User route hit: ${req.method} ${req.path}`);
    next();
});

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
