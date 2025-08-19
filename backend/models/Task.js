const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  phone: {
    type: String, // Storing as String to preserve formatting like leading '+' or '0'
    required: true,
  },
  notes: {
    type: String,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Agent', // This creates a reference to our Agent model
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;