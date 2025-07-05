#!/bin/bash

# Google Cloud Deployment Script for Portfolio
echo "🚀 Starting Google Cloud Deployment..."

# Set your project ID (replace with your actual project ID)
PROJECT_ID="your-portfolio-project-id"
REGION="us-central1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Prerequisites:${NC}"
echo "1. Make sure you have gcloud CLI installed"
echo "2. Make sure you're authenticated: gcloud auth login"
echo "3. Set your project ID in this script"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${RED}❌ Not authenticated. Please run: gcloud auth login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ gcloud CLI is ready${NC}"

# Set project
echo -e "${YELLOW}🔧 Setting project to: ${PROJECT_ID}${NC}"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${YELLOW}🔌 Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and deploy backend
echo -e "${YELLOW}🔨 Building and deploying backend...${NC}"
cd backend

# Build backend image
gcloud builds submit --tag gcr.io/$PROJECT_ID/portfolio-backend .

# Deploy backend to Cloud Run
gcloud run deploy portfolio-backend \
  --image gcr.io/$PROJECT_ID/portfolio-backend \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 3001 \
  --set-env-vars="NODE_ENV=production"

# Get backend URL
BACKEND_URL=$(gcloud run services describe portfolio-backend --region=$REGION --format="value(status.url)")

cd ..

# Update frontend API URL
echo -e "${YELLOW}🔗 Updating frontend API URL to: ${BACKEND_URL}${NC}"
sed -i '' "s|http://localhost:3001|${BACKEND_URL}|g" src/services/api.ts

# Build and deploy frontend
echo -e "${YELLOW}🔨 Building and deploying frontend...${NC}"

# Build frontend image
gcloud builds submit --tag gcr.io/$PROJECT_ID/portfolio-frontend .

# Deploy frontend to Cloud Run
gcloud run deploy portfolio-frontend \
  --image gcr.io/$PROJECT_ID/portfolio-frontend \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 80

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe portfolio-frontend --region=$REGION --format="value(status.url)")

echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo -e "${GREEN}📱 Your Portfolio URLs:${NC}"
echo -e "Frontend: ${GREEN}${FRONTEND_URL}${NC}"
echo -e "Backend API: ${GREEN}${BACKEND_URL}${NC}"
echo -e "Admin Dashboard: ${GREEN}${FRONTEND_URL}/admin${NC}"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Set up a custom domain (optional)"
echo "2. Configure environment variables"
echo "3. Set up monitoring and logging"
echo ""
echo -e "${GREEN}🚀 Your portfolio is now live on Google Cloud!${NC}" 