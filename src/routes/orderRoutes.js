// backend/src/routes/orderRoutes.js

import express from 'express';
import { createOrder, getOrders, getOrderDetails } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Authentication middleware

const router = express.Router();

// Order Routes
router.post('/', protect, createOrder); // Create order
router.get('/', protect, getOrders); // Get all orders for the customer
router.get('/:id', protect, getOrderDetails); // Get details of a specific order

export default router;
