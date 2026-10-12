import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    default: '09:00 AM - 01:00 PM',
  },
  location: {
    type: String,
    default: 'ZIPS Main Campus, Rathgawan, Aligarh',
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
  },
  coverImage: {
    type: String,
    default: '',
  },
  isUpcoming: {
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

const Event = mongoose.model('Event', eventSchema);
export default Event;
