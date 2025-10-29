const API_URL = 'http://localhost:5002/api';

// Products API
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

// Cart API
export const fetchCart = async (userId = 'guest') => {
  const response = await fetch(`${API_URL}/cart?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
};

export const addToCart = async (productId, quantity = 1, userId = 'guest') => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity, userId }),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
};

export const updateCartItem = async (itemId, quantity, userId = 'guest') => {
  const response = await fetch(`${API_URL}/cart/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity, userId }),
  });
  if (!response.ok) throw new Error('Failed to update cart item');
  return response.json();
};

export const removeFromCart = async (itemId, userId = 'guest') => {
  const response = await fetch(`${API_URL}/cart/${itemId}?userId=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to remove from cart');
  return response.json();
};

export const checkout = async (customerName, customerEmail, userId = 'guest') => {
  const response = await fetch(`${API_URL}/cart/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, customerName, customerEmail }),
  });
  if (!response.ok) throw new Error('Failed to process checkout');
  return response.json();
};
