import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import connectDB from './config/db.js';

dotenv.config();

const products = [
  {
    name: 'Wireless Headphones',
    price: 89.99,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 50
  },
  {
    name: 'Smart Watch',
    price: 299.99,
    description: 'Fitness tracker with heart rate monitor and GPS',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 30
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    description: 'Water-resistant backpack with padded laptop compartment',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 100
  },
  {
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'RGB mechanical gaming keyboard with Cherry MX switches',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 45
  },
  {
    name: 'USB-C Hub',
    price: 39.99,
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 75
  },
  {
    name: 'Portable Charger',
    price: 29.99,
    description: '20000mAh power bank with fast charging support',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 120
  },
  {
    name: 'Wireless Mouse',
    price: 34.99,
    description: 'Ergonomic wireless mouse with adjustable DPI',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 80
  },
  {
    name: 'Phone Case',
    price: 19.99,
    description: 'Slim protective case with military-grade drop protection',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 200
  },
  {
    name: 'Bluetooth Speaker',
    price: 59.99,
    description: 'Waterproof portable speaker with 360° sound',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 65
  },
  {
    name: 'Webcam HD',
    price: 79.99,
    description: '1080p webcam with auto-focus and noise reduction',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 40
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await Cart.deleteMany();

    console.log('Cleared existing data');

    // Insert products
    await Product.insertMany(products);

    console.log('Database seeded successfully!');
    console.log(`${products.length} products added`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
