# Frontend Client - Simple E-commerce Platform

Modern, lightweight React app for product browsing, cart, checkout, auth, and orders.

## Stack
- React 18
- react-router-dom v6
- Vanilla CSS (no heavy UI framework)

## Run locally
- Copy `.env.example` to `.env` and set REACT_APP_API_BASE_URL if needed.
  - If not set, the app uses a CRA dev proxy to `http://localhost:3001`.
- Install dependencies: `npm install`
- Start dev server: `npm start` (http://localhost:3000)

## Environment
- REACT_APP_API_BASE_URL: Base URL for backend. Example: `http://localhost:3001`

## Features
- User auth: Login and Register
- Product listing and details
- Persistent cart sidebar
- Checkout flow (creates an order)
- Order history

## Routes
- `/` Home (product list + search)
- `/product/:id` Product detail
- `/login`, `/register` Authentication
- `/checkout` Checkout (protected)
- `/orders` Order history (protected)

## Theming
- Light modern theme using CSS variables in `src/App.css`
- Colors: primary #1976D2, secondary #424242, accent #FFC107

## Code structure
- `src/services/api.js` API client for auth/products/cart/orders
- `src/contexts/AuthContext.js` Auth state and actions
- `src/contexts/CartContext.js` Cart state synced with backend
- `src/components/*` Navbar, ProductCard, CartSidebar, ProtectedRoute
- `src/pages/*` Home, ProductDetail, Login, Register, Checkout, Orders
- `src/utils/format.js` Small helpers (e.g., currency formatting)
