# 🚀 COMPLETE SETUP & DEPLOYMENT GUIDE

Your app is 100% ready! Follow these steps in order.

---

## ⚡ PART 1: LOCAL SETUP (Your Computer)

### Step 1.1: Install Node.js (Required for local testing)

**Windows Installation:**

1. Go to: https://nodejs.org/
2. Download **"LTS" version** (not Current)
3. Run the installer
4. ✅ Accept all defaults
5. Restart PowerShell after installation

**Verify installation:**
```powershell
node --version
npm --version
```

Both should show version numbers ✅

---

### Step 1.2: Install Backend Dependencies

```powershell
cd c:\App\backend
npm install
```

This installs:
- Express (API framework)
- PostgreSQL client
- CORS support
- Environment variables

**Expected output:** "added X packages"

---

### Step 1.3: Install Frontend Dependencies

```powershell
cd c:\App\frontend
npm install
```

This installs:
- React
- Axios (HTTP client)
- React Router

**Expected output:** "added X packages"

---

### Step 1.4: Test Backend Locally (Optional)

```powershell
cd c:\App\backend

# Create local .env file
$env:DATABASE_URL = "sqlite:memory"
$env:NODE_ENV = "development"
$env:PORT = "5000"

npm start
```

Expected output:
```
Server running on port 5000
Health check: http://localhost:5000/api/health
```

**Test:** Open browser → http://localhost:5000/api/health
Should return: `{"status":"OK"}`

Close with: Ctrl+C

---

### Step 1.5: Test Frontend Locally (Optional)

In a NEW PowerShell window:

```powershell
cd c:\App\frontend
npm start
```

Browser opens automatically to http://localhost:3000

Try it:
- Select Flat 101
- Click "Enter as Resident"
- Add items to cart
- Click "Place Order"

Close with: Ctrl+C

---

## 🌐 PART 2: CLOUD DEPLOYMENT (Free Tier)

### Step 2.1: Create GitHub Repository

1. **Go to:** https://github.com/new
2. **Fill in:**
   - Repository name: `apartment-grocery`
   - Description: `Free apartment grocery ordering system`
   - ☑️ **Make it Public** (required for free deployment)
   - Click "Create repository"

3. **Copy your repository URL** (looks like):
   ```
   https://github.com/YOUR_USERNAME/apartment-grocery.git
   ```

4. **Push code to GitHub:**

```powershell
cd c:\App

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/apartment-grocery.git

# Verify it's correct
git remote -v

# Push code
git push -u origin main
```

**Success:** All files now on GitHub! ✅

---

### Step 2.2: Create Free Database (Neon)

1. **Go to:** https://console.neon.tech/
2. **Sign up** with GitHub (easiest)
3. **Create project:**
   - Project name: `apartment-grocery`
   - Database: `apartment_grocery`
   - Region: Pick closest to you
   - Click "Create project"

4. **Run SQL schema:**
   - In Neon console, click "SQL Editor"
   - Open file: `c:\App\backend\database.sql`
   - Copy ALL the SQL code
   - Paste in Neon SQL Editor
   - Click "Execute"
   - ✅ Tables created!

5. **Get connection string:**
   - Go to "Connection" tab
   - Click "Node.js"
   - Copy the full string (starts with `postgresql://`)
   - **⭐ SAVE THIS STRING - YOU'LL NEED IT NEXT!**

Example:
```
postgresql://neon_user:abcd1234@ep-cool-water-12345.us-east-2.aws.neon.tech/apartment_grocery?sslmode=require
```

---

### Step 2.3: Deploy Backend (Render)

1. **Go to:** https://render.com
2. **Sign in** with GitHub
3. **Create Web Service:**
   - Click "New Web Service"
   - Select your `apartment-grocery` repository
   - Connect it

4. **Configure service:**
   - Name: `apartment-grocery-backend`
   - Environment: `Node`
   - Region: `Oregon` (or closest to you)
   - Build Command:
     ```
     npm install
     ```
   - Start Command:
     ```
     node server.js
     ```
   - Plan: `Free`

5. **Add Environment Variables:**
   - Click "Environment"
   - Click "Add Environment Variable"
   - Add these 3 variables:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | (Paste your Neon connection string) |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |

6. **Deploy:**
   - Click "Create Web Service"
   - ⏳ Wait 5-10 minutes for deployment
   - You'll see: "Deploy successful!"
   - **Copy your URL** (looks like):
     ```
     https://apartment-grocery-backend.onrender.com
     ```
   - **⭐ SAVE THIS URL - YOU'LL NEED IT NEXT!**

7. **Test backend:**
   ```
   Open in browser:
   https://apartment-grocery-backend.onrender.com/api/health
   
   Should return: {"status":"OK"}
   ```

---

### Step 2.4: Deploy Frontend (Vercel)

1. **Go to:** https://vercel.com
2. **Sign in** with GitHub
3. **Import project:**
   - Click "Add New" → "Project"
   - Click "Import Git Repository"
   - Select `apartment-grocery`
   - Click "Import"

4. **Configure project:**
   - **Project name:** `apartment-grocery` (can leave default)
   - **Framework Preset:** Select "Create React App"
   - **Root Directory:** Select `frontend` (important!)
   - **Build Command:** `npm install && npm run build`
   - **Install Command:** `npm install`
   - **Output Directory:** `build`

5. **Add Environment Variable:**
   - Scroll down to "Environment Variables"
   - Click "Add"
   - **Name:** `REACT_APP_API_URL`
   - **Value:** Your Render URL from Step 2.3
     ```
     https://apartment-grocery-backend.onrender.com
     ```
   - ❌ Do NOT include trailing slash
   - Click "Add"

6. **Deploy:**
   - Click "Deploy"
   - ⏳ Wait 3-5 minutes
   - You'll see: "Congratulations! Your project has been deployed"
   - **Copy your URL** (looks like):
     ```
     https://apartment-grocery.vercel.app
     ```

7. **Test frontend:**
   - Open: https://apartment-grocery.vercel.app
   - Select Flat 101
   - Click "Enter as Resident"
   - Add items
   - Click "Place Order"
   - ✅ Should see "Order placed successfully!"

---

## 🔐 FINAL STEP: Change Admin Password

⚠️ **CRITICAL: Do this before sharing with residents!**

1. **Edit file:** `frontend/src/App.js`
2. **Find line ~60:**
   ```javascript
   if (adminPassword === 'admin123') {
   ```
3. **Change to something secure:**
   ```javascript
   if (adminPassword === 'ApartmentAdmin@2024!') // Change this!
   ```
4. **Save and commit:**
   ```powershell
   cd c:\App
   git add frontend/src/App.js
   git commit -m "Update admin password"
   git push
   ```
5. **Vercel auto-redeploys** (2-3 minutes)

---

## ✅ Testing Checklist

After all deployment steps:

- [ ] GitHub repo created and code pushed
- [ ] Neon database tables created
- [ ] Render backend deployed (`/api/health` returns OK)
- [ ] Vercel frontend deployed and loads
- [ ] Resident login works (Flat 101)
- [ ] Can add items and place order
- [ ] Admin login works with new password
- [ ] Can see orders in admin dashboard
- [ ] Admin can update order status

---

## 🎯 Your Final URLs (Share These!)

**For Residents:**
```
https://apartment-grocery.vercel.app
Flat numbers: 101 to 516
No password needed
```

**For Admin:**
```
https://apartment-grocery.vercel.app
Click "Login as Admin"
Enter your new password
```

---

## 📊 What You Get

### Frontend Features:
✅ Flat login (101-516)
✅ Browse 23 grocery items
✅ Shopping cart
✅ Place orders
✅ View order history
✅ Mobile responsive

### Backend Features:
✅ RESTful API (8 endpoints)
✅ PostgreSQL database
✅ Order tracking
✅ Auto-sleep mode (saves money)
✅ Automatic HTTPS

### Database:
✅ 80 flats (5 floors × 16 flats)
✅ 23 grocery items
✅ Order history
✅ Status tracking

---

## 💰 Monthly Cost: $0

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Neon** (Database) | 0.5 GB storage | Free ✅ |
| **Render** (Backend) | 750 hours/month | Free ✅ |
| **Vercel** (Frontend) | Unlimited | Free ✅ |
| **GitHub** (Code) | Unlimited | Free ✅ |
| **TOTAL** | | **$0/month** |

No credit card charged, ever!

---

## 🆘 Troubleshooting

### Backend shows connection error?
1. Check DATABASE_URL in Render dashboard
2. Verify database name in Neon
3. Re-run SQL schema in Neon

### Frontend shows "Failed to fetch"?
1. Check browser console (F12)
2. Verify REACT_APP_API_URL in Vercel
3. Make sure Render URL has no trailing slash
4. Clear browser cache (Ctrl+Shift+Del)

### Can't login to admin?
1. Check you changed the password in App.js
2. Did you commit and push changes?
3. Did Vercel redeploy (wait 3 min)?

### Orders not saving?
1. Check Neon tables exist (SQL Editor)
2. Check Render logs for errors
3. Verify DATABASE_URL is correct

### Render backend keeps failing?
1. Check logs in Render dashboard
2. Verify DATABASE_URL environment variable
3. Ensure database exists in Neon

---

## 📞 Support

Each service has free support:
- **Neon:** https://console.neon.tech (chat support)
- **Render:** https://render.com (docs + support)
- **Vercel:** https://vercel.com/docs (great docs)

---

## 🎉 You're Almost There!

**Next steps:**
1. Install Node.js (if not already done)
2. Test locally (optional but recommended)
3. Follow Steps 2.1-2.4 above
4. Change admin password
5. Share URLs with residents!

**Total time: 30-45 minutes**

---

*Ready to go live? Follow the steps above!*

*Questions? Check README.md or QUICK_REFERENCE.md*

Last updated: March 21, 2026
