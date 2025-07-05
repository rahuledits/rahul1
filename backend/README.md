# Portfolio Backend API

A modern Node.js/Express backend with TypeScript for a portfolio website.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access
- 📊 **Database** - MongoDB with Mongoose ODM
- 🛡️ **Security** - Helmet, CORS, Rate limiting
- 📝 **Logging** - Morgan HTTP request logger
- 🔄 **TypeScript** - Full TypeScript support
- 🚀 **Modern ES6+** - Latest JavaScript features

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Portfolio
- `GET /api/portfolio` - Get all portfolio items (public)
- `GET /api/portfolio/:id` - Get single portfolio item (public)
- `POST /api/portfolio` - Create portfolio item (admin)
- `PUT /api/portfolio/:id` - Update portfolio item (admin)
- `DELETE /api/portfolio/:id` - Delete portfolio item (admin)

### Contact
- `POST /api/contact` - Send contact message (public)
- `GET /api/contact` - Get all contact messages (admin)
- `GET /api/contact/:id` - Get single contact message (admin)
- `PUT /api/contact/:id` - Update contact status (admin)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables**
   Copy `env.example` to `.env` and configure:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio_db
   JWT_SECRET=your-super-secret-jwt-key-here
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Database**
   Make sure MongoDB is running locally or update `MONGODB_URI`

4. **Development**
   ```bash
   npm run dev
   ```

5. **Production**
   ```bash
   npm run build
   npm start
   ```

## Database Models

### User
- Authentication and profile management
- Role-based access (user/admin)
- Social links and bio

### Portfolio
- Project showcase items
- Categories: web, mobile, design, other
- Featured projects and ordering

### Contact
- Contact form submissions
- Status tracking (pending/read/replied)
- IP and user agent tracking

## Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for password security
- **Rate Limiting** - Prevent abuse
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Input Validation** - Mongoose schema validation

## Development

- **TypeScript** - Full type safety
- **ESLint** - Code quality
- **Nodemon** - Auto-restart on changes
- **Hot Reload** - Development server

## API Response Format

```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "message": "Success message"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message"
}
``` 