#!/bin/bash
# Quick local setup script for macOS/Linux

echo "🏢 Setting up Apartment Grocery App..."

# Backend setup
echo "📦 Setting up backend..."
cd backend
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend/.env - Update with your database URL!"
fi

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created frontend/.env"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your database connection string"
echo "2. Open 2 terminals:"
echo "   Terminal 1: cd backend && npm start"
echo "   Terminal 2: cd frontend && npm start"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For deployment, read DEPLOYMENT_GUIDE.md"
