// backend/src/routes/sellerRoutes.js

import express from 'express';
import {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { sellerProtect } from '../middlewares/sellerMiddleware.js';
import { getSellerOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

// Apply seller protection middleware to all routes in this router
router.use(sellerProtect);

// GET /api/seller/products - List all products for a seller
router.get('/products', listProducts);

// POST /api/seller/products - Add a new product
router.post('/products', addProduct);

// PUT /api/seller/products/:id - Update product details
router.put('/products/:id', updateProduct);

// DELETE /api/seller/products/:id - Delete a product
router.delete('/products/:id', deleteProduct);
router.get('/orders', protect, roleProtect('seller'), getSellerOrders);
router.put('/orders/:id', protect, roleProtect('seller'), updateOrderStatus);


export default router;
