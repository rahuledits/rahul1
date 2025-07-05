import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8081',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Sample API endpoints
app.get('/api/portfolio', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        title: 'Sample Project 1',
        description: 'A beautiful web application',
        image: '/placeholder.svg',
        category: 'web',
        technologies: ['React', 'TypeScript', 'Tailwind']
      },
      {
        id: 2,
        title: 'Sample Project 2',
        description: 'Mobile app development',
        image: '/placeholder.svg',
        category: 'mobile',
        technologies: ['React Native', 'Firebase']
      }
    ]
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Simulate saving to database
  console.log('Contact form submission:', { name, email, subject, message });
  
  res.json({
    success: true,
    message: 'Message sent successfully!',
    data: { name, email, subject, message }
  });
});

app.get('/api/auth/me', (req, res) => {
  // Simulate user data
  res.json({
    success: true,
    data: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:8081'}`);
}); 