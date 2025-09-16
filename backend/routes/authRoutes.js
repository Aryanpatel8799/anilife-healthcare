const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  registerAdmin,
  loginAdmin,
  getProfile,
  updateProfile
} = require('../controllers/authController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to login and register
router.use('/login', authLimiter);
router.use('/register', authLimiter);

// @route   POST /api/auth/register
// @desc    Register new admin
// @access  Public (but restricted in production)
router.post('/register', registerAdmin);

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', loginAdmin);

// @route   GET /api/auth/profile
// @desc    Get current admin profile
// @access  Private
router.get('/profile', authenticateAdmin, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update admin profile
// @access  Private
router.put('/profile', authenticateAdmin, updateProfile);

module.exports = router;
