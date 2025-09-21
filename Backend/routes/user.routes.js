const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/user.controller');

// Ensure controllers are properly imported
console.log('Register handler:', typeof registerUser); // Debug log
console.log('Login handler:', typeof loginUser); // Debug log

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
