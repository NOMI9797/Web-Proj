import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';  // Add .js extension
import authRoutes from './src/routes/authRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js'; // Import seller routes


// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enables CORS for all origins
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerRoutes); // Use seller routes

// Root Route
app.get('/', (req, res) => {
   res.send('MERN Backend is Running');
});


// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
