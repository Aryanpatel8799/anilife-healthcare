import api from './api';

export const authService = {
  // Admin login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        const { token, admin } = response.data.data;
        localStorage.setItem('anilife_token', token);
        localStorage.setItem('anilife_admin', JSON.stringify(admin));
        return { success: true, data: response.data.data };
      }
      return { success: false, message: 'Login failed' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Admin register (for first admin)
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        const { token, admin } = response.data.data;
        localStorage.setItem('anilife_token', token);
        localStorage.setItem('anilife_admin', JSON.stringify(admin));
        return { success: true, data: response.data.data };
      }
      return { success: false, message: 'Registration failed' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  // Get admin profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get profile'
      };
    }
  },

  // Update admin profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      if (response.data.success) {
        localStorage.setItem('anilife_admin', JSON.stringify(response.data.data.admin));
        return { success: true, data: response.data.data };
      }
      return { success: false, message: 'Profile update failed' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed'
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('anilife_token');
    localStorage.removeItem('anilife_admin');
    window.location.href = '/admin/login';
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('anilife_token');
  },

  // Get current admin data
  getCurrentAdmin: () => {
    const adminData = localStorage.getItem('anilife_admin');
    return adminData ? JSON.parse(adminData) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('anilife_token');
  }
};
