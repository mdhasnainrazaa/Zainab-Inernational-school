import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import User from './models/User.js';
import Enquiry from './models/Enquiry.js';
import Notice from './models/Notice.js';

dotenv.config();

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (_) {}

const connUri = process.env.MONGODB_URI || process.env.MONGODB_URL || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zips_school_db';

const seedData = async () => {
  try {
    await mongoose.connect(connUri);
    console.log('[Seed] Connected to database');

    // Clean existing
    await User.deleteMany();
    await Enquiry.deleteMany();
    await Notice.deleteMany();

    console.log('[Seed] Cleared existing collections (Users, Enquiries, Notices)');

    // 1. Users (Admin User)
    const adminEmail = (process.env.ADMIN_EMAIL || process.env.ADMIN_GMAIL || 'hkbinfotechofficial@gmail.com').trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || 'zips@123').trim();

    await User.create({
      name: process.env.ADMIN_NAME || 'ZIPS Administrator',
      email: adminEmail,
      password: adminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    });

    console.log(`[Seed] Created Admin user from .env (${adminEmail})`);

    // 2. Admission Enquiries (Kept clean for real parent submissions)

    // 3. Initial School Notices
    await Notice.create([
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
    ]);

    console.log('[Seed] Database successfully populated with initial Admin & Notices!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
