#!/bin/bash

# Vercel Deployment Script with Custom Domain
echo "🚀 Starting Vercel Deployment with Custom Domain..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Prerequisites:${NC}"
echo "1. Make sure you have Vercel CLI installed"
echo "2. Make sure you're logged in to Vercel"
echo "3. Have your custom domain ready"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI is not installed. Installing now...${NC}"
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}❌ Not logged in to Vercel. Please run: vercel login${NC}"
    vercel login
fi

echo -e "${GREEN}✅ Vercel CLI is ready${NC}"

# Deploy to Vercel
echo -e "${YELLOW}🔨 Deploying to Vercel...${NC}"
vercel --prod

# Get deployment URL
DEPLOYMENT_URL=$(vercel ls --json | jq -r '.[0].url' 2>/dev/null || echo "Check Vercel dashboard for URL")

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo -e "${GREEN}📱 Your Portfolio URL:${NC}"
echo -e "Vercel URL: ${GREEN}${DEPLOYMENT_URL}${NC}"
echo ""

# Custom Domain Setup
echo -e "${BLUE}🌐 Custom Domain Setup:${NC}"
echo ""
echo -e "${YELLOW}Step 1: Add Custom Domain in Vercel Dashboard${NC}"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your project"
echo "3. Go to 'Settings' → 'Domains'"
echo "4. Add your custom domain"
echo ""

echo -e "${YELLOW}Step 2: Update DNS Records${NC}"
echo "Add these DNS records to your domain provider:"
echo ""
echo -e "${GREEN}For Apex Domain (yourdomain.com):${NC}"
echo "Type: A"
echo "Name: @"
echo "Value: 76.76.19.36"
echo ""
echo -e "${GREEN}For WWW Subdomain (www.yourdomain.com):${NC}"
echo "Type: CNAME"
echo "Name: www"
echo "Value: cname.vercel-dns.com"
echo ""

echo -e "${YELLOW}Step 3: Update CNAME File${NC}"
echo "Edit the CNAME file in your project root:"
echo "Replace 'yourdomain.com' with your actual domain"
echo ""

echo -e "${GREEN}🚀 Your portfolio will be live at your custom domain!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Update CNAME file with your domain"
echo "2. Add domain in Vercel dashboard"
echo "3. Update DNS records"
echo "4. Wait for DNS propagation (up to 48 hours)"
echo "5. Set up SSL certificate (automatic with Vercel)" 