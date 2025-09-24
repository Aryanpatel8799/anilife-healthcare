import { staticProducts, findStaticProductById, getRelatedStaticProducts } from '../data/staticProducts';

// Static-only product service (no backend calls)
export const staticProductService = {
  // Get all products from static data
  getAllProducts: async (params = {}) => {
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      let products = [...staticProducts];
      
      // Apply filters if provided
      if (params.category) {
        products = products.filter(product => 
          product.category?.toLowerCase() === params.category.toLowerCase()
        );
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        products = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          product.productDescription?.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply pagination
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 100;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedProducts = products.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: {
          products: paginatedProducts,
          total: products.length,
          page: page,
          totalPages: Math.ceil(products.length / limit),
          hasMore: endIndex < products.length
        },
        isStatic: true
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to load products',
        isStatic: true
      };
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const product = findStaticProductById(id);
      
      if (!product) {
        return {
          success: false,
          message: 'Product not found',
          isStatic: true
        };
      }
      
      // Get related products
      const relatedProducts = getRelatedStaticProducts(id, 4);
      
      return {
        success: true,
        data: {
          product,
          relatedProducts
        },
        isStatic: true
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to load product details',
        isStatic: true
      };
    }
  },

  // Get products by category
  getProductsByCategory: async (category, limit = 10) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    try {
      const products = staticProducts.filter(product =>
        product.category?.toLowerCase() === category.toLowerCase()
      ).slice(0, limit);
      
      return {
        success: true,
        data: products,
        isStatic: true
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to load category products',
        isStatic: true
      };
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 6) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      // Get products with high ratings or mark some as featured
      const featuredProducts = staticProducts
        .filter(product => product.rating >= 4.5 || product.featured)
        .slice(0, limit);
      
      // If not enough featured products, fill with random ones
      if (featuredProducts.length < limit) {
        const remaining = limit - featuredProducts.length;
        const otherProducts = staticProducts
          .filter(product => !featuredProducts.includes(product))
          .slice(0, remaining);
        featuredProducts.push(...otherProducts);
      }
      
      return {
        success: true,
        data: featuredProducts,
        isStatic: true
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to load featured products',
        isStatic: true
      };
    }
  }
};
