import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      enum: ['General', 'Admissions', 'Academic', 'Holidays', 'Urgent', 'Events'],
      default: 'General',
    },
    priority: {
      type: String,
      enum: ['Normal', 'Important', 'Urgent'],
      default: 'Normal',
    },
    content: {
      type: String,
      required: [true, 'Notice message or details are required'],
    },
    shortSummary: {
      type: String,
      default: '',
    },
    attachmentUrl: {
      type: String,
      default: '',
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    targetAudience: {
      type: String,
      enum: ['All', 'Parents', 'Students', 'Faculty'],
      default: 'All',
    },
  },
  {
    timestamps: true,
  }
);

noticeSchema.index({ isActive: 1, publishDate: -1 });

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
