@echo off
REM ===================================================
REM APARTMENT GROCERY APP - AUTOMATED LOCAL SETUP
REM ===================================================

echo.
echo =====================================
echo 🏢 APARTMENT GROCERY APP SETUP
echo =====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo Please install it from: https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Install backend dependencies
echo -----------------------------------
echo 📦 Installing BACKEND dependencies...
echo -----------------------------------
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend setup failed!
    pause
    exit /b 1
)
echo ✅ Backend ready!
echo.

REM Go back to root
cd ..

REM Install frontend dependencies
echo -----------------------------------
echo 📦 Installing FRONTEND dependencies...
echo -----------------------------------
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend setup failed!
    pause
    exit /b 1
)
echo ✅ Frontend ready!
echo.

REM Go back to root
cd ..

REM Setup complete
echo =====================================
echo ✅ LOCAL SETUP COMPLETE!
echo =====================================
echo.
echo Next steps:
echo 1. Read: STEP_BY_STEP_SETUP.md
echo 2. Create GitHub account and repo
echo 3. Create Neon database
echo 4. Deploy on Render (backend)
echo 5. Deploy on Vercel (frontend)
echo.
echo Happy deploying! 🚀
echo.
pause
