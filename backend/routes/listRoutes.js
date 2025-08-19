const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadList, getTasks } = require('../controllers/listController.js'); // 1. Add getTasks here
const { protect } = require('../middleware/authMiddleware.js');
const path = require('path');

// Multer configuration for file uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // Validation: only accept .csv files
    if (path.extname(file.originalname) !== '.csv') {
      return cb(new Error('Only .csv files are allowed'));
    }
    cb(null, true);
  },
});

// Route for uploading the file
router.route('/upload').post(protect, upload.single('file'), uploadList);

// 2. Add the new route for getting the tasks
router.route('/').get(protect, getTasks);

module.exports = router;