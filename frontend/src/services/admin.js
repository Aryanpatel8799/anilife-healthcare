import api from './api';

export const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch dashboard stats'
      };
    }
  },

  // Get inquiry analytics
  getInquiryAnalytics: async (period = '7') => {
    try {
      const response = await api.get(`/admin/analytics/inquiries?period=${period}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch analytics'
      };
    }
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    try {
      const response = await api.get(`/admin/activities?limit=${limit}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch activities'
      };
    }
  },

  // Get system information
  getSystemInfo: async () => {
    try {
      const response = await api.get('/admin/system');
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch system info'
      };
    }
  }
};
