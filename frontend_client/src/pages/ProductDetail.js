import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    ProductsAPI.get(id).then(setProduct).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container"><p className="muted">Loading...</p></div>;
  if (!product) return <div className="container"><p className="muted">Product not found.</p></div>;

  return (
    <div className="container">
      <div className="product">
        <div className="product__image" style={{ backgroundImage: `url(${product.image || 'https://via.placeholder.com/600x400?text=Product'})` }} />
        <div className="product__info">
          <h1 className="product__title">{product.name}</h1>
          <p className="product__price">{product.currency || 'USD'} {Number(product.price || 0).toFixed(2)}</p>
          <p className="product__desc">{product.description || 'No description available.'}</p>
          <div className="product__actions">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="btn btn--primary" onClick={() => addItem(product.id, qty)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
