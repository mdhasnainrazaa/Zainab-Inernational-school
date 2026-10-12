import express from 'express';
import {
  getNotices,
  getAdminNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../controllers/noticeController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getNotices);
router.get('/admin', protect, getAdminNotices);
router.get('/:id', getNoticeById);
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createNotice);
router.put('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateNotice);
router.patch('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateNotice);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteNotice);

export default router;
