const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} = require('../controllers/productController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');
const { uploadSingle, uploadMultiple, handleUploadError } = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Public routes
// @route   GET /api/products
// @desc    Get all products with filtering, sorting, and pagination
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/categories
// @desc    Get all product categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProduct);

// Protected routes (Admin only)
// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only)
router.post('/', authenticateAdmin, uploadMultiple, handleUploadError, createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin only)
router.put('/:id', authenticateAdmin, uploadMultiple, handleUploadError, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Admin only)
router.delete('/:id', authenticateAdmin, deleteProduct);

module.exports = router;
