const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected:', result.rows[0]);
  }
});

// Routes

// Get all flat numbers
app.get('/api/flats', async (req, res) => {
  try {
    const flats = [];
    for (let floor = 1; floor <= 5; floor++) {
      for (let flat = 1; flat <= 16; flat++) {
        const flatNumber = parseInt(`${floor}0${flat}`);
        flats.push(flatNumber);
      }
    }
    res.json(flats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  const { flatNumber, items, totalAmount } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO orders (flat_number, items, total_amount, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [flatNumber, JSON.stringify(items), totalAmount, 'pending']
    );
    
    // Send notification (in production, use email service)
    console.log(`New order from flat ${flatNumber}:`, items);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders for specific flat
app.get('/api/orders/flat/:flatNumber', async (req, res) => {
  const { flatNumber } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE flat_number = $1 ORDER BY created_at DESC',
      [flatNumber]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get all orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get orders by flat
app.get('/api/admin/orders/flat/:flatNumber', async (req, res) => {
  const { flatNumber } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE flat_number = $1 ORDER BY created_at DESC',
      [flatNumber]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update order status
app.patch('/api/admin/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, orderId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
