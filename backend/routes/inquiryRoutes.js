const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  submitInquiry,
  getInquiries,
  getInquiry,
  updateInquiryStatus,
  deleteInquiry,
  bulkUpdateInquiries
} = require('../controllers/inquiryController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rate limiting for inquiry submission
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 inquiry submissions per windowMs
  message: {
    success: false,
    message: 'Too many inquiry submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
// @route   POST /api/inquiries
// @desc    Submit new inquiry
// @access  Public
router.post('/', inquiryLimiter, submitInquiry);

// Protected routes (Admin only)
// @route   GET /api/inquiries
// @desc    Get all inquiries with filtering, sorting, and pagination
// @access  Private (Admin only)
router.get('/', authenticateAdmin, getInquiries);

// @route   PUT /api/inquiries/bulk
// @desc    Bulk update inquiries
// @access  Private (Admin only)
router.put('/bulk', authenticateAdmin, bulkUpdateInquiries);

// @route   GET /api/inquiries/:id
// @desc    Get single inquiry by ID
// @access  Private (Admin only)
router.get('/:id', authenticateAdmin, getInquiry);

// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status, priority, and admin notes
// @access  Private (Admin only)
router.put('/:id/status', authenticateAdmin, updateInquiryStatus);

// @route   DELETE /api/inquiries/:id
// @desc    Delete inquiry
// @access  Private (Admin only)
router.delete('/:id', authenticateAdmin, deleteInquiry);

module.exports = router;
