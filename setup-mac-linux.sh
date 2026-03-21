#!/bin/bash

# ===================================================
# APARTMENT GROCERY APP - AUTOMATED LOCAL SETUP
# ===================================================

echo ""
echo "====================================="
echo "🏢 APARTMENT GROCERY APP SETUP"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install it from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected"
echo ""

# Install backend dependencies
echo "-----------------------------------"
echo "📦 Installing BACKEND dependencies..."
echo "-----------------------------------"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend setup failed!"
    exit 1
fi
echo "✅ Backend ready!"
echo ""

# Go back to root
cd ..

# Install frontend dependencies
echo "-----------------------------------"
echo "📦 Installing FRONTEND dependencies..."
echo "-----------------------------------"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend setup failed!"
    exit 1
fi
echo "✅ Frontend ready!"
echo ""

# Go back to root
cd ..

# Setup complete
echo "====================================="
echo "✅ LOCAL SETUP COMPLETE!"
echo "====================================="
echo ""
echo "Next steps:"
echo "1. Read: STEP_BY_STEP_SETUP.md"
echo "2. Create GitHub account and repo"
echo "3. Create Neon database"
echo "4. Deploy on Render (backend)"
echo "5. Deploy on Vercel (frontend)"
echo ""
echo "Happy deploying! 🚀"
echo ""
