import { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import * as api from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Load products and cart on mount
  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  // Update cart count
  useEffect(() => {
    if (cart && cart.items) {
      const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  }, [cart]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.fetchProducts();
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      setCartLoading(true);
      const response = await api.fetchCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await api.addToCart(productId);
      setCart(response.data);
      setError(null);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const response = await api.updateCartItem(itemId, quantity);
      setCart(response.data);
      setError(null);
    } catch (error) {
      console.error('Error updating cart:', error);
      setError('Failed to update cart. Please try again.');
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await api.removeFromCart(itemId);
      setCart(response.data);
      setError(null);
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError('Failed to remove item. Please try again.');
    }
  };

  const handleCheckout = async (name, email) => {
    try {
      const response = await api.checkout(name, email);
      setReceipt(response.data);
      setShowCheckout(false);
      setCart(null);
      loadCart();
      setError(null);
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                VIBE
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Premium Collection</p>
            </div>
            <div className="relative">
              <button className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-all hover:scale-105 p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-linear-to-r from-gray-900 to-gray-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Error message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-900 px-5 py-4 relative rounded-r-lg shadow-sm">
            <span className="block text-sm font-medium">{error}</span>
            <button
              className="absolute top-2 right-2 text-red-400 hover:text-red-900 transition-colors p-1.5 rounded-md hover:bg-red-100"
              onClick={() => setError(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Products section */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Our Collection</h2>
              <p className="text-sm text-gray-600">Discover premium products curated just for you</p>
            </div>
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              loading={loading}
            />
          </div>

          {/* Cart section */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Cart
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
                onCheckout={() => setShowCheckout(true)}
                loading={cartLoading}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckout && cart && cart.items.length > 0 && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
        />
      )}

      {/* Receipt Modal */}
      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => setReceipt(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">VIBE</h3>
              <p className="text-xs text-gray-500">Premium Collection</p>
            </div>
            <p className="text-xs text-gray-400">
              &copy; 2024 Vibe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
