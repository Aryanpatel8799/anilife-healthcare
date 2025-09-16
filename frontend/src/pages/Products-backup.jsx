import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, ShoppingCart, Star, Grid, List, Sparkles, Zap, Heart } from 'lucide-react';
import { productService } from '../services/product';
import { formatCurrency } from '../utils/helpers';
import Loader, { SkeletonCard } from '../components/Loader';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import toast from 'react-hot-toast';

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
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [filtersRef, filtersVisible] = useScrollAnimation(0.2);
  const [setProductRef, visibleProducts] = useStaggeredAnimation(products, 100);

  const productsPerPage = 12;

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: Sparkles },
    { value: 'name_asc', label: 'Name (A-Z)', icon: Filter },
    { value: 'name_desc', label: 'Name (Z-A)', icon: Filter },
    { value: 'price_asc', label: 'Price (Low to High)', icon: Zap },
    { value: 'price_desc', label: 'Price (High to Low)', icon: Zap },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: productsPerPage,
        search: searchTerm,
        category: selectedCategory,
        sortBy: sortBy,
      };

      const result = await productService.getAllProducts(params);
      if (result.success) {
        setProducts(result.data.products);
        setTotalPages(result.data.pagination.total);
      } else {
        toast.error('Failed to load products');
      }
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await productService.getCategories();
      if (result.success) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, sortBy]);

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

  const ProductCard = ({ product, index }) => (
    <div 
      ref={setProductRef(index)}
      className={`group cursor-pointer transition-all duration-300 ${visibleProducts.has(index) ? 'scale-in' : ''}`}
      style={{ animationDelay: `${(index % 12) * 0.1}s` }}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="card-gradient hover-lift hover-glow relative overflow-hidden h-full">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl mb-6">
          {product.imageUrl || (product.images && product.images.length > 0) ? (
            <div className="relative">
              <img
                src={product.imageUrl || product.images[0]?.url || product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* View Details Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Details
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <span className="text-blue-600 font-medium">Product Image</span>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              {product.category}
            </div>
          </div>

          {/* Rating Badge */}
          {product.rating && (
            <div className="absolute top-3 left-3">
              <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
                <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                {product.rating}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-gray-900 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors">
              {product.description}
            </p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200/50"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 3 && (
                  <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded-full">
                    +{product.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              {product.price ? (
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(product.price)}
                </span>
              ) : (
                <span className="text-blue-600 font-semibold">Contact for Price</span>
              )}
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Heart className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
        
        {/* Floating Dots */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="page-container relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl opacity-70 float" />
        <div className="absolute bottom-96 left-10 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl opacity-70 float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section 
        ref={headerRef}
        className="relative py-24 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-width section-padding text-white">
          <div className={`text-center ${headerVisible ? 'slide-in-up' : ''}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Collection
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Discover Our
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Product Range
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of scientifically proven cattle healthcare solutions 
              designed to enhance productivity, health, and overall farm success.
            </p>
          </div>
        </div>
      </section>
              Discover our comprehensive range of cattle healthcare and nutrition products 
              designed to enhance livestock health and productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-width section-padding">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-secondary flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="input-field"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || sortBy !== 'newest') && (
                <button
                  onClick={clearFilters}
                  className="btn-outline flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="input-field"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {(searchTerm || selectedCategory || sortBy !== 'newest') && (
                  <button
                    onClick={clearFilters}
                    className="btn-outline w-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-width section-padding">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                No products found
              </h3>
              <p className="text-secondary-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button onClick={clearFilters} className="btn-primary">
                View All Products
              </button>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-secondary-600">
                  Showing {products.length} of {(currentPage - 1) * productsPerPage + products.length} products
                  {searchTerm && (
                    <span> for "{searchTerm}"</span>
                  )}
                  {selectedCategory && (
                    <span> in {selectedCategory}</span>
                  )}
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50"
                  >
                    Previous
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 border rounded-lg ${
                          currentPage === pageNumber
                            ? 'bg-primary-500 text-white border-primary-500'
                            : 'border-secondary-300 hover:bg-secondary-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
