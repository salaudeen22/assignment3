# VIBE E-Commerce Cart Application

A full-stack e-commerce shopping cart application with product browsing, cart management, and checkout functionality.

## Screenshots

![Application Screenshot 1](https://drive.google.com/uc?export=view&id=15fVVHEdvrYQ3HSrcdjCSMCJ2JeKT6WN0)

![Application Screenshot 2](https://drive.google.com/uc?export=view&id=1Gtg05JwLa8gTZybc3dLR_4zAw67MJThY)

## Features

- Browse products with images and descriptions
- Add products to shopping cart
- Update product quantities in cart
- Remove items from cart
- Checkout process with customer information
- Order receipt generation
- Responsive design with modern UI
- Real-time cart count updates
- Error handling and loading states

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- dotenv for environment configuration

### Frontend
- React 19
- Vite for build tooling
- Tailwind CSS for styling
- Modern React hooks (useState, useEffect)

## Prerequisites

Before running this application, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:

```
PORT=5002
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5002`

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:5173`

## Seeding the Database

To populate the database with sample products:

```bash
cd backend
npm run seed
```

This will add 10 sample products to your MongoDB database including:
- Wireless Headphones
- Smart Watch
- Laptop Backpack
- Mechanical Keyboard
- USB-C Hub
- Portable Charger
- Wireless Mouse
- Phone Case
- Bluetooth Speaker
- Webcam HD

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID

### Cart

- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add item to cart
  - Body: `{ "productId": "product_id" }`
- `PUT /api/cart/:itemId` - Update cart item quantity
  - Body: `{ "quantity": number }`
- `DELETE /api/cart/:itemId` - Remove item from cart
- `POST /api/cart/checkout` - Process checkout
  - Body: `{ "name": "customer_name", "email": "customer_email" }`

## Project Structure

```
assignment/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── cartController.js  # Cart business logic
│   │   └── productController.js # Product business logic
│   ├── models/
│   │   ├── Cart.js            # Cart schema
│   │   └── Product.js         # Product schema
│   ├── routes/
│   │   ├── cartRoutes.js      # Cart API routes
│   │   └── productRoutes.js   # Product API routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server entry point
│   ├── seed.js                # Database seeding script
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Cart.jsx           # Cart sidebar component
    │   │   ├── CartItem.jsx       # Individual cart item
    │   │   ├── CheckoutModal.jsx  # Checkout form modal
    │   │   ├── ProductCard.jsx    # Product display card
    │   │   ├── ProductGrid.jsx    # Products grid layout
    │   │   └── ReceiptModal.jsx   # Order receipt modal
    │   ├── services/
    │   │   └── api.js             # API service functions
    │   ├── App.jsx                # Main application component
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Global styles
    ├── vite.config.js             # Vite configuration
    └── package.json
```

## Environment Variables

### Backend (.env)

- `PORT` - Server port number (default: 5002)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment mode (development/production)

## Available Scripts

### Backend

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server with hot reload (watch mode)
- `npm run seed` - Seed the database with sample products

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Schema

### Product Model
- name (String, required)
- price (Number, required)
- description (String)
- image (String)
- category (String)
- stock (Number, default: 0)
- timestamps (createdAt, updatedAt)

### Cart Model
- items (Array)
  - product (ObjectId ref: Product)
  - quantity (Number)
  - price (Number)
- totalAmount (Number, default: 0)
- timestamps (createdAt, updatedAt)

## Features in Detail

### Product Browsing
- Grid layout displaying all available products
- Product images from Unsplash
- Price and description information
- Stock availability
- Category filtering

### Shopping Cart
- Sticky sidebar on desktop view
- Real-time cart count badge
- Quantity adjustment controls
- Item removal
- Subtotal and tax calculation
- Total amount display

### Checkout Process
- Customer name and email collection
- Order summary review
- Cart editing during checkout
- Receipt generation with order details
- Automatic cart clearing after successful checkout

## Error Handling

The application includes comprehensive error handling:
- Network request failures
- Database connection errors
- Validation errors
- User-friendly error messages
- Console logging for debugging

## License

MIT

## Author

Salaudeen N
