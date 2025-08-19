const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController.js');

router.post('/login', authUser);

module.exports = router;