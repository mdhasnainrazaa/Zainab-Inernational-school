import express from 'express';
import {
  getEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:slug', getEventBySlug);
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createEvent);
router.patch('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateEvent);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteEvent);

export default router;
