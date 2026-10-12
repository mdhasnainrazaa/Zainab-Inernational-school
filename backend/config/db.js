import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch (_) {}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncAdminUser } from './initAdmin.js';
import Notice from '../models/Notice.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

const INITIAL_NOTICES = [
  {
    title: 'Admissions Open for Academic Session 2026–27 (Nursery to Class VIII)',
    category: 'Admissions',
    priority: 'Urgent',
    shortSummary: 'Online & walk-in registrations are underway for Nursery to Class VIII. Schedule a personal campus tour & counseling session.',
    content: 'Zainab International Public School announces admissions open for Academic Session 2026-2027 from Nursery & KG up to Class VIII. Parents are invited to register online or visit our admissions helpdesk behind CDF, Rathgawan, Aligarh between 8:00 AM – 3:30 PM.',
    publishDate: new Date('2026-10-06T08:00:00.000Z'),
    targetAudience: 'Parents',
    isActive: true,
  },
  {
    title: 'Parent-Teacher Meeting (PTM) & Student Growth Review',
    category: 'Academic',
    priority: 'Important',
    shortSummary: 'One-on-one parent-educator interaction scheduled for Saturday to discuss holistic learning progress & activities.',
    content: 'Dear Parents & Guardians, the Parent-Teacher Meeting (PTM) is scheduled for this Saturday from 9:00 AM to 1:00 PM. Class teachers and skill mentors look forward to discussing your ward’s foundational progress, communication skills, and term activities.',
    publishDate: new Date('2026-10-04T09:30:00.000Z'),
    targetAudience: 'Parents',
    isActive: true,
  },
  {
    title: 'Annual Sports Meet & Inter-House Championship Trials',
    category: 'Events',
    priority: 'Normal',
    shortSummary: 'Intra-school selection trials for Athletics, Martial Arts (Karate), Chess, and Speed Math beginning next week.',
    content: 'Selection trials for upcoming Inter-House Athletics, Karate, Yoga, and Chess championships will take place on the campus sports ground. Students from Class I to VIII can register with their sports instructors.',
    publishDate: new Date('2026-10-01T10:00:00.000Z'),
    targetAudience: 'Students',
    isActive: true,
  },
  {
    title: 'Winter Uniform Shift & Revised Morning Campus Schedule',
    category: 'General',
    priority: 'Normal',
    shortSummary: 'Guidelines on seasonal winter uniform sets and updated morning assembly timings for the upcoming season.',
    content: 'Parents and guardians are requested to prepare standard winter uniform sets (school blazer, sweater, and tie) for their wards. Revised morning assembly and bus pickup timings will be communicated via the official school portal.',
    publishDate: new Date('2026-09-28T11:00:00.000Z'),
    targetAudience: 'All',
    isActive: true,
  },
];

const connectDB = async () => {
  try {
    const mongoUri = 
      process.env.MONGODB_URI || 
      process.env.MONGO_URI || 
      process.env.MONGODB_URL;

    if (!mongoUri) {
      console.error('❌ MONGODB_URI is not defined in your .env file!');
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`✅ Database connected successfully: ${conn.connection.host}`);

    // Automatically sync / create Admin from .env credentials
    await syncAdminUser();

    // Auto-seed notices if collection is empty
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.insertMany(INITIAL_NOTICES);
      console.log('📌 [Notice Board]: Initialized default school notices in MongoDB.');
    }
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
  }
};

export default connectDB;
