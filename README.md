# 🎬 Video Editor Portfolio

A stunning, modern portfolio website for video editors and content creators, built with React, TypeScript, and a full-stack backend.

## ✨ Features

### Frontend
- 🎨 **Modern UI/UX** - Beautiful animations and interactions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🌙 **Dark/Light Mode** - Toggle between themes
- 🎥 **Video Showcase** - Display your video projects with thumbnails
- 📧 **Contact Form** - Integrated with backend API
- ⚡ **Fast Performance** - Optimized with Vite

### Backend
- 🔐 **Authentication** - JWT-based user management
- 📊 **Database** - MongoDB with Mongoose
- 🛡️ **Security** - Rate limiting, CORS, input validation
- 📝 **API Endpoints** - Complete REST API
- 🔄 **Real-time** - Live data updates

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```
Backend will run on: `http://localhost:3001`

### 2. Start the Frontend
```bash
npm install
npm run dev
```
Frontend will run on: `http://localhost:8084` (or next available port)

### 3. Access Your Portfolio
- **Main Site**: `http://localhost:8084`
- **Admin Dashboard**: `http://localhost:8084/admin`
- **API Health**: `http://localhost:3001/api/health`

## 📡 API Endpoints

### Portfolio
- `GET /api/portfolio` - Get all projects
- `POST /api/portfolio` - Add new project (admin)
- `PUT /api/portfolio/:id` - Update project (admin)
- `DELETE /api/portfolio/:id` - Delete project (admin)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

## 🎯 What's Working

✅ **Backend Server** - Running on port 3001  
✅ **API Integration** - Frontend connected to backend  
✅ **Portfolio Display** - Dynamic project loading  
✅ **Contact Form** - Real form submission  
✅ **Admin Dashboard** - Manage portfolio items  
✅ **Health Check** - API status monitoring  

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Router (Navigation)
- Shadcn/ui (Components)

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (Password hashing)
- CORS + Helmet (Security)

## 📁 Project Structure

```
rahul-main/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── ...
├── backend/               # Backend source
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Auth & validation
│   └── ...
└── public/               # Static assets
```

## 🎨 Customization

### Add New Portfolio Items
1. Visit `/admin` dashboard
2. Click "Add New Item"
3. Fill in project details
4. Save and see it on your portfolio!

### Modify Styling
- Edit `tailwind.config.ts` for theme changes
- Modify component files in `src/components/`
- Update animations in Framer Motion components

### Backend Configuration
- Edit `backend/.env` for environment variables
- Modify API endpoints in `backend/src/routes/`
- Update database models in `backend/src/models/`

## 🔧 Development

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Commands
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start           # Start production server
```

## 🌟 Next Steps

1. **Add Real Content** - Replace sample data with your projects
2. **Customize Styling** - Match your brand colors and fonts
3. **Add Authentication** - Protect admin dashboard
4. **Deploy** - Host on Vercel/Netlify (frontend) + Railway/Heroku (backend)
5. **Add Features** - Blog, testimonials, analytics

## 📞 Support

Your portfolio is now fully functional with:
- ✅ Dynamic portfolio loading from API
- ✅ Working contact form
- ✅ Admin dashboard for content management
- ✅ Secure backend with authentication
- ✅ Modern, responsive design

**Ready to showcase your video editing skills!** 🎬✨
