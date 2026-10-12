import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryStats,
  getEnquiryById,
  updateEnquiryStatus,
  addEnquiryNote,
  exportEnquiriesCSV,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Rate limiter dedicated strictly to public enquiry submissions
const enquirySubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 15 : 100,
  message: {
    success: false,
    message: 'Too many enquiry submissions from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public route for submitting enquiries
router.post('/', enquirySubmitLimiter, createEnquiry);

// Protected CRM routes
router.get('/', protect, getEnquiries);
router.get('/stats', protect, getEnquiryStats);
router.get('/export/csv', protect, exportEnquiriesCSV);
router.get('/:id', protect, getEnquiryById);
router.patch('/:id/status', protect, updateEnquiryStatus);
router.post('/:id/notes', protect, addEnquiryNote);
router.delete('/:id', protect, authorize('SUPER_ADMIN'), deleteEnquiry);

export default router;
