const Inquiry = require('../models/Inquiry');
const { sendInquiryNotification } = require('../utils/sendEmail');

// @desc    Submit inquiry
// @route   POST /api/inquiries
// @access  Public
const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    // Create inquiry
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      subject: subject || 'General Inquiry'
    });

    // Send email notification to admin
    await sendInquiryNotification(inquiry);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will get back to you soon!',
      data: {
        inquiry: {
          id: inquiry._id,
          name: inquiry.name,
          email: inquiry.email,
          subject: inquiry.subject,
          status: inquiry.status,
          createdAt: inquiry.createdAt
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry',
      error: error.message
    });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Admin only)
const getInquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = {};
    
    // Status filter
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    // Priority filter
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    
    // Search filter
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { subject: { $regex: req.query.search, $options: 'i' } },
        { message: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    // Sort options
    let sort = {};
    switch (req.query.sortBy) {
      case 'name_asc':
        sort.name = 1;
        break;
      case 'name_desc':
        sort.name = -1;
        break;
      case 'status_asc':
        sort.status = 1;
        break;
      case 'status_desc':
        sort.status = -1;
        break;
      case 'priority_asc':
        sort.priority = 1;
        break;
      case 'priority_desc':
        sort.priority = -1;
        break;
      default:
        sort.createdAt = -1;
    }

    const inquiries = await Inquiry.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Inquiry.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Get status counts
    const statusCounts = await Inquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        inquiries,
        pagination: {
          current: page,
          total: totalPages,
          count: inquiries.length,
          totalInquiries: total
        },
        stats: {
          statusCounts: statusCounts.reduce((acc, item) => {
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

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private (Admin only)
const getInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { inquiry }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id/status
// @access  Private (Admin only)
const updateInquiryStatus = async (req, res) => {
  try {
    const { status, priority, adminNotes } = req.body;
    
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Update fields
    if (status) inquiry.status = status;
    if (priority) inquiry.priority = priority;
    if (adminNotes !== undefined) inquiry.adminNotes = adminNotes;

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      data: { inquiry }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin only)
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    await Inquiry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Bulk update inquiries
// @route   PUT /api/inquiries/bulk
// @access  Private (Admin only)
const bulkUpdateInquiries = async (req, res) => {
  try {
    const { inquiryIds, status, priority } = req.body;

    if (!inquiryIds || !Array.isArray(inquiryIds) || inquiryIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid inquiry IDs'
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const result = await Inquiry.updateMany(
      { _id: { $in: inquiryIds } },
      updateData
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} inquiries updated successfully`,
      data: {
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount
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
  submitInquiry,
  getInquiries,
  getInquiry,
  updateInquiryStatus,
  deleteInquiry,
  bulkUpdateInquiries
};
