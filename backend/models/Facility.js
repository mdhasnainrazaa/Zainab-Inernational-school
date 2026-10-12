import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Facility name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  tag: {
    type: String,
    default: 'Campus Infrastructure',
  },
  highlightQuote: {
    type: String,
    default: '',
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
  }],
  coverImage: {
    type: String,
    default: '',
  },
  galleryImages: [{
    type: String,
  }],
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

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
