const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth_controllers');

// Create User Account Route
router.post('/create-account', register);

// Check User Login Route
router.post('/login', login);

module.exports = router;