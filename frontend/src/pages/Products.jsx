import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, ShoppingCart, Star, Heart, Fish, Bird, Dog, Zap, Leaf, Factory, Shield, Award, Package, CheckCircle, Milk, Waves, Egg, MessageCircle } from 'lucide-react';
import { staticProductService } from '../services/staticProductService';
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
      image: '/categories/cattle-supplements.jpg',
      description: 'Calcium boosters, multivitamins, digestive health enhancers',
      color: 'bg-red-50 text-red-600 border-red-200',
      products: ['Calcium Supplements', 'Multivitamin Liquid', 'Liver Tonic']
    },
    {
      id: 'aquaculture',
      name: 'Aquaculture Solutions',
      icon: Waves,
      image: '/categories/aquaculture-solutions.jpg',
      description: 'Water-soluble feed additives for fish & shrimp growth, immunity, water quality',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      products: ['Fish Growth Enhancer', 'Shrimp Immunity Booster', 'Water Quality Improver']
    },
    {
      id: 'poultry',
      name: 'Poultry Products',
      icon: Egg,
      image: '/categories/poultry-products.jpg',
      description: 'Vitamin complexes, calcium supplements, immunity boosters for egg & meat quality',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      products: ['Egg Production Enhancer', 'Poultry Vitamin Complex', 'Broiler Growth Supplement']
    },
    {
      id: 'pet-care',
      name: 'Pet Care',
      icon: Heart,
      image: '/categories/pet-care.jpg',
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

  const fetchProducts = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }
      
      // Request all products from static service
      const result = await staticProductService.getAllProducts({ limit: 100 });
      
      if (result.success && result.data) {
        const fetchedProducts = result.data.products || result.data || [];
        setProducts(fetchedProducts);
      } else {
        throw new Error(result.message || 'Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products. Please try again.');
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
    fetchProducts(true);
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

  const retryLoadProducts = () => {
    fetchProducts(true);
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
          
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search Bar */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">All Categories</option>
                  {aniLifeCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCategory || sortBy !== 'newest') && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

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
            <div className="text-center py-20">
              <div className="flex items-center justify-center mb-6">
                <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Products...</h3>
              <p className="text-gray-600">Please wait while we fetch our product catalog</p>
            </div>
          ) : (
            <>
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={retryLoadProducts}
                    className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Retry Loading
                  </button>
                </div>
              ) : (
                <>
                  {/* Products Results Info */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-600">
                        {debouncedSearchTerm || selectedCategory 
                          ? `Showing ${currentProducts.length} of ${sortedProducts.length} filtered products (${products.length} total)` 
                          : `Showing ${currentProducts.length} of ${products.length} products`}
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Static Catalog
                      </span>
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
