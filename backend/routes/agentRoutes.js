const express = require('express');
const router = express.Router();
const { createAgent } = require('../controllers/agentController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Any request to POST /api/agents will first go through 'protect' middleware
router.route('/').post(protect, createAgent);

module.exports = router;