@echo off
setlocal

REM Print PixelHub Host banner
echo ============================
echo PixelHub Host - Start Script
echo ============================

REM Check if .env file exists and print status
<nul set /p="Checking for .env file... "
IF NOT EXIST .env (
    echo [NOT FOUND]
    REM .env file not found, run install.bat to set up environment and dependencies
    echo .env not found. Running install.bat...
    call install.bat
) else (
    echo [FOUND]
    REM .env file found, proceed to install dependencies and start dev server
    <nul set /p="Installing dependencies... "
    call npm install --silent
    echo [DONE]
    REM Start the development server
    echo Starting the development server...
    call npm run dev --silent
)