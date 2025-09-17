const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    let filter = { isActive: true };
    
    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Search filter
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    
    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Sort options
    let sort = {};
    switch (req.query.sortBy) {
      case 'price_asc':
        sort.price = 1;
        break;
      case 'price_desc':
        sort.price = -1;
        break;
      case 'name_asc':
        sort.name = 1;
        break;
      case 'name_desc':
        sort.name = -1;
        break;
      default:
        sort.createdAt = -1;
    }

    const products = await Product.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          current: page,
          total: totalPages,
          count: products.length,
          totalProducts: total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { product }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
  try {
    const { name, description, productDescription, uses, benefits, category, price, features } = req.body;
    
    let imageUrl = null;
    let imagePublicId = null;
    let images = [];

    // Handle multiple image upload
    if (req.files && req.files.length > 0) {
      try {
        // Upload all images to Cloudinary
        const uploadPromises = req.files.map((file, index) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'anilife-products',
                transformation: [
                  { width: 1200, height: 1200, crop: 'limit' },
                  { quality: 'auto', fetch_format: 'auto' }
                ]
              },
              (error, result) => {
                if (error) {
                  console.error(`Cloudinary upload error for image ${index}:`, error);
                  reject(error);
                } else {
                  resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                    alt: `${name} - Image ${index + 1}`
                  });
                }
              }
            );
            uploadStream.end(file.buffer);
          });
        });

        images = await Promise.all(uploadPromises);
        
        // Set primary image from first uploaded image
        if (images.length > 0) {
          imageUrl = images[0].url;
          imagePublicId = images[0].publicId;
        }
      } catch (uploadError) {
        console.error('Upload error details:', uploadError);
        return res.status(400).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      productDescription,
      uses,
      benefits,
      category,
      price: price ? parseFloat(price) : null,
      imageUrl,
      imagePublicId,
      images,
      features: features ? (typeof features === 'string' ? JSON.parse(features) : features) : []
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { name, description, productDescription, uses, benefits, category, price, features } = req.body;
    
    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (productDescription) product.productDescription = productDescription;
    if (uses) product.uses = uses;
    if (benefits) product.benefits = benefits;
    if (category) product.category = category;
    if (price !== undefined) product.price = price ? parseFloat(price) : null;
    if (features) product.features = typeof features === 'string' ? JSON.parse(features) : features;

    // Handle multiple image upload
    if (req.files && req.files.length > 0) {
      try {
        // Delete old images if they exist
        if (product.images && product.images.length > 0) {
          const deletePromises = product.images.map(image => 
            cloudinary.uploader.destroy(image.publicId)
          );
          await Promise.all(deletePromises);
        }
        
        // Also delete old single image if exists
        if (product.imagePublicId) {
          await cloudinary.uploader.destroy(product.imagePublicId);
        }

        // Upload new images
        const uploadPromises = req.files.map((file, index) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'anilife-products',
                transformation: [
                  { width: 1200, height: 1200, crop: 'limit' },
                  { quality: 'auto', fetch_format: 'auto' }
                ]
              },
              (error, result) => {
                if (error) {
                  console.error(`Cloudinary upload error for image ${index}:`, error);
                  reject(error);
                } else {
                  resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                    alt: `${product.name} - Image ${index + 1}`
                  });
                }
              }
            );
            uploadStream.end(file.buffer);
          });
        });

        const images = await Promise.all(uploadPromises);
        
        // Update product with new images
        product.images = images;
        
        // Set primary image from first uploaded image
        if (images.length > 0) {
          product.imageUrl = images[0].url;
          product.imagePublicId = images[0].publicId;
        }
      } catch (uploadError) {
        console.error('Upload error details in update:', uploadError);
        return res.status(400).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete images from Cloudinary if they exist
    try {
      // Delete multiple images
      if (product.images && product.images.length > 0) {
        const deletePromises = product.images.map(image => 
          cloudinary.uploader.destroy(image.publicId)
        );
        await Promise.all(deletePromises);
      }
      
      // Delete single image if exists
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }
    } catch (cloudinaryError) {
      console.error('Cloudinary deletion error:', cloudinaryError);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    
    res.status(200).json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
};
