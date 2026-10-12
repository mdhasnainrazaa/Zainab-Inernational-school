import Blog from '../models/Blog.js';
import { escapeRegex, sanitizeString } from '../utils/security.js';

// Helper slug generator
const slugify = (text) =>
  sanitizeString(text)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// @desc   Get All Published Blogs (Public)
// @route  GET /api/blogs
// @access Public
export const getBlogs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = { status: 'PUBLISHED' };

    if (category && category !== 'All') {
      query.category = sanitizeString(category);
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const cleanSearch = escapeRegex(search.trim());
      query.$or = [
        { title: { $regex: cleanSearch, $options: 'i' } },
        { excerpt: { $regex: cleanSearch, $options: 'i' } },
        { tags: { $in: [new RegExp(cleanSearch, 'i')] } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 9));

    const [total, blogs] = await Promise.all([
      Blog.countDocuments(query),
      Blog.find(query)
        .select('title slug excerpt category featuredImage tags authorName readTime publishedAt isFeatured')
        .sort({ publishedAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
    ]);

    // Public Cache-Control: Allow browser & edge caching for 2 minutes with stale-while-revalidate
    res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get Single Blog by Slug (Public)
// @route  GET /api/blogs/:slug
// @access Public
export const getBlogBySlug = async (req, res, next) => {
  try {
    const cleanSlug = sanitizeString(req.params.slug);
    const blog = await Blog.findOne({ slug: cleanSlug }).lean();
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const related = await Blog.find({
      _id: { $ne: blog._id },
      category: blog.category,
      status: 'PUBLISHED',
    })
      .select('title slug excerpt category featuredImage authorName readTime publishedAt')
      .limit(3)
      .lean();

    res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
    res.status(200).json({ success: true, blog, related });
  } catch (error) {
    next(error);
  }
};

// @desc   Get Admin Blogs (Includes Drafts)
// @route  GET /api/admin/blogs
// @access Private (Admin)
export const getAdminBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .select('title slug category status authorName isFeatured publishedAt createdAt')
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    next(error);
  }
};

// @desc   Create New Blog
// @route  POST /api/blogs
// @access Private
export const createBlog = async (req, res, next) => {
  try {
    const { title, excerpt, content, featuredImage, category, tags, status, seoTitle, seoDescription } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    let slug = slugify(title);
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      title: sanitizeString(title),
      slug,
      excerpt: sanitizeString(excerpt),
      content,
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      category: category || 'Academic Insights',
      tags: tags ? (Array.isArray(tags) ? tags.map(t => sanitizeString(t)) : tags.split(',').map(t => sanitizeString(t))) : [],
      status: status || 'PUBLISHED',
      author: req.user ? req.user._id : null,
      authorName: req.user ? req.user.name : 'ZIPS Editorial Desk',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
    });

    res.status(201).json({ success: true, message: 'Blog created successfully', blog });
  } catch (error) {
    next(error);
  }
};

// @desc   Update Blog
// @route  PATCH /api/blogs/:id
// @access Private
export const updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Whitelist allowed fields to prevent mass assignment
    const allowedFields = ['title', 'excerpt', 'content', 'featuredImage', 'category', 'tags', 'status', 'seoTitle', 'seoDescription'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (updateData.title && updateData.title !== blog.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => sanitizeString(t));
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Blog updated successfully', blog });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete Blog
// @route  DELETE /api/blogs/:id
// @access Private
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
};
