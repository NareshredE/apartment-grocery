import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UserHome from './pages/UserHome';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentFlat, setCurrentFlat] = useState(null);

  const handleUserLogin = (flatNumber) => {
    setCurrentFlat(flatNumber);
    setIsAdmin(false);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentFlat(null);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentFlat(null);
  };

  return (
    <div className="App">
      {!currentFlat && !isAdmin ? (
        <LoginPage onUserLogin={handleUserLogin} onAdminLogin={handleAdminLogin} />
      ) : isAdmin ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <UserHome flatNumber={currentFlat} onLogout={handleLogout} />
      )}
    </div>
  );
}

function LoginPage({ onUserLogin, onAdminLogin }) {
  const [flatNumber, setFlatNumber] = useState('');
  const [flats, setFlats] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    // Fetch flat numbers
    axios.get('/api/flats')
      .then(res => setFlats(res.data))
      .catch(err => console.error('Error fetching flats:', err));
  }, []);

  const handleFlatLogin = () => {
    if (flatNumber) {
      onUserLogin(parseInt(flatNumber));
    }
  };

  const handleAdminLogin = () => {
    // Simple admin password check (in production, use proper auth)
    if (adminPassword === 'admin123') {
      onAdminLogin();
    } else {
      alert('Invalid admin password');
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">🏢 Apartment Grocery</h1>
      
      <div className="login-box">
        <h2>Resident Login</h2>
        <select 
          value={flatNumber} 
          onChange={(e) => setFlatNumber(e.target.value)}
          className="select-flat"
        >
          <option value="">Select Your Flat Number</option>
          {flats.map(flat => (
            <option key={flat} value={flat}>
              Flat {flat}
            </option>
          ))}
        </select>
        <button onClick={handleFlatLogin} className="btn btn-primary">
          Enter as Resident
        </button>
      </div>

      <div className="login-box admin-login">
        <h2>Admin Access</h2>
        <input 
          type="password" 
          placeholder="Enter admin password" 
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
          className="input-field"
        />
        <button onClick={handleAdminLogin} className="btn btn-admin">
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default App;
