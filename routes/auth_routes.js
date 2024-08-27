const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth_controllers');

router.post('/create-account', register);

router.post('/login', login);

module.exports = router;
