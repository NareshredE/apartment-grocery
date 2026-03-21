-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  flat_number INTEGER NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_flat_number ON orders(flat_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Sample data for grocery items (can be used by frontend)
CREATE TABLE IF NOT EXISTS grocery_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  price DECIMAL(10, 2),
  image_url TEXT,
  available BOOLEAN DEFAULT true
);

-- Insert sample grocery items
INSERT INTO grocery_items (name, category, price) VALUES
  ('Milk 1L', 'Dairy', 60),
  ('Tea Powder 250g', 'Tea & Coffee', 120),
  ('Eggs (12)', 'Dairy', 80),
  ('Tomatoes 500g', 'Vegetables', 30),
  ('Onions 500g', 'Vegetables', 25),
  ('Rice 1kg', 'Grains', 100),
  ('Dal 500g', 'Grains', 80),
  ('Oil 1L', 'Oils', 150),
  ('Salt 1kg', 'Spices', 20),
  ('Sugar 1kg', 'Spices', 50),
  ('Coffee Powder 200g', 'Tea & Coffee', 180),
  ('Instant Coffee 100g', 'Tea & Coffee', 220),
  ('Butter 250g', 'Dairy', 250),
  ('Cheese 200g', 'Dairy', 300),
  ('Wheat Flour 1kg', 'Flours', 60),
  ('Maida (All Purpose Flour) 1kg', 'Flours', 50),
  ('Apple 500g', 'Fruits', 80),
  ('Banana 500g', 'Fruits', 40),
  ('Orange 500g', 'Fruits', 60),
  ('Potato 1kg', 'Vegetables', 35),
  ('Rice Flour 500g', 'Flours', 70),
  ('Corn Flour 500g', 'Flours', 65),
  ('Chickpea Flour 500g', 'Flours', 80)
ON CONFLICT DO NOTHING;
