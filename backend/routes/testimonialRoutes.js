import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createTestimonial);
router.patch('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateTestimonial);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteTestimonial);

export default router;
