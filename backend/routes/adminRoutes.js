const express = require('express');
const {
  getDashboardStats,
  getInquiryAnalytics,
  getRecentActivities,
  getSystemInfo
} = require('../controllers/adminController');
const { authenticateAdmin, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// All routes are protected (Admin only)
router.use(authenticateAdmin);

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/stats', getDashboardStats);

// @route   GET /api/admin/analytics/inquiries
// @desc    Get inquiry analytics for charts
// @access  Private (Admin only)
router.get('/analytics/inquiries', getInquiryAnalytics);

// @route   GET /api/admin/activities
// @desc    Get recent activities
// @access  Private (Admin only)
router.get('/activities', getRecentActivities);

// @route   GET /api/admin/system
// @desc    Get system information
// @access  Private (Admin only)
router.get('/system', getSystemInfo);

module.exports = router;
