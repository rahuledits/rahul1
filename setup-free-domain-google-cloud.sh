#!/bin/bash

# Free Domain + Google Cloud Setup Script
echo "🚀 Setting up FREE domain + Google Cloud deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 This script will help you:${NC}"
echo "1. Get a FREE domain from Freenom"
echo "2. Deploy to Google Cloud"
echo "3. Connect domain to Google Cloud"
echo ""

# Check prerequisites
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud CLI not found. Installing...${NC}"
    brew install google-cloud-sdk
fi

# Check if authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${RED}❌ Not authenticated with Google Cloud.${NC}"
    echo -e "${YELLOW}Please run: gcloud auth login${NC}"
    gcloud auth login
fi

echo -e "${GREEN}✅ Prerequisites check complete${NC}"

# Step 1: Get Free Domain
echo ""
echo -e "${BLUE}🌐 Step 1: Get FREE Domain from Freenom${NC}"
echo ""
echo -e "${YELLOW}Instructions:${NC}"
echo "1. Go to: https://freenom.com"
echo "2. Search for: rahulportfolio, rahulmeena, or your preferred name"
echo "3. Choose a free TLD: .tk, .ml, .ga, .cf, .gq"
echo "4. Register for FREE (12 months)"
echo "5. Note down your domain name"
echo ""

read -p "Enter your Freenom domain (e.g., rahulportfolio.tk): " FREEDOMAIN

if [ -z "$FREEDOMAIN" ]; then
    echo -e "${RED}❌ No domain entered. Please run the script again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Domain: $FREEDOMAIN${NC}"

# Step 2: Deploy to Google Cloud
echo ""
echo -e "${BLUE}☁️ Step 2: Deploy to Google Cloud${NC}"
echo ""

# Check if billing is enabled
echo -e "${YELLOW}🔍 Checking Google Cloud billing...${NC}"
BILLING_STATUS=$(gcloud billing projects describe $(gcloud config get-value project) --format="value(billingEnabled)" 2>/dev/null)

if [ "$BILLING_STATUS" != "True" ]; then
    echo -e "${RED}❌ Billing not enabled for Google Cloud project.${NC}"
    echo ""
    echo -e "${YELLOW}To enable billing:${NC}"
    echo "1. Go to: https://console.cloud.google.com/billing"
    echo "2. Select your project: $(gcloud config get-value project)"
    echo "3. Link a billing account"
    echo "4. Come back and run this script again"
    echo ""
    echo -e "${BLUE}💡 Alternative: Use Vercel (completely free, no billing required)${NC}"
    echo "Run: ./deploy-vercel.sh"
    exit 1
fi

echo -e "${GREEN}✅ Billing enabled${NC}"

# Enable required APIs
echo -e "${YELLOW}🔌 Enabling Google Cloud APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com

# Deploy backend
echo -e "${YELLOW}🔨 Deploying backend to Google Cloud...${NC}"
cd backend
gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/portfolio-backend .
gcloud run deploy portfolio-backend \
  --image gcr.io/$(gcloud config get-value project)/portfolio-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3001

# Get backend URL
BACKEND_URL=$(gcloud run services describe portfolio-backend --region=us-central1 --format="value(status.url)")
cd ..

echo -e "${GREEN}✅ Backend deployed: $BACKEND_URL${NC}"

# Update frontend API URL
echo -e "${YELLOW}🔗 Updating frontend API URL...${NC}"
sed -i '' "s|http://localhost:3001|${BACKEND_URL}|g" src/services/api.ts

# Deploy frontend
echo -e "${YELLOW}🔨 Deploying frontend to Google Cloud...${NC}"
gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/portfolio-frontend .
gcloud run deploy portfolio-frontend \
  --image gcr.io/$(gcloud config get-value project)/portfolio-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe portfolio-frontend --region=us-central1 --format="value(status.url)")

echo -e "${GREEN}✅ Frontend deployed: $FRONTEND_URL${NC}"

# Step 3: Domain Configuration
echo ""
echo -e "${BLUE}🔗 Step 3: Configure Domain DNS${NC}"
echo ""
echo -e "${YELLOW}Add these DNS records in Freenom:${NC}"
echo ""
echo -e "${GREEN}For Apex Domain ($FREEDOMAIN):${NC}"
echo "Type: A"
echo "Name: @"
echo "Value: 76.76.19.36"
echo ""
echo -e "${GREEN}For WWW Subdomain (www.$FREEDOMAIN):${NC}"
echo "Type: CNAME"
echo "Name: www"
echo "Value: cname.vercel-dns.com"
echo ""

# Alternative: Use Google Cloud domain mapping
echo -e "${YELLOW}Alternative: Use Google Cloud Domain Mapping${NC}"
echo "Run these commands after setting up DNS:"
echo ""
echo "gcloud run domain-mappings create \\"
echo "  --service portfolio-frontend \\"
echo "  --domain $FREEDOMAIN \\"
echo "  --region us-central1"
echo ""

# Summary
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo -e "${GREEN}📱 Your Portfolio URLs:${NC}"
echo -e "Frontend: ${GREEN}$FRONTEND_URL${NC}"
echo -e "Backend: ${GREEN}$BACKEND_URL${NC}"
echo -e "Custom Domain: ${GREEN}https://$FREEDOMAIN${NC}"
echo -e "Admin Dashboard: ${GREEN}$FRONTEND_URL/admin${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Add DNS records in Freenom (see above)"
echo "2. Wait for DNS propagation (5-10 minutes)"
echo "3. Test your custom domain"
echo "4. Share your portfolio URL"
echo ""
echo -e "${GREEN}🚀 Your portfolio is now live with FREE domain and Google Cloud hosting!${NC}" 