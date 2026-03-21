import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GROCERY_ITEMS = [
  { id: 1, name: 'Milk 1L', category: 'Dairy', price: 60 },
  { id: 2, name: 'Tea Powder 250g', category: 'Tea & Coffee', price: 120 },
  { id: 3, name: 'Eggs (12)', category: 'Dairy', price: 80 },
  { id: 4, name: 'Tomatoes 500g', category: 'Vegetables', price: 30 },
  { id: 5, name: 'Onions 500g', category: 'Vegetables', price: 25 },
  { id: 6, name: 'Rice 1kg', category: 'Grains', price: 100 },
  { id: 7, name: 'Dal 500g', category: 'Grains', price: 80 },
  { id: 8, name: 'Oil 1L', category: 'Oils', price: 150 },
  { id: 9, name: 'Salt 1kg', category: 'Spices', price: 20 },
  { id: 10, name: 'Sugar 1kg', category: 'Spices', price: 50 },
  { id: 11, name: 'Coffee Powder 200g', category: 'Tea & Coffee', price: 180 },
  { id: 12, name: 'Instant Coffee 100g', category: 'Tea & Coffee', price: 220 },
  { id: 13, name: 'Butter 250g', category: 'Dairy', price: 250 },
  { id: 14, name: 'Cheese 200g', category: 'Dairy', price: 300 },
  { id: 15, name: 'Wheat Flour 1kg', category: 'Flours', price: 60 },
  { id: 16, name: 'Maida (All Purpose Flour) 1kg', category: 'Flours', price: 50 },
  { id: 17, name: 'Apple 500g', category: 'Fruits', price: 80 },
  { id: 18, name: 'Banana 500g', category: 'Fruits', price: 40 },
  { id: 19, name: 'Orange 500g', category: 'Fruits', price: 60 },
  { id: 20, name: 'Potato 1kg', category: 'Vegetables', price: 35 },
  { id: 21, name: 'Rice Flour 500g', category: 'Flours', price: 70 },
  { id: 22, name: 'Corn Flour 500g', category: 'Flours', price: 65 },
  { id: 23, name: 'Chickpea Flour 500g', category: 'Flours', price: 80 },
];

function UserHome({ flatNumber, onLogout }) {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orders, setOrders] = useState([]);

  const categories = ['All', ...new Set(GROCERY_ITEMS.map(item => item.category))];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get(`/api/orders/flat/${flatNumber}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const filteredItems = selectedCategory === 'All' 
    ? GROCERY_ITEMS 
    : GROCERY_ITEMS.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart');
      return;
    }

    const orderData = {
      flatNumber,
      items: cart,
      totalAmount,
    };

    axios.post('/api/orders', orderData)
      .then(res => {
        alert('Order placed successfully! Order ID: ' + res.data.id);
        setCart([]);
        fetchOrders();
      })
      .catch(err => {
        alert('Error placing order: ' + err.message);
      });
  };

  return (
    <div className="user-home">
      <header className="header">
        <h1>🏢 Apartment Grocery - Flat {flatNumber}</h1>
        <button onClick={onLogout} className="btn btn-logout">Logout</button>
      </header>

      <div className="main-content">
        <div className="shopping-section">
          <h2>Available Items</h2>
          
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="item-card">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="btn btn-add-cart"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="cart-section">
          <h2>Shopping Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="empty-message">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">₹{item.price}</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <p className="item-total">₹{item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="btn-remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <p>Total: <strong>₹{totalAmount}</strong></p>
                <button onClick={handlePlaceOrder} className="btn btn-checkout">
                  Place Order
                </button>
              </div>
            </>
          )}

          <h3>Order History</h3>
          {orders.length === 0 ? (
            <p className="empty-message">No orders yet</p>
          ) : (
            <div className="order-history">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="order-item">
                  <p className="order-id">Order #{order.id}</p>
                  <p className="order-status">Status: <span className={`status-${order.status}`}>{order.status}</span></p>
                  <p className="order-date">{new Date(order.created_at).toLocaleDateString()}</p>
                  <p className="order-amount">₹{order.total_amount}</p>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default UserHome;
