import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, ShoppingCart, Star, Heart, Fish, Bird, Dog, Zap, Leaf, Factory, Shield, Award, Package } from 'lucide-react';
import { productService } from '../services/product';
import { formatCurrency } from '../utils/helpers';
import Loader, { SkeletonCard } from '../components/Loader';
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

  const productsPerPage = 12;

  // AniLife Healthcare Product Categories
  const aniLifeCategories = [
    {
      id: 'cattle',
      name: 'Cattle Supplements',
      icon: Heart,
      description: 'Calcium boosters, multivitamins, digestive health enhancers',
      color: 'bg-red-50 text-red-600 border-red-200',
      products: ['Calcium Supplements', 'Multivitamin Liquid', 'Liver Tonic']
    },
    {
      id: 'aquaculture',
      name: 'Aquaculture Solutions',
      icon: Fish,
      description: 'Water-soluble feed additives for fish & shrimp growth, immunity, water quality',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      products: ['Fish Growth Enhancer', 'Shrimp Immunity Booster', 'Water Quality Improver']
    },
    {
      id: 'poultry',
      name: 'Poultry Products',
      icon: Bird,
      description: 'Vitamin complexes, calcium supplements, immunity boosters for egg & meat quality',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      products: ['Egg Production Enhancer', 'Poultry Vitamin Complex', 'Broiler Growth Supplement']
    },
    {
      id: 'pet-care',
      name: 'Pet Care',
      icon: Dog,
      description: 'Premium supplements for dogs, cats & pets – joint health, coat shine, digestion, vitality',
      color: 'bg-green-50 text-green-600 border-green-200',
      products: ['Joint Health Supplement', 'Coat Shine Formula', 'Digestive Health Support']
    }
  ];

  // Featured Products from AniLife Healthcare
  const featuredProducts = [
    {
      id: 'calcium-supplements',
      name: 'Calcium Supplements',
      category: 'Cattle Supplements',
      description: 'For bone health, milk production, deficiency prevention',
      features: ['Enhanced milk production', 'Stronger bones', 'Disease prevention'],
      icon: Heart,
      price: 299
    },
    {
      id: 'multivitamin-liquid',
      name: 'Multivitamin Liquid',
      category: 'Cattle Supplements', 
      description: 'Vitamins A, D, E, B-complex – immunity, growth, reproduction',
      features: ['Complete nutrition', 'Immune support', 'Growth enhancement'],
      icon: Zap,
      price: 399
    },
    {
      id: 'liver-tonic',
      name: 'Liver Tonic',
      category: 'Cattle Supplements',
      description: 'Herbal detox & digestion support',
      features: ['Natural detox', 'Digestive health', 'Liver protection'],
      icon: Leaf,
      price: 199
    },
    {
      id: 'urin-tonic',
      name: 'Urin Tonic',
      category: 'Specialized Solutions',
      description: 'Urinary tract & kidney support',
      features: ['Kidney health', 'Urinary support', 'Natural formula'],
      icon: Shield,
      price: 249
    },
    {
      id: 'yeast-bolus',
      name: 'Yeast Bolus',
      category: 'Specialized Solutions',
      description: 'Probiotic for rumen health, digestion, feed efficiency',
      features: ['Rumen health', 'Better digestion', 'Feed efficiency'],
      icon: Factory,
      price: 149
    },
    {
      id: 'calcium-phosphorus-gel',
      name: 'Calcium Phosphorus Gel',
      category: 'Advanced Delivery',
      description: 'Fast-acting, high bioavailability',
      features: ['Fast-acting', 'High bioavailability', 'Easy administration'],
      icon: Award,
      price: 449
    }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
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
        setTotalPages(Math.ceil(result.data.pagination.total / productsPerPage));
      } else {
        toast.error('Failed to load products');
        setProducts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products. Please try again.');
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategories(aniLifeCategories.map(cat => ({ name: cat.name, _id: cat.id })));
    } catch (error) {
      setCategories(aniLifeCategories.map(cat => ({ name: cat.name, _id: cat.id })));
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

  const ProductCard = ({ product }) => {
    const IconComponent = product.icon || ShoppingCart;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:scale-105"
        onClick={() => navigate(`/products/${product.id || product._id}`)}
      >
        <div className="relative overflow-hidden rounded-lg mb-4">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <IconComponent className="w-16 h-16 text-primary-600" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <div className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">
            {product.name}
          </h3>
          <p className="text-secondary-600 text-sm mb-3">
            {product.description}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 3 && (
                  <span className="text-primary-600 text-xs">
                    +{product.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-primary-600">
              ₹{product.price}
            </div>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm text-secondary-600 ml-1">4.8</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-secondary-200">
          <button 
            className="w-full btn-primary text-sm py-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id || product._id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20">
        <div className="max-width section-padding">
          <div className="text-center">
            <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Product Range
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-secondary-900 mb-8">
              Our <span className="text-primary-600">Products</span>
            </h1>
            <p className="text-2xl text-secondary-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive nutrition solutions for cattle, aquaculture, poultry, and pets. 
              Each product is scientifically formulated for optimal animal health and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-6">Product Categories</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Specialized solutions for every animal care need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {aniLifeCategories.map((category, index) => (
              <div 
                key={category.id} 
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCategory === category.id ? category.color : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
                onClick={() => handleCategoryChange(selectedCategory === category.id ? '' : category.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    selectedCategory === category.id ? 'bg-white' : category.color
                  }`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-secondary-600 mb-4">{category.description}</p>
                  <div className="text-xs text-primary-600 font-medium">
                    {category.products.length} Products
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-width section-padding">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {selectedCategory && (
                <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Category: {aniLifeCategories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-width section-padding">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product.id || product._id || index} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Products Found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || selectedCategory 
                  ? "No products match your current filters. Try adjusting your search criteria."
                  : "No products are currently available in our database."}
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
    
    </div>
  );
};

export default Products;
