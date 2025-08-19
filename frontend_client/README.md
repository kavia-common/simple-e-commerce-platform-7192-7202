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

## Fixing "Invalid Host header" in development
This can happen when accessing the app via a tunnel (ngrok, cloudflared), a custom domain, or from within Docker/VM. Create React App’s dev server performs host checks for security.

To allow your host in local development:
1) Create `.env` from `.env.example`
2) Ensure these entries exist (only in development and trusted environments):
   - `HOST=0.0.0.0` (binds to all interfaces so tunnels/containers can reach it)
   - `DANGEROUSLY_DISABLE_HOST_CHECK=true` (disables host checking in dev; do NOT use in prod)
3) Optionally set `PUBLIC_URL` to your external dev URL if needed by asset paths.

Restart the dev server after changing `.env`.

Security note:
- Only use `DANGEROUSLY_DISABLE_HOST_CHECK=true` locally. Remove it for production builds or when exposing the dev server to untrusted networks.

## Environment
- REACT_APP_API_BASE_URL: Base URL for backend. Example: `http://localhost:3001`
- HOST (dev only): e.g., `0.0.0.0` to bind on all interfaces
- DANGEROUSLY_DISABLE_HOST_CHECK (dev only): set to `true` to bypass host check when behind tunnels/proxies
- PUBLIC_URL (optional): external base URL when served behind a proxy/tunnel

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
