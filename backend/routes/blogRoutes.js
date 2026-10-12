import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/admin', protect, getAdminBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, authorize('SUPER_ADMIN', 'ADMIN'), createBlog);
router.patch('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateBlog);
router.delete('/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteBlog);

export default router;
