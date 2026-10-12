import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, getMe, getUsers, createUser } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Strict rate limiter for Admin Login to prevent brute-force credential stuffing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: process.env.NODE_ENV === 'production' ? 5 : 50, // 50 in dev, 5 in prod
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.get('/users', protect, authorize('SUPER_ADMIN'), getUsers);
router.post('/users', protect, authorize('SUPER_ADMIN'), createUser);

export default router;
