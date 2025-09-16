const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');
const Admin = require('../models/Admin');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    // Get total counts with detailed logging
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ status: 'pending' });
    const resolvedInquiries = await Inquiry.countDocuments({ status: 'resolved' });
    
    // Debug logging
    console.log('Dashboard Stats Debug:', {
      totalProducts,
      totalInquiries,
      pendingInquiries,
      resolvedInquiries
    });
    
    // Get recent inquiries (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentInquiries = await Inquiry.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get recent products (last 30 days)
    const recentProducts = await Product.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
      isActive: true
    });

    // Get inquiries by status
    const inquiriesByStatus = await Inquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get inquiries by priority
    const inquiriesByPriority = await Inquiry.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get products by category
    const productsByCategory = await Product.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalInquiries,
          pendingInquiries,
          resolvedInquiries,
          recentInquiries,
          recentProducts
        },
        charts: {
          inquiriesByStatus: inquiriesByStatus.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          inquiriesByPriority: inquiriesByPriority.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          productsByCategory: productsByCategory.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {})
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get inquiry analytics
// @route   GET /api/admin/analytics/inquiries
// @access  Private (Admin only)
const getInquiryAnalytics = async (req, res) => {
  try {
    const { period = '7' } = req.query; // Default to 7 days
    const days = parseInt(period);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Weekly inquiry analytics
    const weeklyData = await Inquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Monthly trends (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    const monthlyTrends = await Inquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Format data for charts
    const formatChartData = (data) => {
      return data.map(item => ({
        date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day || 1).padStart(2, '0')}`,
        total: item.total,
        pending: item.pending,
        resolved: item.resolved
      }));
    };

    res.status(200).json({
      success: true,
      data: {
        weekly: formatChartData(weeklyData),
        monthly: monthlyTrends.map(item => ({
          date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          total: item.total,
          pending: item.pending,
          resolved: item.resolved
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get recent activities
// @route   GET /api/admin/activities
// @access  Private (Admin only)
const getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get recent inquiries
    const recentInquiries = await Inquiry.find()
      .sort({ createdAt: -1 })
      .limit(Math.floor(limit / 2))
      .select('name email status createdAt');

    // Get recent products
    const recentProducts = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(Math.floor(limit / 2))
      .select('name category createdAt');

    // Combine and format activities
    const activities = [
      ...recentInquiries.map(inquiry => ({
        type: 'inquiry',
        id: inquiry._id,
        title: `New inquiry from ${inquiry.name}`,
        description: inquiry.email,
        status: inquiry.status,
        createdAt: inquiry.createdAt
      })),
      ...recentProducts.map(product => ({
        type: 'product',
        id: product._id,
        title: `New product added: ${product.name}`,
        description: `Category: ${product.category}`,
        status: 'active',
        createdAt: product.createdAt
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);

    res.status(200).json({
      success: true,
      data: { activities }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get system info
// @route   GET /api/admin/system
// @access  Private (Admin only)
const getSystemInfo = async (req, res) => {
  try {
    const totalAdmins = await Admin.countDocuments();
    
    // Database stats
    const dbStats = {
      totalProducts: await Product.countDocuments(),
      activeProducts: await Product.countDocuments({ isActive: true }),
      totalInquiries: await Inquiry.countDocuments(),
      totalAdmins
    };

    // Server info
    const serverInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    };

    res.status(200).json({
      success: true,
      data: {
        database: dbStats,
        server: serverInfo
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getInquiryAnalytics,
  getRecentActivities,
  getSystemInfo
};
