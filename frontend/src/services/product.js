import api from './api';

export const productService = {
  // Get all products (public)
  getAllProducts: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add parameters if they exist
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.category) queryParams.append('category', params.category);
      if (params.search) queryParams.append('search', params.search);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch products'
      };
    }
  },

  // Alias for getAllProducts (used by admin)
  getProducts: async (params = {}) => {
    return productService.getAllProducts(params);
  },

  // Get single product (public)
  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch product'
      };
    }
  },

  // Get product categories (public)
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch categories'
      };
    }
  },

  // Create product (admin only)
  createProduct: async (formData) => {
    try {
      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create product'
      };
    }
  },

  // Update product (admin only)
  updateProduct: async (id, formData) => {
    try {
      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update product'
      };
    }
  },

  // Delete product (admin only)
  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete product'
      };
    }
  }
};
