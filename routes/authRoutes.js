const express = require('express');
const router = express.Router();
const { signupAdmin, loginAdmin, getAdminDetails } = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');  // Import protect middleware

// Signup route
router.post('/signup', signupAdmin);

// Login route
router.post('/login', loginAdmin);

// Protected route (Admin details)
router.get('/admin-details', protect, getAdminDetails);

module.exports = router;
