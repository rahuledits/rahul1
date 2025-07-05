# 🌐 Custom Domain Setup Guide

This guide will help you set up a custom domain for your portfolio using Vercel.

## 🚀 Quick Start

### 1. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
./deploy-vercel.sh
```

### 2. Add Custom Domain
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your custom domain

## 📋 Domain Provider Setup

### Popular Domain Providers

#### **Namecheap**
1. Go to **Domain List** → **Manage**
2. Go to **Advanced DNS**
3. Add these records:

```
Type: A Record
Host: @
Value: 76.76.19.36
TTL: Automatic

Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

#### **GoDaddy**
1. Go to **DNS Management**
2. Add these records:

```
Type: A
Name: @
Value: 76.76.19.36
TTL: 600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

#### **Google Domains**
1. Go to **DNS** → **Manage custom records**
2. Add these records:

```
Type: A
Name: @
Value: 76.76.19.36
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### **Cloudflare**
1. Go to **DNS** → **Records**
2. Add these records:

```
Type: A
Name: @
Content: 76.76.19.36
Proxy status: DNS only

Type: CNAME
Name: www
Content: cname.vercel-dns.com
Proxy status: DNS only
```

## 🔧 Advanced Configuration

### Multiple Subdomains
If you want to add more subdomains:

```
Type: CNAME
Name: blog
Value: cname.vercel-dns.com

Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

### Email Setup
If you want to keep email working with your domain:

```
Type: MX
Name: @
Value: your-email-provider.com
Priority: 10

Type: TXT
Name: @
Value: v=spf1 include:your-email-provider.com ~all
```

## ⏱️ DNS Propagation

After updating DNS records:
- **Local**: 5-10 minutes
- **Global**: Up to 48 hours
- **Check**: Use [whatsmydns.net](https://whatsmydns.net)

## 🔒 SSL Certificate

Vercel automatically provides SSL certificates:
- **Automatic**: HTTPS enabled by default
- **Custom**: You can upload your own certificate
- **Status**: Check in Vercel dashboard under **Settings** → **Domains**

## 🐛 Troubleshooting

### Common Issues

#### **Domain Not Working**
1. Check DNS records are correct
2. Wait for propagation (up to 48 hours)
3. Verify domain is added in Vercel dashboard

#### **SSL Not Working**
1. Wait for SSL certificate generation (5-10 minutes)
2. Check domain verification in Vercel
3. Ensure DNS records are correct

#### **WWW Not Working**
1. Verify CNAME record for www subdomain
2. Check if apex domain is working
3. Ensure both A and CNAME records are set

### Verification Commands

```bash
# Check DNS propagation
dig yourdomain.com
dig www.yourdomain.com

# Check SSL certificate
curl -I https://yourdomain.com

# Test domain resolution
nslookup yourdomain.com
```

## 📱 Mobile Optimization

Your custom domain will automatically work on mobile devices. Vercel provides:
- **CDN**: Global content delivery
- **Compression**: Automatic gzip compression
- **Caching**: Smart caching strategies
- **Performance**: 99.9% uptime guarantee

## 🎯 SEO Benefits

Custom domains provide:
- **Brand Recognition**: Professional appearance
- **SEO**: Better search engine rankings
- **Trust**: Increased user confidence
- **Memorability**: Easier to remember

## 💰 Cost Information

- **Vercel**: Free tier available
- **Domain**: ~$10-15/year (varies by provider)
- **SSL**: Free with Vercel
- **CDN**: Included with Vercel

## 🚀 Next Steps

After setting up your custom domain:

1. **Update Portfolio**: Add your custom domain to your portfolio
2. **Social Media**: Update social media profiles
3. **Business Cards**: Print new business cards
4. **Email**: Set up professional email (optional)
5. **Analytics**: Add Google Analytics or similar

## 📞 Support

If you need help:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Contact your domain provider
3. Use Vercel's live chat support
4. Check DNS propagation status

---

**🎉 Congratulations!** Your portfolio is now live with a custom domain! 