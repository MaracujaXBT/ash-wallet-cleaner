@echo off
echo ASH - Upload to GitHub
echo =====================
echo.

echo Step 1: Initialize Git repository
git init

echo.
echo Step 2: Add all files
git add .

echo.
echo Step 3: Commit files
git commit -m "Initial ASH wallet cleaner setup"

echo.
echo Step 4: Set main branch
git branch -M main

echo.
echo Step 5: Add remote origin
echo Please replace YOUR_USERNAME with your actual GitHub username
echo git remote add origin https://github.com/YOUR_USERNAME/ash-wallet-cleaner.git

echo.
echo Step 6: Push to GitHub
echo git push -u origin main

echo.
echo =====================
echo Next steps:
echo 1. Create repository on GitHub: ash-wallet-cleaner
echo 2. Replace YOUR_USERNAME in the commands above
echo 3. Run the git remote add and git push commands
echo =====================
pause
