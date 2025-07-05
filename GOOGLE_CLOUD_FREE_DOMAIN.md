# 🌐 Free Domain + Google Cloud Deployment

Google Cloud doesn't provide free domains, but here's how to get a FREE domain and deploy to Google Cloud:

## 🆓 **Free Domain Options**

### 1. **Freenom** (Most Popular)
- **Domains**: `.tk`, `.ml`, `.ga`, `.cf`, `.gq`
- **Cost**: Completely FREE for 12 months
- **Renewal**: Free for another 12 months
- **Perfect for**: Google Cloud deployment

### 2. **GitHub Pages** (Developer Friendly)
- **URL**: `yourusername.github.io`
- **Cost**: Completely FREE forever
- **Can point to**: Google Cloud backend

### 3. **Vercel** (React Friendly)
- **URL**: `yoursite.vercel.app`
- **Cost**: Completely FREE
- **Can connect to**: Google Cloud backend

## 🚀 **Best Setup: Freenom + Google Cloud**

### **Step 1: Get Free Freenom Domain**
1. Go to [freenom.com](https://freenom.com)
2. Search for: `rahulportfolio` or `rahulmeena`
3. Choose free TLD: `.tk`, `.ml`, `.ga`, `.cf`, `.gq`
4. Register for FREE (12 months)

### **Step 2: Deploy to Google Cloud**
```bash
# Enable billing first (required for Google Cloud)
# Then deploy using our script
./deploy.sh
```

### **Step 3: Point Domain to Google Cloud**
Add these DNS records in Freenom:

**For Google Cloud Run:**
```
Type: A
Name: @
Value: 76.76.19.36

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 💰 **Cost Breakdown**

### **Free Option (Recommended)**
- **Domain**: FREE (Freenom)
- **Hosting**: FREE (Google Cloud free tier)
- **SSL**: FREE (Google Cloud)
- **Total**: $0/month

### **Paid Option (Premium)**
- **Domain**: $10-15/year (Namecheap, GoDaddy)
- **Hosting**: $5-20/month (Google Cloud)
- **SSL**: FREE (Google Cloud)
- **Total**: $15-35/year

## 🎯 **Recommended Setup**

### **Option 1: Freenom + Google Cloud (FREE)**
1. Get free domain from Freenom
2. Deploy to Google Cloud Run
3. Point domain to Google Cloud
4. Total cost: $0

### **Option 2: GitHub Pages + Google Cloud Backend (FREE)**
1. Frontend: GitHub Pages (free)
2. Backend: Google Cloud Run (free tier)
3. Total cost: $0

## 🚀 **Quick Setup Script**

I'll create a script that:
1. Gets you a free Freenom domain
2. Deploys to Google Cloud
3. Configures DNS automatically

```bash
# Complete setup script
./setup-free-domain-google-cloud.sh
```

## 📱 **Your URLs Will Be:**

### **With Freenom Domain:**
- **Main**: `https://rahulportfolio.tk`
- **WWW**: `https://www.rahulportfolio.tk`
- **Backend**: `https://portfolio-backend-xxxxx-uc.a.run.app`

### **With GitHub Pages:**
- **Frontend**: `https://yourusername.github.io`
- **Backend**: `https://portfolio-backend-xxxxx-uc.a.run.app`

## 🔧 **Google Cloud Free Tier**

Google Cloud offers generous free tier:
- **Cloud Run**: 2 million requests/month
- **Cloud Build**: 120 build-minutes/day
- **Container Registry**: 0.5 GB storage
- **Perfect for**: Small to medium portfolios

## 🎉 **Benefits of This Setup**

- ✅ **Completely FREE** domain and hosting
- ✅ **Professional appearance**
- ✅ **Google Cloud reliability**
- ✅ **Automatic scaling**
- ✅ **Global CDN**
- ✅ **SSL certificates**
- ✅ **99.9% uptime**

## 📞 **Support**

- **Freenom**: [freenom.com](https://freenom.com)
- **Google Cloud**: [cloud.google.com](https://cloud.google.com)
- **Documentation**: [cloud.google.com/docs](https://cloud.google.com/docs)

---

**🎉 You can have a professional portfolio with FREE domain and Google Cloud hosting!** 