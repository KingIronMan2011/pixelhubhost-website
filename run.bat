@echo off
setlocal

REM Print PixelHub Host banner
echo ============================
echo PixelHub Host - Start Script
echo ============================

REM Check Node.js version (require v18.x or newer)
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js v18.x or newer from: https://nodejs.org/en
    pause
    exit /b 1
)

REM Display the version
for /f "delims=" %%v in ('node -v') do set NODE_VERSION=%%v
set NODE_MAJOR=%NODE_VERSION:~1,2%
if %NODE_MAJOR% LSS 18 (
    echo [ERROR] Node.js v18.x or newer is required. Detected: v%NODE_VERSION%
    pause
    exit /b 1
)
echo Node.js version %NODE_VERSION% detected. [OK]

REM Update npm to the latest version (silent)
<nul set /p="Updating npm to the latest version... "
call npm install -g npm --silent >nul 2>&1
if errorlevel 1 (
    echo [ERROR]
    echo There was an error updating npm.
    pause
    exit /b 1
)
echo [DONE]
for /f "delims=" %%n in ('npm -v') do set NPM_VERSION=%%n
echo npm version %NPM_VERSION% detected. [OK]

REM Check if .env file exists and print status
<nul set /p="Checking for .env file... "
IF NOT EXIST .env (
    echo [NOT FOUND]
    echo .env not found. Running install.bat...
    call install.bat
    if errorlevel 1 (
        echo [ERROR] There was an error running install.bat. Please check the output above.
        pause
        exit /b 1
    )
) else (
    echo [FOUND]
    <nul set /p="Installing dependencies... "
    call npm install --silent >nul 2>&1
    echo [DONE]
    echo Starting the development server...
    call npm run dev --silent
    if errorlevel 1 (
        echo [ERROR] There was an error starting the development server.
        pause
        exit /b 1
    )
)