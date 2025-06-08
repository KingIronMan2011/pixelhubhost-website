@echo off
setlocal enabledelayedexpansion

REM Set code page to UTF-8 for Unicode support (may not work in all consoles)
chcp 65001 >nul

echo ================================
echo PixelHub Host - First Time Setup
echo ================================

REM Check Node.js version (require v22.x)
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js v22.x or newer from: https://nodejs.org/en
    pause
    exit /b 1
)
for /f "delims=" %%v in ('node -v') do set NODE_VERSION=%%v
echo Node.js version !NODE_VERSION! detected. [OK]

REM Copy .env.example to .env if .env does not exist
IF NOT EXIST .env (
    REM .env file not found, copying from .env.example
    copy .env.example .env >nul
    echo Copied .env.example to .env
)

REM Install dependencies (no spinner)
<nul set /p="Installing dependencies... "
call npm install --silent
echo [DONE]

REM Start the development server
echo Starting the development server...
call npm run dev --silent

IF ERRORLEVEL 1 (
    echo.
    echo There was an error starting the development server.
    pause
)