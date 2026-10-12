import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    default: 'Zainab International Public School',
  },
  tagline: {
    type: String,
    default: 'Rise & Shine',
  },
  headline: {
    type: String,
    default: 'Shaping Confident Learners. Building Strong Character.',
  },
  primaryPhone: {
    type: String,
    default: '+91-9411030100',
  },
  secondaryPhone: {
    type: String,
    default: '+91-9411022252',
  },
  primaryEmail: {
    type: String,
    default: 'tonationaleducation@gmail.com',
  },
  address: {
    type: String,
    default: 'Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh, Uttar Pradesh, India',
  },
  mapCoordinates: {
    lat: { type: Number, default: 27.8974 },
    lng: { type: Number, default: 78.0880 },
  },
  mapEmbedUrl: {
    type: String,
    default: 'https://maps.google.com/maps?q=Behind+CDF+Krishi+Vigyan+Kendra+Rathgawan+Aligarh&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
  instagramUrl: {
    type: String,
    default: 'https://www.instagram.com/zipsaligarh/',
  },
  facebookUrl: {
    type: String,
    default: 'https://facebook.com',
  },
  youtubeUrl: {
    type: String,
    default: '',
  },
  academicSession: {
    type: String,
    default: '2026-2027',
  },
  isAdmissionOpen: {
    type: Boolean,
    default: true,
  },
  announcementNotice: {
    isActive: { type: Boolean, default: true },
    text: { type: String, default: 'Admissions Open for Academic Session 2026-2027 (Nursery to Senior Classes). Schedule your campus visit today!' },
    link: { type: String, default: '/admissions' },
  },
}, {
  timestamps: true,
});

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);
export default SiteSetting;
