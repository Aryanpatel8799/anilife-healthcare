import React, { useState, useContext, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  MessageSquare, 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Activity,
  DollarSign,
  ShoppingCart,
  Star,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Settings,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { productService } from '../services/product';
import { inquiryService } from '../services/inquiry';
import { adminService } from '../services/admin';
import { formatDate, formatPrice, formatCurrency } from '../utils/helpers';
import { Loader, ButtonLoader } from '../components/Loader';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { logout, admin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalStats, setTotalStats] = useState({
    totalRevenue: 0,
    avgOrderValue: 0,
    conversionRate: 0
  });

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    productDescription: '',
    uses: '',
    benefits: '',
    category: '',
    price: '',
    features: '',
    images: []
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [productFormLoading, setProductFormLoading] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    } else if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const result = await adminService.getDashboardStats();
      if (result.success) {
        setDashboardData(result.data);
        
        // Calculate additional stats from real data
        const products = result.data.overview?.totalProducts || 0;
        const inquiries = result.data.overview?.totalInquiries || 0;
        
        setTotalStats({
          totalRevenue: products * 500, // Estimated revenue per product
          avgOrderValue: inquiries > 0 ? (products * 500) / inquiries : 0,
          conversionRate: inquiries > 0 ? (products / inquiries * 100) : 0
        });
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log('Fetching products...');
      const result = await productService.getProducts();
      console.log('Products result:', result);
      if (result.success) {
        setProducts(result.data.products || []);
        toast.success(`Loaded ${result.data.products?.length || 0} products`);
      } else {
        toast.error(result.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Products fetch error:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      console.log('Fetching inquiries...');
      const result = await inquiryService.getAllInquiries();
      console.log('Inquiries result:', result);
      if (result.success) {
        // Fix: Access the inquiries array from result.data.inquiries
        const inquiriesData = result.data?.inquiries || [];
        console.log('Setting inquiries:', inquiriesData);
        setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
        toast.success(`Loaded ${Array.isArray(inquiriesData) ? inquiriesData.length : 0} inquiries`);
      } else {
        setInquiries([]);
        toast.error(result.message || 'Failed to fetch inquiries');
      }
    } catch (error) {
      console.error('Inquiries fetch error:', error);
      setInquiries([]);
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const result = await productService.deleteProduct(productId);
      if (result.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const result = await inquiryService.deleteInquiry(inquiryId);
      if (result.success) {
        toast.success('Inquiry deleted successfully');
        fetchInquiries();
      } else {
        toast.error('Failed to delete inquiry');
      }
    } catch (error) {
      toast.error('Failed to delete inquiry');
    }
  };

  // Product form handlers
  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      productDescription: '',
      uses: '',
      benefits: '',
      category: '',
      price: '',
      features: '',
      images: []
    });
    setIsEditMode(false);
  };

  const handleProductFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setProductForm(prev => ({ ...prev, images: Array.from(files) }));
    } else {
      setProductForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = () => {
    resetProductForm();
    setShowAddProductModal(true);
  };

  const handleEditProduct = (product) => {
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      productDescription: product.productDescription || '',
      uses: product.uses || '',
      benefits: product.benefits || '',
      category: product.category || '',
      price: product.price?.toString() || '',
      features: Array.isArray(product.features) ? product.features.join(', ') : '',
      images: []
    });
    setSelectedProduct(product);
    setIsEditMode(true);
    setShowAddProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductFormLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('description', productForm.description);
      formData.append('productDescription', productForm.productDescription);
      formData.append('uses', productForm.uses);
      formData.append('benefits', productForm.benefits);
      formData.append('category', productForm.category);
      formData.append('price', productForm.price);
      
      // Handle features array
      const featuresArray = productForm.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);
      formData.append('features', JSON.stringify(featuresArray));

      // Handle multiple images
      if (productForm.images && productForm.images.length > 0) {
        Array.from(productForm.images).forEach(image => {
          formData.append('images', image);
        });
      }

      let result;
      if (isEditMode) {
        result = await productService.updateProduct(selectedProduct._id, formData);
      } else {
        result = await productService.createProduct(formData);
      }

      if (result.success) {
        toast.success(`Product ${isEditMode ? 'updated' : 'created'} successfully`);
        setShowAddProductModal(false);
        resetProductForm();
        fetchProducts();
      } else {
        toast.error(result.message || `Failed to ${isEditMode ? 'update' : 'create'} product`);
      }
    } catch (error) {
      console.error('Product form error:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} product`);
    } finally {
      setProductFormLoading(false);
    }
  };

  // Apply filters and pagination
  const getFilteredAndSortedData = (data, type) => {
    if (!Array.isArray(data)) return [];
    
    let filtered = data.filter(item => {
      const matchesSearch = type === 'products' 
        ? (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.category?.toLowerCase().includes(searchTerm.toLowerCase()))
        : (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.subject?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = type === 'inquiries' && filterStatus !== 'all' 
        ? item.status === filterStatus 
        : true;
        
      const matchesCategory = type === 'products' && filterCategory !== 'all'
        ? item.category === filterCategory
        : true;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedData(products, 'products');
  const filteredInquiries = getFilteredAndSortedData(inquiries, 'inquiries');

  // Pagination
  const getCurrentPageData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const currentProducts = getCurrentPageData(filteredProducts);
  const currentInquiries = getCurrentPageData(filteredInquiries);

  // Tab Navigation
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-secondary-900">
                    Anilife Healthcare Admin
                  </h1>
                  <p className="text-sm text-secondary-600">
                    Welcome back, {admin?.name || 'Admin'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-gray-100 rounded-md transition-colors relative">
                  <MessageSquare className="w-5 h-5" />
                  {dashboardData?.overview?.pendingInquiries > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {dashboardData.overview.pendingInquiries}
                    </span>
                  )}
                </button>
              </div>

              {/* Quick Actions */}
              <button
                onClick={() => setActiveTab('products')}
                className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Manage Products"
              >
                <Package className="w-5 h-5" />
              </button>

              <button
                onClick={() => window.location.reload()}
                className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-gray-100 rounded-md transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Admin Profile */}
              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary-900">{admin?.name || 'Admin'}</p>
                  <p className="text-xs text-secondary-500">{admin?.email || 'admin@anilife.com'}</p>
                </div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
              </div>

              <button
                onClick={logout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {loading && <Loader />}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && !loading && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Total Products',
                  value: dashboardData?.overview?.totalProducts || 0,
                  icon: Package,
                  color: 'bg-blue-500',
                  change: `+${dashboardData?.overview?.recentProducts || 0} this month`,
                  trend: 'up'
                },
                {
                  title: 'Total Inquiries',
                  value: dashboardData?.overview?.totalInquiries || 0,
                  icon: MessageSquare,
                  color: 'bg-green-500',
                  change: `+${dashboardData?.overview?.recentInquiries || 0} this month`,
                  trend: 'up'
                },
                {
                  title: 'Pending Inquiries',
                  value: dashboardData?.overview?.pendingInquiries || 0,
                  icon: Clock,
                  color: 'bg-yellow-500',
                  change: 'Needs attention',
                  trend: dashboardData?.overview?.pendingInquiries > 0 ? 'down' : 'up'
                },
                {
                  title: 'Revenue Estimate',
                  value: formatCurrency(totalStats.totalRevenue),
                  icon: DollarSign,
                  color: 'bg-purple-500',
                  change: `${totalStats.conversionRate.toFixed(1)}% conversion`,
                  trend: 'up'
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </p>
                      <div className={`w-2 h-2 rounded-full ${
                        stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                      } ml-auto mt-1`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Inquiries */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-secondary-900">Recent Inquiries</h3>
                    <button 
                      onClick={() => setActiveTab('inquiries')}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData?.recentInquiries?.slice(0, 5).map((inquiry) => (
                      <div key={inquiry._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-primary-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary-900 truncate">
                              {inquiry.name}
                            </p>
                            <p className="text-sm text-secondary-500 truncate">
                              {inquiry.subject || 'General Inquiry'}
                            </p>
                            <p className="text-xs text-secondary-400">
                              {inquiry.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-secondary-400">
                            {formatDate(inquiry.createdAt)}
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            inquiry.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {inquiry.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-secondary-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                        <p>No recent inquiries found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Categories with Real Data */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-secondary-900">Product Analytics</h3>
                    <button 
                      onClick={() => setActiveTab('products')}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Manage Products
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dashboardData?.charts?.productsByCategory ? 
                      Object.entries(dashboardData.charts.productsByCategory).map(([category, count], index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                            <span className="text-sm font-medium text-secondary-900">{category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-secondary-700">{count}</span>
                            <span className="text-xs text-secondary-500">products</span>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-secondary-500">
                          <Package className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                          <p>No product categories found</p>
                        </div>
                      )
                    }
                    
                    {/* Quick Stats */}
                    <div className="border-t pt-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-secondary-900">
                            {dashboardData?.overview?.totalProducts || 0}
                          </p>
                          <p className="text-xs text-secondary-500">Total Products</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {dashboardData?.overview?.totalProducts || 0}
                          </p>
                          <p className="text-xs text-secondary-500">Active Products</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Products Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">Products Management</h2>
                <p className="text-secondary-600 mt-1">Manage your product catalog and inventory</p>
              </div>
              <button 
                onClick={() => setShowAddProductModal(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>

            {/* Enhanced Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-field"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  {dashboardData?.charts?.productsByCategory && 
                    Object.keys(dashboardData.charts.productsByCategory).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))
                  }
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price Low to High</option>
                  <option value="price-high">Price High to Low</option>
                </select>

                <div className="flex items-center space-x-2">
                  <button className="btn-secondary flex items-center flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button 
                    onClick={fetchProducts}
                    className="btn-secondary p-2"
                    title="Refresh"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600">Total Products</p>
                    <p className="text-2xl font-bold text-secondary-900">{products.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600">Avg. Price</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {products.length > 0 ? 
                        formatCurrency(products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length) 
                        : '₹0'
                      }
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600">Categories</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {dashboardData?.charts?.productsByCategory ? 
                        Object.keys(dashboardData.charts.productsByCategory).length : 0
                      }
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Products Table */}
            {!loading && (
              <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentProducts.length > 0 ? currentProducts.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                <img
                                  className="h-12 w-12 rounded-lg object-cover"
                                  src={product.image || 'https://via.placeholder.com/48x48?text=No+Image'}
                                  alt={product.name}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                                  }}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-secondary-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-secondary-500">
                                  {product.description?.substring(0, 50)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-secondary-900">
                            {formatPrice(product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {product.isActive !== false ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setShowProductModal(true);
                                }}
                                className="text-primary-600 hover:text-primary-900 p-1 rounded hover:bg-primary-50"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEditProduct(product)}
                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                title="Edit Product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center">
                              <Package className="w-12 h-12 text-secondary-300 mb-3" />
                              <p className="text-secondary-500">No products found</p>
                              <button 
                                onClick={() => setShowAddProductModal(true)}
                                className="mt-2 text-primary-600 hover:text-primary-700 text-sm"
                              >
                                Add your first product
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {filteredProducts.length > itemsPerPage && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages(filteredProducts), currentPage + 1))}
                        disabled={currentPage === totalPages(filteredProducts)}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of{' '}
                          <span className="font-medium">{filteredProducts.length}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Previous
                          </button>
                          {[...Array(Math.min(5, totalPages(filteredProducts)))].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === pageNum
                                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages(filteredProducts), currentPage + 1))}
                            disabled={currentPage === totalPages(filteredProducts)}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Inquiries Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">Inquiries Management</h2>
                <p className="text-secondary-600 mt-1">Manage customer inquiries and support requests</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn-secondary flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
                <button className="btn-primary flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Bulk Email
                </button>
              </div>
            </div>

            {/* Inquiries Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600">Total Inquiries</p>
                    <p className="text-2xl font-bold text-secondary-900">{inquiries.length}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {inquiries.filter(i => i.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600">Resolved</p>
                    <p className="text-2xl font-bold text-green-600">
                      {inquiries.filter(i => i.status === 'resolved').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary-600">Response Rate</p>
                    <p className="text-2xl font-bold text-secondary-900">
                      {inquiries.length > 0 ? 
                        Math.round((inquiries.filter(i => i.status === 'resolved').length / inquiries.length) * 100) 
                        : 0
                      }%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Enhanced Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-field"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="in-progress">In Progress</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priority">Priority</option>
                </select>

                <button 
                  onClick={fetchInquiries}
                  className="btn-secondary flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            {!loading && (
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentInquiries.length > 0 ? currentInquiries.map((inquiry) => (
                        <tr key={inquiry._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-secondary-900">
                                {inquiry.name}
                              </div>
                              <div className="text-sm text-secondary-500">
                                {inquiry.email}
                              </div>
                              <div className="text-sm text-secondary-500">
                                {inquiry.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-secondary-900">
                              {inquiry.subject || 'General Inquiry'}
                            </div>
                            <div className="text-sm text-secondary-500">
                              {inquiry.message?.substring(0, 100)}...
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                            {formatDate(inquiry.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              inquiry.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : inquiry.status === 'resolved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {inquiry.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                              {inquiry.status === 'resolved' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {inquiry.status === 'in-progress' && <Activity className="w-3 h-3 mr-1" />}
                              {inquiry.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedInquiry(inquiry);
                                  setShowInquiryModal(true);
                                }}
                                className="text-primary-600 hover:text-primary-900 p-1 rounded hover:bg-primary-50"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => window.open(`mailto:${inquiry.email}`, '_blank')}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                title="Send Email"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => window.open(`tel:${inquiry.phone}`, '_blank')}
                                className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                title="Call"
                              >
                                <Phone className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(inquiry._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center">
                              <MessageSquare className="w-12 h-12 text-secondary-300 mb-3" />
                              <p className="text-secondary-500">No inquiries found</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">Product Details</h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <img
                  src={selectedProduct.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div>
                  <h4 className="font-semibold text-secondary-900">{selectedProduct.name}</h4>
                  <p className="text-primary-600 font-medium">{formatPrice(selectedProduct.price)}</p>
                  <p className="text-secondary-600 mt-2">{selectedProduct.description}</p>
                </div>
                {selectedProduct.features && (
                  <div>
                    <h5 className="font-medium text-secondary-900 mb-2">Features:</h5>
                    <ul className="list-disc list-inside text-secondary-600 space-y-1">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">Inquiry Details</h3>
                <button
                  onClick={() => setShowInquiryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Name</label>
                    <p className="text-secondary-900">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Email</label>
                    <p className="text-secondary-900">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Phone</label>
                    <p className="text-secondary-900">{selectedInquiry.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Subject</label>
                    <p className="text-secondary-900">{selectedInquiry.subject || 'General Inquiry'}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Message</label>
                  <p className="text-secondary-900 bg-gray-50 p-4 rounded-lg">{selectedInquiry.message}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700">Date</label>
                  <p className="text-secondary-900">{formatDate(selectedInquiry.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-secondary-900">
                  {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddProductModal(false);
                    resetProductForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleProductFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Feed Supplements">Feed Supplements</option>
                      <option value="Health Supplements">Health Supplements</option>
                      <option value="Nutritional Supplements">Nutritional Supplements</option>
                      <option value="Veterinary Medicines">Veterinary Medicines</option>
                      <option value="Feed Additives">Feed Additives</option>
                      <option value="Vitamins & Minerals">Vitamins & Minerals</option>
                      <option value="Digestive Health">Digestive Health</option>
                      <option value="Immunity Boosters">Immunity Boosters</option>
                      <option value="Growth Promoters">Growth Promoters</option>
                      <option value="Reproductive Health">Reproductive Health</option>
                      <option value="Health Monitoring">Health Monitoring</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter brief product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Product Description *
                  </label>
                  <textarea
                    name="productDescription"
                    value={productForm.productDescription}
                    onChange={handleProductFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter detailed product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Uses *
                  </label>
                  <textarea
                    name="uses"
                    value={productForm.uses}
                    onChange={handleProductFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter product uses and applications"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Benefits *
                  </label>
                  <textarea
                    name="benefits"
                    value={productForm.benefits}
                    onChange={handleProductFormChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter product benefits"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductFormChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter price (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Product Images (Max 5)
                    </label>
                    <input
                      type="file"
                      name="images"
                      onChange={handleProductFormChange}
                      accept="image/*"
                      multiple
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Select up to 5 images. First image will be the main product image.
                    </p>
                    {isEditMode && selectedProduct?.images && selectedProduct.images.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-2">Current images:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.images.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt={image.alt}
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {productForm.images && productForm.images.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 mb-2">Selected files:</p>
                        <div className="text-xs text-gray-500">
                          {Array.from(productForm.images).map((file, index) => (
                            <div key={index}>{file.name}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Features
                  </label>
                  <textarea
                    name="features"
                    value={productForm.features}
                    onChange={handleProductFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter features separated by commas (e.g., Organic, Veterinary approved, Easy to use)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter each feature separated by a comma
                  </p>
                </div>

                <div className="flex space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProductModal(false);
                      resetProductForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={productFormLoading}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {productFormLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {isEditMode ? 'Updating...' : 'Creating...'}
                      </div>
                    ) : (
                      isEditMode ? 'Update Product' : 'Create Product'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
