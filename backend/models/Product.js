const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  productDescription: {
    type: String,
    required: [true, 'Detailed product description is required'],
    maxlength: [5000, 'Product description cannot exceed 5000 characters']
  },
  uses: {
    type: String,
    required: [true, 'Product uses are required'],
    maxlength: [3000, 'Uses cannot exceed 3000 characters']
  },
  benefits: {
    type: String,
    required: [true, 'Product benefits are required'],
    maxlength: [3000, 'Benefits cannot exceed 3000 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: [
      'Feed Supplements',
      'Health Supplements',
      'Nutritional Supplements',
      'Veterinary Medicines',
      'Feed Additives', 
      'Vitamins & Minerals',
      'Digestive Health',
      'Immunity Boosters',
      'Growth Promoters',
      'Reproductive Health',
      'Health Monitoring',
      'Other'
    ]
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  imagePublicId: {
    type: String,
    default: null
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  features: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add text index for search functionality
productSchema.index({ 
  name: 'text', 
  description: 'text', 
  category: 'text' 
});

module.exports = mongoose.model('Product', productSchema);
