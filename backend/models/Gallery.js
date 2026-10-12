import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      'Campus & Buildings',
      'Smart Classrooms',
      'Laboratories',
      'Discovery Library',
      'Sports & Martial Arts',
      'Activities & Workshops',
      'Celebrations & Events',
      'Students & Community',
    ],
    default: 'Campus & Buildings',
    index: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
