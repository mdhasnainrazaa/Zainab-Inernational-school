import express from 'express';
import {
  getActivities,
  getActivityBySlug,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/:slug', getActivityBySlug);
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createActivity);
router.patch('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateActivity);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteActivity);

export default router;
