const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/users_controllers');
const { authenticateToken } = require('../middlewares/Auth_middleware');


router.get('/get-users',authenticateToken, getUsers);


module.exports = router;
