import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Package, 
  Shield, 
  Truck, 
  Phone, 
  Mail, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  Check,
  Award,
  Clock,
  Users
} from 'lucide-react';
import { productService } from '../services/product';
import { inquiryService } from '../services/inquiry';
import { formatPrice, formatDate } from '../utils/helpers';
import { Loader } from '../components/Loader';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const result = await productService.getProduct(id);
      if (result.success) {
        setProduct(result.data.product);
      } else {
        toast.error('Product not found');
        navigate('/products');
      }
    } catch (error) {
      toast.error('Failed to fetch product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const result = await productService.getProducts({
        category: product.category,
        limit: 4
      });
      if (result.success) {
        // Filter out current product
        const filtered = result.data.products.filter(p => p._id !== product._id);
        setRelatedProducts(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);

    try {
      const inquiryPayload = {
        ...inquiryData,
        subject: `Inquiry about ${product.name}`,
        message: `${inquiryData.message}\n\nProduct: ${product.name}\nPrice: ${formatPrice(product.price)}`
      };

      const result = await inquiryService.submitInquiry(inquiryPayload);
      
      if (result.success) {
        toast.success('Inquiry sent successfully! We will contact you soon.');
        setShowInquiryForm(false);
        setInquiryData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(result.message || 'Failed to send inquiry');
      }
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setInquiryLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInquiryData({
      ...inquiryData,
      [e.target.name]: e.target.value
    });
  };

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.category.toLowerCase()} product from Anilife Healthcare`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Product link copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy link');
      }
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const nextImage = () => {
    const images = product?.images || [];
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    const images = product?.images || [];
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const getCurrentImage = () => {
    if (product?.images && product.images.length > 0) {
      return product.images[currentImageIndex];
    }
    return {
      url: product?.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image',
      alt: product?.name || 'Product Image'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={product?.name || 'Product Details'}
        description={product?.productDescription || product?.description || `${product?.name} - High-quality animal nutrition supplement from AniLife Healthcare. Expert formulated for optimal animal health and performance.`}
        keywords={`${product?.name}, ${product?.category}, animal nutrition supplement, livestock supplement, ${product?.category} nutrition, AniLife Healthcare products, veterinary supplements, animal health products, feed supplements, organic animal nutrition`}
        url={`/products/${product?._id}`}
        image={product?.images?.[0] || '/logo.png'}
        type="product"
      />
      <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">Back to Products</span>
          </button>
          <nav className="text-xs sm:text-sm text-gray-500">
            <span>Products</span> / <span>{product.category}</span> / <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Enhanced Product Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <img
                src={getCurrentImage().url}
                alt={getCurrentImage().alt}
                className="w-full h-64 sm:h-80 lg:h-96 object-contain cursor-zoom-in p-2 sm:p-4"
                onClick={() => setShowImageModal(true)}
              />
              
              {/* Image Navigation */}
              {product?.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </>
              )}
              
              {/* Zoom Icon */}
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              
              {/* Image Counter */}
              {product?.images && product.images.length > 1 && (
                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black bg-opacity-75 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product?.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-primary-600 ring-2 ring-primary-200' 
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-contain p-1 bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={shareProduct}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button 
                onClick={toggleWishlist}
                className={`flex items-center justify-center px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base ${
                  isWishlisted 
                    ? 'border-red-300 bg-red-50 text-red-600' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* Enhanced Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full w-fit">
                  {product.category}
                </span>
                
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
            </div>

            
            <div>
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
                  {['description', 'product-details', 'uses', 'benefits', 'features', 'specifications'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm capitalize whitespace-nowrap ${
                        activeTab === tab
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab === 'product-details' ? 'Product Details' : tab.replace('-', ' ')}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-4 sm:mt-6">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.description}</p>
                  </div>
                )}

                {activeTab === 'product-details' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {product.productDescription || 'No detailed description available.'}
                    </div>
                  </div>
                )}

                {activeTab === 'uses' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Uses & Applications</h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {product.uses || 'No uses information available.'}
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {product.benefits || 'No benefits information available.'}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    {product.features && product.features.length > 0 ? (
                      <ul className="space-y-3">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No features listed for this product.</p>
                    )}
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">Product Details</h4>
                      <div className="text-xs sm:text-sm space-y-1">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Category:</span>
                          <span className="text-gray-900 text-right">{product.category}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">SKU:</span>
                          <span className="text-gray-900 text-right">ANL-{product._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Availability:</span>
                          <span className="text-green-600 text-right">In Stock</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setShowInquiryForm(true)}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 font-semibold transition-colors"
              >
                Inquire About This Product
              </button>
              <div className="flex space-x-3">
                <a
                  href="tel:+1234567890"
                  className="flex-1 flex items-center justify-center border border-primary-600 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
                <a
                  href="mailto:info@anilifehealthcare.com"
                  className="flex-1 flex items-center justify-center border border-primary-600 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/products/${relatedProduct._id}`)}
                >
                  <div className="bg-gray-50 p-3 sm:p-4">
                    <img
                      src={relatedProduct.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={relatedProduct.name}
                      className="w-full h-32 sm:h-40 object-contain"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-primary-600 font-bold">
                        {relatedProduct.price ? formatPrice(relatedProduct.price) : 'Contact for Price'}
                      </span>
                      <span className="text-xs text-gray-500">{relatedProduct.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Product Inquiry</h3>
                <button
                  onClick={() => setShowInquiryForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Inquiring about:</p>
                <p className="font-medium text-gray-900">{product.name}</p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={inquiryData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={inquiryData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={inquiryData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    value={inquiryData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Please let us know what you'd like to know about this product..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={inquiryLoading}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {inquiryLoading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="relative max-w-4xl max-h-full w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-gray-300 text-xl sm:text-2xl"
            >
              ×
            </button>
            <img
              src={getCurrentImage().url}
              alt={getCurrentImage().alt}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain mx-auto"
            />
            {product?.images && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default ProductDetail;
