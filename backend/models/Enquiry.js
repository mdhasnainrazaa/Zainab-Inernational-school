import mongoose from 'mongoose';

const enquiryNoteSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  note: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const enquirySchema = new mongoose.Schema({
  enquiryId: {
    type: String,
    unique: true,
    index: true,
  },
  parentName: {
    type: String,
    required: [true, 'Parent/Guardian name is required'],
    trim: true,
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
  },
  studentDob: {
    type: Date,
  },
  currentClass: {
    type: String,
    trim: true,
  },
  classApplyingFor: {
    type: String,
    required: [true, 'Class applying for is required'],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
    default: 'Aligarh',
  },
  preferredContactMethod: {
    type: String,
    enum: ['PHONE', 'WHATSAPP', 'EMAIL'],
    default: 'PHONE',
  },
  message: {
    type: String,
    trim: true,
  },
  campusVisitRequested: {
    type: Boolean,
    default: false,
  },
  preferredVisitDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: [
      'NEW',
      'CONTACTED',
      'FOLLOW_UP',
      'QUALIFIED',
      'CAMPUS_VISIT',
      'APPLIED',
      'ADMITTED',
      'CLOSED',
      'LOST',
    ],
    default: 'NEW',
    index: true,
  },
  assignedTo: {
    type: String,
    default: 'Unassigned',
  },
  followUpDate: {
    type: Date,
  },
  notes: [enquiryNoteSchema],
  source: {
    type: String,
    default: 'WEBSITE_FORM',
  },
}, {
  timestamps: true,
});

// Performance Indexes for Dashboard & CRM Filtering
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ classApplyingFor: 1, status: 1 });
enquirySchema.index({ parentName: 'text', studentName: 'text', phoneNumber: 'text' });

enquirySchema.pre('save', async function (next) {
  if (!this.enquiryId) {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    this.enquiryId = `ZIPS-${new Date().getFullYear()}-${randomHex}`;
  }
  next();
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
