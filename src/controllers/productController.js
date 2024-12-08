// backend/src/controllers/productController.js

import Product from '../models/Product.js';

// @desc    List all products for a seller
// @route   GET /api/seller/products
// @access  Private (Seller)
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// @desc    Add a new product
// @route   POST /api/seller/products
// @access  Private (Seller)
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !images || !stock) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new product
    const newProduct = new Product({
      seller: req.user._id,
      name,
      description,
      price,
      category,
      images,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
};

// @desc    Update product details
// @route   PUT /api/seller/products/:id
// @access  Private (Seller)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, images, stock } = req.body;

    // Find product by ID and ensure it belongs to the seller
    const product = await Product.findOne({ _id: id, seller: req.user._id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (images) product.images = images;
    if (stock !== undefined) product.stock = stock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/seller/products/:id
// @access  Private (Seller)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the product
    const product = await Product.findOneAndDelete({ _id: id, seller: req.user._id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
