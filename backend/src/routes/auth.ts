import express from 'express';
import { protect } from '../middleware/auth';
import { register, login, getMe, updateProfile, logout } from '../controllers/authController';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

export default router; 