// backend/src/middleware/sellerMiddleware.js

import { protect } from './authMiddleware.js'; // Existing authentication middleware

export const seller = (req, res, next) => {
  protect(req, res, () => {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied: Sellers only' });
    }
    next();
  });
};
