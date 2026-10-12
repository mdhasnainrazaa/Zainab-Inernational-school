import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'Academic Insights',
    index: true,
  },
  tags: [{
    type: String,
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  authorName: {
    type: String,
    default: 'ZIPS Editorial Desk',
  },
  readTime: {
    type: String,
    default: '4 min read',
  },
  seoTitle: {
    type: String,
  },
  seoDescription: {
    type: String,
  },
  canonicalUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    default: 'PUBLISHED',
    index: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Performance Indexes for Public Querying & Admin Management
blogSchema.index({ status: 1, category: 1, publishedAt: -1 });
blogSchema.index({ status: 1, isFeatured: 1, publishedAt: -1 });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ title: 'text', excerpt: 'text' });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
