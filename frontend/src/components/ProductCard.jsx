import { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await onAddToCart(product._id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full shadow-md">Out of Stock</span>
          </div>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            Only {product.stock} left
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1.5">{product.category}</p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className={`text-xs font-medium px-5 py-2.5 rounded-lg transition-all duration-200 ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : adding
                ? 'bg-gray-400 text-white scale-95'
                : 'bg-gray-900 text-white hover:bg-gray-700 hover:shadow-md active:scale-95'
            }`}
          >
            {product.stock === 0 ? 'Sold Out' : adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
