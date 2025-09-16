import api from './api';

export const inquiryService = {
  // Submit inquiry (public)
  submitInquiry: async (inquiryData) => {
    try {
      const response = await api.post('/inquiries', inquiryData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to submit inquiry'
      };
    }
  },

  // Get all inquiries (admin only)
  getAllInquiries: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add parameters if they exist
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.status) queryParams.append('status', params.status);
      if (params.priority) queryParams.append('priority', params.priority);
      if (params.search) queryParams.append('search', params.search);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      const url = `/inquiries${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch inquiries'
      };
    }
  },

  // Get single inquiry (admin only)
  getInquiry: async (id) => {
    try {
      const response = await api.get(`/inquiries/${id}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch inquiry'
      };
    }
  },

  // Update inquiry status (admin only)
  updateInquiryStatus: async (id, statusData) => {
    try {
      const response = await api.put(`/inquiries/${id}/status`, statusData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update inquiry'
      };
    }
  },

  // Bulk update inquiries (admin only)
  bulkUpdateInquiries: async (updateData) => {
    try {
      const response = await api.put('/inquiries/bulk', updateData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to bulk update inquiries'
      };
    }
  },

  // Delete inquiry (admin only)
  deleteInquiry: async (id) => {
    try {
      await api.delete(`/inquiries/${id}`);
      return { success: true, message: 'Inquiry deleted successfully' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete inquiry'
      };
    }
  }
};
