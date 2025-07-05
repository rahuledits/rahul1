# 🚀 Google Cloud Deployment Guide

This guide will help you deploy your portfolio to Google Cloud Platform.

## 📋 Prerequisites

1. **Google Cloud Account** - Sign up at [cloud.google.com](https://cloud.google.com)
2. **Google Cloud CLI** - Install from [cloud.google.com/sdk](https://cloud.google.com/sdk)
3. **Billing Enabled** - Enable billing on your Google Cloud project

## 🔧 Setup Steps

### 1. Install Google Cloud CLI

**macOS (using Homebrew):**
```bash
brew install google-cloud-sdk
```

**Windows:**
Download from [cloud.google.com/sdk](https://cloud.google.com/sdk)

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### 2. Authenticate and Setup

```bash
# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing)
gcloud projects create your-portfolio-project-id --name="Portfolio Project"

# Set the project
gcloud config set project your-portfolio-project-id

# Enable billing (required for deployment)
# Go to: https://console.cloud.google.com/billing
```

### 3. Enable Required APIs

```bash
# Enable Cloud Build API
gcloud services enable cloudbuild.googleapis.com

# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Container Registry API
gcloud services enable containerregistry.googleapis.com

# Enable App Engine API (if using App Engine)
gcloud services enable appengine.googleapis.com
```

## 🚀 Deployment Options

### Option 1: Cloud Run (Recommended)

**Fastest and most cost-effective deployment:**

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Edit the script to set your project ID
# Open deploy.sh and change: PROJECT_ID="your-portfolio-project-id"

# Run the deployment
./deploy.sh
```

### Option 2: App Engine

**Traditional Google Cloud deployment:**

```bash
# Deploy backend
cd backend
gcloud app deploy app.yaml

# Deploy frontend
cd ..
gcloud app deploy app.yaml
```

### Option 3: Manual Cloud Run

**Step-by-step deployment:**

```bash
# 1. Build and deploy backend
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/portfolio-backend .
gcloud run deploy portfolio-backend \
  --image gcr.io/YOUR_PROJECT_ID/portfolio-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# 2. Get backend URL and update frontend
BACKEND_URL=$(gcloud run services describe portfolio-backend --region=us-central1 --format="value(status.url)")
cd ..
sed -i '' "s|http://localhost:3001|${BACKEND_URL}|g" src/services/api.ts

# 3. Build and deploy frontend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/portfolio-frontend .
gcloud run deploy portfolio-frontend \
  --image gcr.io/YOUR_PROJECT_ID/portfolio-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🌐 Custom Domain Setup

### 1. Map Custom Domain

```bash
# Map domain to Cloud Run service
gcloud run domain-mappings create \
  --service portfolio-frontend \
  --domain yourdomain.com \
  --region us-central1
```

### 2. Update DNS Records

Add these DNS records to your domain provider:

```
Type: CNAME
Name: @
Value: ghs.googlehosted.com
```

## 🔐 Environment Variables

### For Production Backend

Create a `.env` file in the backend directory:

```env
NODE_ENV=production
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

### Set in Cloud Run

```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --set-env-vars="NODE_ENV=production,MONGODB_URI=your-uri,JWT_SECRET=your-secret"
```

## 📊 Monitoring & Logging

### View Logs

```bash
# Backend logs
gcloud logs read "resource.type=cloud_run_revision AND resource.labels.service_name=portfolio-backend"

# Frontend logs
gcloud logs read "resource.type=cloud_run_revision AND resource.labels.service_name=portfolio-frontend"
```

### Set up Monitoring

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to Monitoring
3. Create dashboards for your services

## 💰 Cost Optimization

### Cloud Run Pricing
- **Free Tier**: 2 million requests/month
- **Paid**: $0.00002400 per 100ms of CPU time
- **Memory**: $0.00000250 per GB-second

### Cost Estimation
- **Small portfolio**: ~$5-10/month
- **Medium traffic**: ~$20-50/month
- **High traffic**: ~$100+/month

## 🔧 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check build logs
   gcloud builds log BUILD_ID
   ```

2. **Service Won't Start**
   ```bash
   # Check service logs
   gcloud run services logs read portfolio-backend --region=us-central1
   ```

3. **CORS Issues**
   - Update CORS_ORIGIN in backend environment variables
   - Ensure frontend URL is correct

4. **Database Connection**
   - Check MongoDB Atlas network access
   - Verify connection string

### Useful Commands

```bash
# List all services
gcloud run services list --region=us-central1

# Update service
gcloud run services update SERVICE_NAME --region=us-central1

# Delete service
gcloud run services delete SERVICE_NAME --region=us-central1

# View service details
gcloud run services describe SERVICE_NAME --region=us-central1
```

## 🎉 Success!

After deployment, you'll have:

- ✅ **Frontend**: `https://portfolio-frontend-xxxxx-uc.a.run.app`
- ✅ **Backend**: `https://portfolio-backend-xxxxx-uc.a.run.app`
- ✅ **Admin**: `https://portfolio-frontend-xxxxx-uc.a.run.app/admin`

Your portfolio is now live on Google Cloud! 🚀

## 📞 Support

If you encounter issues:

1. Check the [Google Cloud documentation](https://cloud.google.com/docs)
2. Review the troubleshooting section above
3. Check service logs for error details
4. Ensure all APIs are enabled and billing is active 