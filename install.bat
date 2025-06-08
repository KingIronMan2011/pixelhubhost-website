@echo off
setlocal enabledelayedexpansion

REM Set code page to UTF-8 for Unicode support (may not work in all consoles)
chcp 65001 >nul

echo ================================
echo PixelHub Host - First Time Setup
echo ================================

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
<nul set /p="Starting the development server... "
call npm run dev --silent
echo [DONE]

IF ERRORLEVEL 1 (
    echo.
    echo There was an error starting the development server.
    pause
)