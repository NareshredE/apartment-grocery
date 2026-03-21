# 🎯 QUICK REFERENCE CARD

**Print or bookmark this page!**

---

## Your App Details

- **Project:** Apartment Grocery Ordering System
- **Flats:** 101-516 (5 floors, 16 flats each = 80 total)
- **Status:** ✅ Ready to Deploy
- **Cost:** $0/month forever

---

## Services You'll Use

| Service | Free Tier | Time to Setup | URL |
|---------|-----------|---------------|-----|
| **Neon** (Database) | 0.5GB | 5 min | console.neon.tech |
| **Render** (Backend) | 750 hrs | 10 min | render.com |
| **Vercel** (Frontend) | ∞ | 10 min | vercel.com |
| **GitHub** (Code) | ∞ | 5 min | github.com |

**Total Time: ~30 minutes**

---

## 4 Setup Steps

### Step 1: GitHub
```
1. Go to github.com/new
2. Create: apartment-grocery (public)
3. Run in PowerShell:
   cd c:\App
   git remote add origin https://github.com/YOUR_USERNAME/apartment-grocery.git
   git push -u origin main
```

### Step 2: Neon Database
```
1. Go to console.neon.tech
2. Sign up with GitHub
3. Create project: apartment-grocery
4. SQL Editor: Paste database.sql
5. Save connection string ⭐
```

### Step 3: Render Backend
```
1. Go to render.com
2. New Web Service → GitHub repo
3. Name: apartment-grocery-backend
4. Build: npm install
5. Start: node server.js
6. Add DATABASE_URL env var
7. Deploy → Save URL ⭐
```

### Step 4: Vercel Frontend
```
1. Go to vercel.com
2. Add Project → GitHub repo
3. Root: frontend
4. Add REACT_APP_API_URL env var
5. Deploy → Get final URL ✅
```

---

## Your Final URLs

After following the 4 steps above, you'll have:

**Resident App:**
```
https://apartment-grocery.vercel.app
```

**Admin Portal:**
```
https://apartment-grocery.vercel.app
(Login with password)
```

**API Endpoint:**
```
https://apartment-grocery-backend.onrender.com
```

---

## Default Credentials (CHANGE THESE!)

| Role | Access | Default |
|------|--------|---------|
| Resident | Any flat 101-516 | No password |
| Admin | Admin login button | `admin123` |

⚠️ **Change admin password in:** `frontend/src/App.js` line 60

---

## Features Available

✅ Flat number login  
✅ Browse 23 grocery items  
✅ Shopping cart  
✅ Place orders  
✅ View order history  
✅ Admin dashboard  
✅ Order status tracking  
✅ Responsive design  

---

## Grocery Categories (Updated)

- 🥛 **Dairy:** Milk, Eggs, Butter, Cheese
- 🥬 **Vegetables:** Tomatoes, Onions, Potato
- 🌾 **Grains:** Rice, Dal
- 🍯 **Flours:** Wheat, Maida, Rice, Corn, Chickpea
- ☕ **Tea & Coffee:** Tea Powder, Coffee, Instant Coffee, Coffee Powder
- 🎂 **Bakery:** Removed
- 🍖 **Meat:** Removed
- 🍎 **Fruits:** Apple, Banana, Orange
- 🛢️ **Oils & Spices:** Oil, Salt, Sugar

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/flats` | Get all flat numbers |
| GET | `/api/health` | Check backend status |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/flat/:flatNumber` | Get flat's orders |
| GET | `/api/admin/orders` | Get all orders |
| PATCH | `/api/admin/orders/:orderId` | Update order status |

---

## File Structure Reference

```
c:\App
├── backend/
│   ├── server.js ...................... REST API
│   ├── database.sql ................... DB schema
│   └── package.json ................... Dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js ..................... Main app
│   │   ├── pages/UserHome.js .......... Resident UI
│   │   ├── pages/AdminDashboard.js ... Admin dashboard
│   │   └── App.css .................... Styling
│   └── package.json
├── README.md ........................... Full docs
├── DEPLOYMENT_READY.md ................ Setup steps
└── SECURITY_CHECKLIST.md .............. Before sharing
```

---

## Troubleshooting Quick Links

**Backend not connecting?**
- Check: https://apt-backend-url/api/health
- Fix DATABASE_URL in Render

**Frontend shows error?**
- Check: Browser console (F12)
- Clear cache: Ctrl+Shift+Del

**Orders not saving?**
- Check: Neon database exists
- Check: All tables created

---

## Support Resources

- Neon Docs: https://neon.tech/docs
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- React: https://react.dev

---

## Remember

1. ✅ Code is ready - no changes needed
2. ✅ Database is designed - just run SQL
3. ✅ All 4 services are free tier
4. ⚠️ Change admin password before sharing
5. 🚀 Deployment takes ~30 minutes
6. 💰 Final cost: $0/month forever

---

**You've got this! 🎉**

*Last updated: March 21, 2026*
