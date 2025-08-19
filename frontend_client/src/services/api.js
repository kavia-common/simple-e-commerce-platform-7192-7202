import { getApiBaseUrl } from '../config';

const API_BASE = getApiBaseUrl();

function getAuthToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  const token = getAuthToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json().catch(() => null);
  } else {
    data = await res.text().catch(() => null);
  }

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText || 'Request failed';
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// PUBLIC_INTERFACE
export const AuthAPI = {
  /** Register new user */
  async register({ name, email, password }) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
  /** Login user and return token and user (if provided) */
  async login({ email, password }) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

// PUBLIC_INTERFACE
export const ProductsAPI = {
  /** List products with optional search query */
  async list(q = '') {
    const qs = q ? `?q=${encodeURIComponent(q)}` : '';
    return request(`/products${qs}`);
  },
  /** Get product by id */
  async get(id) {
    return request(`/products/${id}`);
  },
};

// PUBLIC_INTERFACE
export const CartAPI = {
  /** Get current user's cart */
  async get() {
    return request('/cart');
  },
  /** Clear cart */
  async clear() {
    return request('/cart', { method: 'DELETE' });
  },
  /** Add item to cart */
  async add({ productId, quantity }) {
    return request('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },
  /** Update item quantity */
  async update(productId, quantity) {
    return request(`/cart/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },
  /** Remove item from cart */
  async remove(productId) {
    return request(`/cart/items/${productId}`, { method: 'DELETE' });
  },
};

// PUBLIC_INTERFACE
export const OrdersAPI = {
  /** List user's orders */
  async list() {
    return request('/orders');
  },
  /** Get specific order */
  async get(id) {
    return request(`/orders/${id}`);
  },
  /** Checkout current cart to place order */
  async checkout() {
    return request('/orders/checkout', { method: 'POST' });
  },
};

// PUBLIC_INTERFACE
export async function health() {
  /** Health check */
  return request('/');
}
