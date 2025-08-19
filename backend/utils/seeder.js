const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('models/User.js');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await User.deleteMany(); // Clear existing users

    const adminUser = new User({
      email: 'admin@example.com',
      password: 'password123', // This will be hashed automatically by our model
    });

    await adminUser.save();
    console.log('Admin User Created!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

connectDB().then(() => {
    importData();
});