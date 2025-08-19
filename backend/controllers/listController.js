const asyncHandler = require('express-async-handler');
const csv = require('csv-parser');
const fs = require('fs');
const Agent = require('../models/Agent.js');
const Task = require('../models/Task.js');

// @desc    Upload CSV and distribute tasks
// @route   POST /api/lists/upload
// @access  Private (Admin only)
const uploadList = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  const agents = await Agent.find({});
  if (agents.length === 0) {
    res.status(400);
    throw new Error('No agents found. Please create agents before uploading a list.');
  }

  // <- ADD THIS LINE TO DELETE OLD TASKS
  await Task.deleteMany({});

  const tasks = [];
  let agentIndex = 0;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      // Create a task object for each row in the CSV
      const task = {
        firstName: row.FirstName,
        phone: row.Phone,
        notes: row.Notes,
        // Assign the task to an agent in a round-robin fashion
        agent: agents[agentIndex]._id,
      };
      tasks.push(task);

      // Move to the next agent for the next row
      agentIndex = (agentIndex + 1) % agents.length;
    })
    .on('end', async () => {
      // After reading the whole file, save all tasks to the database
      await Task.insertMany(tasks);
      // Remove the uploaded file from the server
      fs.unlinkSync(req.file.path); 
      res.status(201).json({ message: `${tasks.length} tasks successfully uploaded and distributed.` });
    });
});

// @desc    Get all distributed tasks
// @route   GET /api/lists
// @access  Private (Admin only)
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({}).populate('agent', 'name email');
  res.json(tasks);
});

module.exports = { uploadList, getTasks };