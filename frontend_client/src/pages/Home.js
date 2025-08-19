import React, { useEffect, useState } from 'react';
import { ProductsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    ProductsAPI.list().then(setProducts).finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ProductsAPI.list(q);
      setProducts(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="search" onSubmit={handleSearch}>
        <input
          className="input"
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn--primary" type="submit">Search</button>
      </form>
      {loading ? <p className="muted">Loading products...</p> : null}
      <div className="grid">
        {Array.isArray(products) && products.length > 0 ? products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={(id) => addItem(id, 1)} />
        )) : (!loading ? <p className="muted">No products found.</p> : null)}
      </div>
    </div>
  );
}
