import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['Parent', 'Student', 'Alumnus', 'Educationist'],
    default: 'Parent',
  },
  relation: {
    type: String,
    default: 'Proud ZIPS Parent',
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  isFeatured: {
    type: Boolean,
    default: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
