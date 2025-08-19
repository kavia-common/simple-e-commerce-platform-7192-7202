import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  const { id, name, price, currency = 'USD', image } = product;
  return (
    <div className="card product-card">
      <Link to={`/product/${id}`} className="product-card__image-wrap" aria-label={`View ${name}`}>
        <div className="product-card__image" style={{ backgroundImage: `url(${image || 'https://via.placeholder.com/400x300?text=Product'})` }} />
      </Link>
      <div className="product-card__body">
        <h3 className="product-card__title">{name}</h3>
        <div className="product-card__meta">
          <span className="price">{currency} {Number(price || 0).toFixed(2)}</span>
        </div>
        <div className="product-card__actions">
          <Link className="btn btn--light" to={`/product/${id}`}>Details</Link>
          <button className="btn btn--primary" onClick={() => onAdd(id)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
