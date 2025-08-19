const asyncHandler = require('express-async-handler');
const Agent = require('../models/Agent.js');

// @desc    Create a new agent
// @route   POST /api/agents
// @access  Private (Admin only)
const createAgent = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const agentExists = await Agent.findOne({ email });

  if (agentExists) {
    res.status(400);
    throw new Error('Agent already exists with that email');
  }

  const agent = await Agent.create({
    name,
    email,
    mobile,
    password,
  });

  if (agent) {
    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
    });
  } else {
    res.status(400);
    throw new Error('Invalid agent data');
  }
});

module.exports = { createAgent };