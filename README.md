# Apartment Grocery Ordering System

A full-stack apartment grocery ordering application built with **React**, **Node.js/Express**, and **PostgreSQL**.

## Features

✅ **For Residents:**
- Simple login with apartment flat number (101-516)
- Browse grocery items by category
- Add items to shopping cart
- Place orders with quantity selection
- View order history and status tracking
- Live notifications when orders are updated

✅ **For Admin:**
- View all orders across the apartment
- Filter orders by flat number
- Track orders by status (Pending, Accepted, Completed, Rejected)
- Update order status
- View order history and statistics
- Dashboard with order analytics

## Tech Stack

- **Frontend:** React, Axios, CSS3
- **Backend:** Node.js, Express.js, PostgreSQL
- **Deployment:** Vercel (Frontend), Render (Backend), Neon (Database)

## Project Structure

```
apartment-grocery/
├── frontend/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── UserHome.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── backend/               # Node.js backend
│   ├── server.js
│   ├── database.sql
│   ├── .env.example
│   └── package.json
└── README.md
```

## Local Development Setup

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+ (or use a free cloud database like Neon)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your PostgreSQL URL:**
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/apartment_grocery
   PORT=5000
   NODE_ENV=development
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Setup database:**
   - Create a PostgreSQL database: `apartment_grocery`
   - Run the SQL script:
   ```bash
   psql -U postgres -d apartment_grocery -f database.sql
   ```

6. **Start backend:**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start frontend:**
   ```bash
   npm start
   ```

Frontend runs on `http://localhost:3000`

## Apartment Flat Numbers

- **Floor 1:** 101-116 (16 flats)
- **Floor 2:** 201-216 (16 flats)
- **Floor 3:** 301-316 (16 flats)
- **Floor 4:** 401-416 (16 flats)
- **Floor 5:** 501-516 (16 flats)

**Total: 80 flats**

## Login Credentials

### Resident Login
- Select any flat number from the dropdown (101-516)
- No password required

### Admin Login
- **Password:** `admin123`

## Free Tier Deployment

### 1. Database: Neon PostgreSQL (Free Tier)

1. Go to [Neon Console](https://console.neon.tech)
2. Sign up with GitHub/Google
3. Create a new project
4. Get your connection string
5. Update your `.env` file with the Neon connection string

**Free Tier:**
- 0.5 GB storage
- Shared compute
- Perfect for this project

### 2. Backend: Render.com

1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Create a new "Web Service"
4. Connect to your repository
5. Set build and start commands:
   - **Build:** `cd backend && npm install`
   - **Start:** `cd backend && npm start`
6. Add environment variables from `.env`
7. Deploy!

**Free Tier:**
- Auto-sleeps after 15 minutes of inactivity
- Great for low-traffic apps

### 3. Frontend: Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Import your project
4. Set root directory to `frontend`
5. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.onrender.com`
6. Deploy!

**Free Tier:**
- Unlimited deployments
- Automatic HTTPS
- Fast CDN

## Deployment Steps

### Complete Free Deployment Guide

```bash
# 1. Create GitHub repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/apartment-grocery.git
git push -u origin main

# 2. Set up Neon Database
# - Get connection string from Neon Console
# - Update .env files in both backend and Render

# 3. Deploy Backend on Render
# - Connect GitHub repo
# - Set environment variables
# - Deploy

# 4. Update Frontend API URL
# In frontend, update API endpoint to Render URL

# 5. Deploy Frontend on Vercel
# - Connect GitHub repo
# - Set root directory: frontend
# - Deploy
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://neon-connection-string
PORT=5000
NODE_ENV=production
ADMIN_EMAIL=admin@apartment.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

## API Endpoints

### Public Endpoints
- `GET /api/flats` - Get all flat numbers
- `GET /api/health` - Health check

### Resident Endpoints
- `POST /api/orders` - Place a new order
- `GET /api/orders/flat/:flatNumber` - Get flat's order history

### Admin Endpoints
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/flat/:flatNumber` - Get flat's orders
- `PATCH /api/admin/orders/:orderId` - Update order status

## Available Scripts

### Backend
```bash
npm start     # Run production
npm run dev   # Run with hot-reload (nodemon)
```

### Frontend
```bash
npm start     # Run development server
npm run build # Create production build
```

## Grocery Categories

- Dairy (Milk, Eggs, Butter, Cheese)
- Bakery (Bread)
- Vegetables (Tomatoes, Onions, Potato)
- Grains (Rice, Dal)
- Oils & Spices (Oil, Salt, Sugar)
- Beverages (Tea, Coffee)
- Fruits (Apple, Banana, Orange)
- Meat (Chicken, Fish)

## Features Coming Soon

- 📧 Email notifications to residents
- 💳 Payment integration
- ⭐ Ratings and reviews
- 📱 Mobile app
- 🔔 Push notifications
- 📊 Advanced analytics

## Troubleshooting

### Database Connection Error
- Verify DATABASE_URL in .env
- Check PostgreSQL is running
- Ensure database exists

### CORS Error
- Backend CORS is enabled for all origins
- Check backend is running on correct port

### Port 5000 Already in Use
```bash
# Find process on port 5000
lsof -i :5000
# Kill it
kill -9 <PID>
```

## Contributing

Feel free to open issues and submit pull requests!

## License

MIT License - feel free to use this project

## Support

For questions or issues, create a GitHub issue or contact the development team.

---

**Built with ❤️ for apartment communities**
