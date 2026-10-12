import express from 'express';
import {
  getFacilities,
  getFacilityBySlug,
  createFacility,
  updateFacility,
  deleteFacility,
} from '../controllers/facilityController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFacilities);
router.get('/:slug', getFacilityBySlug);
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createFacility);
router.patch('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateFacility);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteFacility);

export default router;
