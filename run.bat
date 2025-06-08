@echo off
setlocal

REM Print PixelHub Host banner
echo ============================
echo PixelHub Host - Start Script
echo ============================

REM Check Node.js version (require v22.x)
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js v22.x or newer from: https://nodejs.org/en
    pause
    exit /b 1
)

REM Optionally, display the version
for /f "delims=" %%v in ('node -v') do set NODE_VERSION=%%v
echo Node.js version %NODE_VERSION% detected. [OK]

REM Check if .env file exists and print status
<nul set /p="Checking for .env file... "
IF NOT EXIST .env (
    echo [NOT FOUND]
    echo .env not found. Running install.bat...
    call install.bat
) else (
    echo [FOUND]
    <nul set /p="Installing dependencies... "
    call npm install --silent
    echo [DONE]
    <nul set /p="Starting the development server... "
    call npm run dev --silent
    echo [DONE]
)