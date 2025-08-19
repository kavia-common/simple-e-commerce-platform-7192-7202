import React, { useEffect, useState } from 'react';
import { OrdersAPI } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    OrdersAPI.list()
      .then((res) => setOrders(Array.isArray(res) ? res : (res?.orders || [])))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Your Orders</h1>
      {loading ? <p className="muted">Loading orders...</p> : null}
      {orders.length === 0 && !loading ? <p className="muted">No orders found.</p> : null}
      <div className="orders">
        {orders.map((o) => (
          <div key={o.id} className="card order">
            <div className="order__header">
              <div>
                <div className="muted">Order</div>
                <strong>#{o.id}</strong>
              </div>
              <div>
                <div className="muted">Total</div>
                <strong>{o.currency || 'USD'} {Number(o.total || 0).toFixed(2)}</strong>
              </div>
              <div>
                <div className="muted">Date</div>
                <strong>{o.createdAt ? new Date(o.createdAt).toLocaleString() : '-'}</strong>
              </div>
            </div>
            <div className="order__items">
              {(o.items || []).map((it) => (
                <div key={it.productId || it.id} className="order__item">
                  <span>{it.name} × {it.quantity}</span>
                  <span>{o.currency || 'USD'} {(Number(it.price || 0) * (it.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
