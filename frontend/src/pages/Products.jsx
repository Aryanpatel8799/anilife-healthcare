import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, ShoppingCart, Star, Heart, Fish, Bird, Dog, Zap, Leaf, Factory, Shield, Award, Package, CheckCircle, Milk, Waves, Egg } from 'lucide-react';
import { productService } from '../services/product';
import { formatCurrency } from '../utils/helpers';
import Loader, { SkeletonCard } from '../components/Loader';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  const productsPerPage = 12;

  // Debounce search term to prevent too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = !debouncedSearchTerm || 
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.productDescription?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      product.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        return (a.price || 0) - (b.price || 0);
      case 'price_desc':
        return (b.price || 0) - (a.price || 0);
      case 'rating_desc':
        return (b.rating || 0) - (a.rating || 0);
      default: // newest
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  // Paginate the sorted products
  const totalProducts = sortedProducts.length;
  const calculatedTotalPages = Math.ceil(totalProducts / productsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Update total pages when filtered products change
  useEffect(() => {
    const newTotalPages = Math.ceil(sortedProducts.length / productsPerPage);
    setTotalPages(newTotalPages);
    
    // If current page is beyond the new total pages, reset to page 1
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [sortedProducts.length, currentPage, productsPerPage]);

  // AniLife Healthcare Product Categories
  const aniLifeCategories = [
    {
      id: 'cattle',
      name: 'Cattle Supplements',
      icon: Milk,
      description: 'Calcium boosters, multivitamins, digestive health enhancers',
      color: 'bg-red-50 text-red-600 border-red-200',
      products: ['Calcium Supplements', 'Multivitamin Liquid', 'Liver Tonic']
    },
    {
      id: 'aquaculture',
      name: 'Aquaculture Solutions',
      icon: Waves,
      description: 'Water-soluble feed additives for fish & shrimp growth, immunity, water quality',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      products: ['Fish Growth Enhancer', 'Shrimp Immunity Booster', 'Water Quality Improver']
    },
    {
      id: 'poultry',
      name: 'Poultry Products',
      icon: Egg,
      description: 'Vitamin complexes, calcium supplements, immunity boosters for egg & meat quality',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      products: ['Egg Production Enhancer', 'Poultry Vitamin Complex', 'Broiler Growth Supplement']
    },
    {
      id: 'pet-care',
      name: 'Pet Care',
      icon: Heart,
      description: 'Premium supplements for dogs, cats & pets – joint health, coat shine, digestion, vitality',
      color: 'bg-green-50 text-green-600 border-green-200',
      products: ['Joint Health Supplement', 'Coat Shine Formula', 'Digestive Health Support']
    }
  ];

 

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
  ];

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Request all products without any limit to avoid missing products
      const result = await productService.getAllProducts({ limit: 100 });
      if (result.success) {
        setProducts(result.data.products || result.data || []);
      } else {
        toast.error('Failed to load products');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 429) {
        toast.error('Too many requests. Please wait a moment and try again.');
      } else {
        toast.error('Failed to load products. Please try again.');
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setCategories(aniLifeCategories.map(cat => ({ name: cat.name, _id: cat.id })));
    } catch (error) {
      setCategories(aniLifeCategories.map(cat => ({ name: cat.name, _id: cat.id })));
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const ProductCard = ({ product }) => {
    const IconComponent = product.icon || ShoppingCart;
    
    return (
      <div 
        className="product-card group"
        onClick={() => navigate(`/products/${product.id || product._id}`)}
      >
        {/* Image Container with Aspect Ratio */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.log('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', product.name);
              }}
            />
          ) : null}
          
          {/* Fallback Icon */}
          <div className={`${product.images && product.images.length > 0 ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100`}>
            <IconComponent className="w-20 h-20 text-primary-400" />
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/95 backdrop-blur-sm text-primary-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-primary-200 shadow-sm">
              {product.category || 'Healthcare'}
            </span>
          </div>

          {/* Rating Badge */}
          {product.rating && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
                <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.productDescription || product.description || 'Premium quality animal healthcare solution designed for optimal results and animal wellbeing.'}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              {product.price && (
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
              {product.priceRange && (
                <span className="text-sm text-gray-500 mt-1">{product.priceRange}</span>
              )}
            </div>
            
            <button 
              className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 focus-ring transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/${product.id || product._id}`);
              }}
            >
              View Details
            </button>
          </div>

          {/* Product Features */}
          {/* {product.uses && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-600">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{product.uses}</span>
              </div>
            </div>
          )} */}
        </div>
      </div>
    );
  };
  
  return (
    <>
      <SEO 
        title="Products"
        description="Explore AniLife Healthcare's premium animal nutrition supplements for cattle, aquaculture, poultry, and pets. High-quality, scientifically formulated products with export quality standards."
        keywords="animal nutrition products, cattle supplement products, aquaculture supplements, poultry nutrition products, pet supplements, livestock feed additives, animal health products, veterinary supplements, dairy cattle nutrition, fish farming products, broiler supplements, layer supplements, pet vitamin supplements, organic animal supplements, export quality supplements, bulk animal nutrition"
        url="/products"
      />
      <div className="page-container">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative max-width section-padding">
          <div className="text-center">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Package className="w-4 h-4 mr-2" />
              Our Product Range
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-primary-600">Animal Healthcare</span> Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Scientifically formulated solutions for cattle, aquaculture, poultry, and pets. 
              Each product ensures optimal animal health and performance.
            </p>
        
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-gray-50">
        <div className="max-width section-padding">
          {/* Section Header */}
          {/* <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive range of scientifically proven animal healthcare solutions
            </p>
            {!loading && products.length > 0 && (
              <div className="mt-4">
                <span className="text-sm text-gray-500">
                  {debouncedSearchTerm || selectedCategory 
                    ? `Showing ${sortedProducts.length} of ${products.length} products` 
                    : `${products.length} products available`}
                </span>
              </div>
            )}
          </div> */}

          {/* Search and Filters */}
       
          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={clearFilters}
                    className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Products Results Info */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-sm text-gray-600">
                      {debouncedSearchTerm || selectedCategory 
                        ? `Showing ${currentProducts.length} of ${sortedProducts.length} filtered products (${products.length} total)` 
                        : `Showing ${currentProducts.length} of ${products.length} products`}
                    </div>
                    {calculatedTotalPages > 1 && (
                      <div className="text-sm text-gray-600">
                        Page {currentPage} of {calculatedTotalPages}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id || product._id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {calculatedTotalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-16">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: calculatedTotalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            currentPage === page
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, calculatedTotalPages))}
                        disabled={currentPage === calculatedTotalPages}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
                </div>
      </section>

      {/* Professional CTA Section */}
    
      </div>
    </>
  );
};

export default Products;
