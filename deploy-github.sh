#!/bin/bash

# GitHub Pages Deployment Script
echo "🚀 Starting GitHub Pages Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Prerequisites:${NC}"
echo "1. Make sure you have git installed"
echo "2. Make sure you're logged in to GitHub"
echo "3. Create a repository named: yourusername.github.io"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}🔧 Initializing git repository...${NC}"
    git init
fi

# Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed. Please check for errors.${NC}"
    exit 1
fi

# Move dist contents to root for GitHub Pages
echo -e "${YELLOW}📁 Preparing for GitHub Pages...${NC}"
cp -r dist/* .
rm -rf dist

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Get GitHub username
echo -e "${BLUE}🌐 GitHub Setup:${NC}"
echo ""
echo -e "${YELLOW}Step 1: Create GitHub Repository${NC}"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: yourusername.github.io"
echo "3. Make it public"
echo "4. Don't initialize with README"
echo ""

read -p "Enter your GitHub username: " GITHUB_USERNAME

# Add remote origin
echo -e "${YELLOW}🔗 Adding GitHub remote...${NC}"
git remote add origin https://github.com/$GITHUB_USERNAME/$GITHUB_USERNAME.github.io.git 2>/dev/null || git remote set-url origin https://github.com/$GITHUB_USERNAME/$GITHUB_USERNAME.github.io.git

# Push to GitHub
echo -e "${YELLOW}📤 Pushing to GitHub...${NC}"
git branch -M main
git push -u origin main

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo -e "${GREEN}📱 Your Portfolio URL:${NC}"
echo -e "GitHub Pages: ${GREEN}https://$GITHUB_USERNAME.github.io${NC}"
echo ""

# GitHub Pages Setup Instructions
echo -e "${BLUE}🔧 GitHub Pages Setup:${NC}"
echo ""
echo -e "${YELLOW}Step 2: Enable GitHub Pages${NC}"
echo "1. Go to: https://github.com/$GITHUB_USERNAME/$GITHUB_USERNAME.github.io"
echo "2. Go to 'Settings' → 'Pages'"
echo "3. Source: 'Deploy from a branch'"
echo "4. Branch: 'main'"
echo "5. Folder: '/' (root)"
echo "6. Click 'Save'"
echo ""

echo -e "${YELLOW}Step 3: Wait for Deployment${NC}"
echo "GitHub Pages will be available in 5-10 minutes at:"
echo -e "${GREEN}https://$GITHUB_USERNAME.github.io${NC}"
echo ""

# Free Domain Options
echo -e "${BLUE}🌐 Free Domain Options:${NC}"
echo ""
echo -e "${YELLOW}Option 1: Freenom (.tk domain)${NC}"
echo "1. Go to: https://freenom.com"
echo "2. Search for: rahulportfolio"
echo "3. Choose: .tk, .ml, .ga, .cf, or .gq"
echo "4. Register for FREE"
echo ""

echo -e "${YELLOW}Option 2: Keep GitHub Pages URL${NC}"
echo "Your GitHub Pages URL is already professional:"
echo -e "${GREEN}https://$GITHUB_USERNAME.github.io${NC}"
echo ""

echo -e "${GREEN}🚀 Your portfolio is now live!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Wait 5-10 minutes for GitHub Pages to deploy"
echo "2. Test your site at the URL above"
echo "3. Share your portfolio URL"
echo "4. Consider adding a free Freenom domain"
echo "5. Update your social media profiles" 