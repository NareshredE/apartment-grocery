# Quick Start Guide

## 📦 Local Development (First Time)

### Backend Setup (5 minutes)

```bash
# 1. Open terminal in backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Setup local PostgreSQL database
# Option A: Already have PostgreSQL installed?
createdb apartment_grocery
psql -d apartment_grocery -f database.sql

# Option B: Using cloud database (Neon)?
# Copy your connection string from Neon console
# Create .env file with that connection string

# 4. Create .env file (copy from .env.example)
cp .env.example .env

# 5. Edit .env with your database URL
# IMPORTANT: Update DATABASE_URL with your actual connection string

# 6. Start server
npm start
# Backend runs on http://localhost:5000
```

### Frontend Setup (5 minutes)

```bash
# 1. Open NEW terminal in frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm start
# Frontend runs on http://localhost:3000
```

### Test It Works!

1. Open http://localhost:3000 in browser
2. Select Flat 101 and click "Enter as Resident"
3. Add items to cart → "Place Order"
4. Refresh page → see order in "Order History"
5. Click "Logout"
6. Click "Login as Admin" → Password: `admin123`
7. See order in dashboard

## 🚀 Deployment (30 minutes)

Follow **DEPLOYMENT_GUIDE.md** for step-by-step instructions to deploy on:
- Vercel (Frontend) - FREE
- Render (Backend) - FREE  
- Neon (Database) - FREE

## 📋 Required Changes Before Going Live

1. **Change Admin Password**
   - File: `frontend/src/App.js` (line ~50)
   - Change `'admin123'` to something secure

2. **Update Flat Numbers (Optional)**
   - If apartment has different flat numbering
   - File: `backend/server.js` (line ~21-28)

3. **Add More Groceries**
   - File: `backend/database.sql` (search for INSERT INTO grocery_items)

## 🆘 Troubleshooting

### "Cannot connect to database"
- Verify DATABASE_URL in .env
- Check PostgreSQL is running locally
- For Neon: copy connection string from console

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Frontend shows error connecting to backend
- Check backend is running on port 5000
- Check REACT_APP_API_URL in frontend .env
- During dev, it should be `http://localhost:5000`

## 📚 Project Files

```
App/
├── backend/
│   ├── server.js (API routes)
│   ├── database.sql (Schema)
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.js (Main routing)
│   │   ├── pages/UserHome.js (Resident UI)
│   │   ├── pages/AdminDashboard.js (Admin UI)
│   │   └── App.css (Styling)
│   └── package.json
├── README.md (Full documentation)
└── DEPLOYMENT_GUIDE.md (Deployment instructions)
```

## 🎯 Key Features

✅ 80 flats (101-516)  
✅ No authentication needed  
✅ Admin dashboard with stats  
✅ Order tracking by status  
✅ Shopping cart functionality  
✅ Responsive design  
✅ PostgreSQL database  

## 🔐 Security Notes

- Admin password should be changed before deploying
- Consider adding proper authentication later
- Database connection uses SSL in production
- API has basic CORS enabled for frontend

## 📞 Need Help?

1. Check README.md for detailed docs
2. Check DEPLOYMENT_GUIDE.md for deployment steps
3. Check Troubleshooting section above
4. Review error messages in browser console (F12)
5. Check backend logs in terminal

---

**Happy coding! 🎉**
