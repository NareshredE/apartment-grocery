# 📋 COPY-PASTE DEPLOYMENT COMMANDS

**Bookmark this page!** All commands ready to copy-paste.

---

## Phase 1: Install Node.js

⚠️ **Manual step required**

1. Download from: https://nodejs.org/ (LTS version)
2. Install with default settings
3. Restart PowerShell
4. Run this to verify:

```powershell
node --version
npm --version
```

---

## Phase 2: Local Setup

### 2.1 Install Backend
```powershell
cd c:\App\backend
npm install
```

### 2.2 Install Frontend
```powershell
cd c:\App\frontend
npm install
```

### 2.3 OR: Run Setup Script (Windows)
```powershell
cd c:\App
.\setup-windows.bat
```

---

## Phase 3: GitHub Setup

### 3.1 Initialize and Commit (Already Done ✅)
✅ Git repository already initialized

### 3.2 Push to GitHub (After creating repo)

⚠️ **First:**
1. Go to: https://github.com/new
2. Create repo: `apartment-grocery` (public)
3. Run these commands:

```powershell
cd c:\App

# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/apartment-grocery.git

# Verify it's correct (should show origin)
git remote -v

# Push code
git push -u origin main
```

---

## Phase 4: Neon Database

⚠️ **Manual steps:**

1. Go to: https://console.neon.tech
2. Sign up with GitHub
3. Create project: `apartment-grocery`
4. In SQL Editor, copy-paste:

```sql
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orders_flat_number ON orders(flat_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Create grocery items table
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
```

**Then copy your connection string:**
```
postgresql://user:password@host/apartment_grocery?sslmode=require
```

Save this! ⭐

---

## Phase 5: Render Backend

⚠️ **Manual setup:**

1. Go to: https://render.com
2. Sign in with GitHub
3. Create Web Service
4. Select your `apartment-grocery` repository

**These settings:**
- **Name:** `apartment-grocery-backend`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

**Add environment variables:**
```
DATABASE_URL = (paste your Neon connection string)
NODE_ENV = production
PORT = 5000
```

**Deploy & copy your URL:**
```
https://apartment-grocery-backend.onrender.com
```

**Test it:**
```
https://apartment-grocery-backend.onrender.com/api/health
```

Should return: `{"status":"OK"}`

---

## Phase 6: Vercel Frontend

⚠️ **Manual setup:**

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Import Project → Select `apartment-grocery`

**Settings:**
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Framework:** Create React App

**Add Environment Variable:**
```
REACT_APP_API_URL = https://apartment-grocery-backend.onrender.com
```

**Deploy & your URL will be:**
```
https://apartment-grocery.vercel.app
```

---

## Phase 7: Change Admin Password

⚠️ **Critical security step!**

1. Open: `frontend/src/App.js`
2. Find line ~60:
```javascript
if (adminPassword === 'admin123') {
```

3. Change to:
```javascript
if (adminPassword === 'YourSecurePassword@2024') {
```

4. Commit and push:
```powershell
cd c:\App
git add frontend/src/App.js
git commit -m "Update admin password for security"
git push
```

Vercel auto-redeploys in 2-3 minutes ✅

---

## Testing Commands

### Test Backend Health
```powershell
# After Render deployment
curl https://apartment-grocery-backend.onrender.com/api/health

# Should return: {"status":"OK"}
```

### Test Frontend
1. Open: https://apartment-grocery.vercel.app
2. Select Flat 101
3. Click "Enter as Resident"
4. Add items
5. Click "Place Order"
6. Should see: "Order placed successfully!"

### Test Admin
1. Click "Logout"
2. Click "Login as Admin"
3. Enter your new password
4. Should see orders in dashboard

---

## Maintenance Commands

### Update Code & Redeploy
```powershell
cd c:\App
git add .
git commit -m "Your message"
git push
# Render & Vercel auto-redeploy in 2-3 minutes
```

### View Logs

**Render Backend:**
- Go to: https://dashboard.render.com
- Click your service
- View "Logs" tab

**Vercel Frontend:**
- Go to: https://vercel.com/dashboard
- Click your project
- View "Deployments"

---

## Quick Reference URLs

| Service | URL |
|---------|-----|
| GitHub Repo | https://github.com/YOUR_USERNAME/apartment-grocery |
| Neon Database | https://console.neon.tech |
| Render Backend | https://dashboard.render.com |
| Vercel Frontend | https://vercel.com/dashboard |
| **Your App** | https://apartment-grocery.vercel.app |

---

## Emergency Commands

### Reset Local Git
```powershell
cd c:\App
git status  # See what changed
git diff    # See exact changes
git restore <filename>  # Undo changes to file
```

### Restart Backend (Local)
```powershell
# Stop current process: Ctrl+C
cd c:\App\backend
npm start
```

### Clear npm Cache
```powershell
npm cache clean --force
npm install  # Try again
```

---

## Copy-Paste Summary

✅ **Already done:**
```powershell
# Local git init & commit
cd c:\App
git init
git add .
git commit -m "Initial commit"
```

⚠️ **You need to do:**

1. **Install Node.js** - from nodejs.org
2. **Run:** `cd c:\App\backend && npm install`
3. **Run:** `cd c:\App\frontend && npm install`
4. **Create GitHub repo** - on github.com
5. **Push to GitHub:**
```powershell
git remote add origin https://github.com/YOUR_USERNAME/apartment-grocery.git
git push -u origin main
```

6. **Create Neon database** - console.neon.tech
7. **Deploy on Render** - render.com
8. **Deploy on Vercel** - vercel.com
9. **Change admin password** - in App.js
10. **Test & share URLs!**

---

**Total time: 30-45 minutes**

**Total cost: $0**

**Ready? Start with installing Node.js!** 🚀
