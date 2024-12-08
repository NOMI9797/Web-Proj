// backend/src/controllers/orderController.js
import Order from '../models/Order.js';

// Controller function to get all orders for a seller
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user.id }); // Assuming sellerId is stored in the user model
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Controller function to update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update order status
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your orders' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
export const createOrder = async (req, res) => {
    try {
      const { items, totalAmount, shippingDetails } = req.body;
      const userId = req.user.id; // Assuming user is authenticated via middleware
  
      const newOrder = new Order({
        userId,
        items,
        totalAmount,
        shippingDetails,
        status: 'pending', // Default status
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      console.error('Order creation error:', err);
      res.status(500).json({ message: 'Failed to create order, please try again' });
    }
  };
  
  // Get all orders for the customer
  export const getOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await Order.find({ userId }).populate('items.product');
      res.status(200).json(orders);
    } catch (err) {
      console.error('Get orders error:', err);
      res.status(500).json({ message: 'Failed to retrieve orders' });
    }
  };
  
  // Get a specific order's details
  export const getOrderDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate('items.product');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.status(200).json(order);
    } catch (err) {
      console.error('Get order details error:', err);
      res.status(500).json({ message: 'Failed to retrieve order details' });
    }
  };
