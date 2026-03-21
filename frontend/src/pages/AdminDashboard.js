import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard({ onLogout }) {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [flatOrders, setFlatOrders] = useState([]);
  const [flats, setFlats] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAllOrders();
    fetchFlats();
  }, []);

  const fetchAllOrders = () => {
    axios.get('/api/admin/orders')
      .then(res => setAllOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const fetchFlats = () => {
    axios.get('/api/flats')
      .then(res => setFlats(res.data))
      .catch(err => console.error('Error fetching flats:', err));
  };

  const fetchFlatOrders = (flatNumber) => {
    axios.get(`/api/admin/orders/flat/${flatNumber}`)
      .then(res => setFlatOrders(res.data))
      .catch(err => console.error('Error fetching flat orders:', err));
  };

  const handleFlatSelect = (flatNumber) => {
    setSelectedFlat(flatNumber);
    fetchFlatOrders(flatNumber);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    axios.patch(`/api/admin/orders/${orderId}`, { status: newStatus })
      .then(() => {
        fetchAllOrders();
        if (selectedFlat) {
          fetchFlatOrders(selectedFlat);
        }
      })
      .catch(err => alert('Error updating order: ' + err.message));
  };

  const displayOrders = selectedFlat ? flatOrders : allOrders;
  const filteredOrders = filterStatus === 'all' 
    ? displayOrders 
    : displayOrders.filter(order => order.status === filterStatus);

  const stats = {
    totalOrders: allOrders.length,
    pendingOrders: allOrders.filter(o => o.status === 'pending').length,
    completedOrders: allOrders.filter(o => o.status === 'completed').length,
    totalRevenue: allOrders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0),
  };

  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>📊 Admin Dashboard</h1>
        <button onClick={onLogout} className="btn btn-logout">Logout</button>
      </header>

      <div className="admin-content">
        <section className="stats-section">
          <h2>Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Orders</p>
              <p className="stat-value">{stats.totalOrders}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Pending</p>
              <p className="stat-value pending">{stats.pendingOrders}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Completed</p>
              <p className="stat-value completed">{stats.completedOrders}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Total Revenue</p>
              <p className="stat-value">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </section>

        <section className="flat-filter-section">
          <h3>Filter by Flat</h3>
          <div className="flat-selector">
            <button 
              className={`flat-btn ${selectedFlat === null ? 'active' : ''}`}
              onClick={() => {
                setSelectedFlat(null);
                setFlatOrders([]);
              }}
            >
              All Flats
            </button>
            {flats.map(flat => (
              <button
                key={flat}
                className={`flat-btn ${selectedFlat === flat ? 'active' : ''}`}
                onClick={() => handleFlatSelect(flat)}
              >
                Flat {flat}
              </button>
            ))}
          </div>
        </section>

        <section className="status-filter-section">
          <h3>Filter by Status</h3>
          <div className="status-buttons">
            {['all', 'pending', 'accepted', 'completed', 'rejected'].map(status => (
              <button
                key={status}
                className={`status-btn ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </section>

        <section className="orders-section">
          <h2>{selectedFlat ? `Orders for Flat ${selectedFlat}` : 'All Orders'}</h2>
          {filteredOrders.length === 0 ? (
            <p className="empty-message">No orders found</p>
          ) : (
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Flat #</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.flat_number}</td>
                      <td>
                        <details>
                          <summary>{JSON.parse(order.items).length} items</summary>
                          <ul>
                            {JSON.parse(order.items).map((item, idx) => (
                              <li key={idx}>{item.name} x{item.quantity}</li>
                            ))}
                          </ul>
                        </details>
                      </td>
                      <td>₹{parseFloat(order.total_amount).toFixed(2)}</td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className={`status-select status-${order.status}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-small btn-view"
                          onClick={() => alert(`Order Details:\n${JSON.stringify(order, null, 2)}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
