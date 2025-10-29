import { useState } from 'react';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    try {
      await onUpdateQuantity(item._id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      await onRemove(item._id);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="w-20 h-20 bg-gray-50 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{item.product.name}</h3>
        <p className="text-sm text-gray-600 font-medium mb-2">₹{item.product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border-2 border-gray-400 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-gray-900 bg-gray-50 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-lg"
              title="Decrease quantity"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-bold text-gray-900 border-x-2 border-gray-300 h-8 flex items-center justify-center bg-white">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={updating || item.quantity >= item.product.stock}
              className="w-8 h-8 flex items-center justify-center text-gray-900 bg-gray-50 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-lg"
              title="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={handleRemove}
            className="text-xs text-red-600 hover:text-white hover:bg-red-600 font-bold transition-all px-3 py-1.5 rounded-md border-2 border-red-300 hover:border-red-600"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">₹{(item.product.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CartItem;
