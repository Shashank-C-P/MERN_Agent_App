const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const agentRoutes = require('./routes/agentRoutes.js');
const listRoutes = require('./routes/listRoutes.js');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors()); // <- ADD THIS LINE HERE
app.use(express.json());

const PORT = 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB(); 

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/lists', listRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});