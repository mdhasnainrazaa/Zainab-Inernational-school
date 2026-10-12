import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  category: {
    type: String,
    enum: [
      'Martial Arts',
      'Yoga & Wellness',
      'Mind Games & Logic',
      'Creative Arts & Calligraphy',
      'Workshops & Training',
      'Clubs & Societies',
      'Sports & Athletics',
      'Co-Curricular',
    ],
    default: 'Co-Curricular',
    index: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  keyOutcomes: [{
    type: String,
  }],
  coverImage: {
    type: String,
    default: '',
  },
  galleryImages: [{
    type: String,
  }],
  ageGroup: {
    type: String,
    default: 'All Grades',
  },
  frequency: {
    type: String,
    default: 'Weekly Sessions',
  },
  isFeatured: {
    type: Boolean,
    default: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
