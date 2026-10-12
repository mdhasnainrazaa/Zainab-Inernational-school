# ZAINAB INTERNATIONAL PUBLIC SCHOOL (ZIPS)
## Premium MERN-Stack School Web Platform & Institutional CMS

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-gold.svg)]()

> **Zainab International Public School (ZIPS)**
> Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh, Uttar Pradesh, India
> *"Rise & Shine — Shaping Confident Learners. Building Strong Character."*

---

## 🏫 Overview
A modern, production-grade educational web application tailored specifically to **Zainab International Public School**. 

The platform blends:
- **World-Class Academic Storytelling**: Inquiry-based learning, flipped classrooms, interactive STEM labs, and 12 future-ready educational outcomes.
- **Authoritative Vision & Leadership**: Exact Founder (Mr. M. A. Siddiqui) and Principal philosophies (*"Involve me and I learn"*).
- **Beyond Academics**: Dedicated modules for Martial Arts, Yoga, Abacus, Chess, Sudoku, Calligraphy, and Art & Craft.
- **Kindergarten Hub**: Specialized Nursery & KG exploratory early-years environment.
- **Campus Infrastructure**: Discovery Library (*"More than a library — a world of discovery"*), Hygienic Canteen (*"Affordable, Healthy, Hygienic Nutrition"*), Laboratories, and Sports Turf.
- **Full Admissions CRM Pipeline**: Multi-status lead management (`NEW` $\rightarrow$ `CONTACTED` $\rightarrow$ `FOLLOW_UP` $\rightarrow$ `QUALIFIED` $\rightarrow$ `CAMPUS_VISIT` $\rightarrow$ `APPLIED` $\rightarrow$ `ADMITTED`), timestamped staff notes, and 1-click CSV export.
- **Comprehensive CMS Admin Panel**: Role-based access (Super Admin, Admin, Editor) to manage blogs, activities, events, facilities, gallery photos, testimonials, and SEO metadata.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Custom ZIPS Emerald Green, Warm Gold & Ivory tokens)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form
- **API & Client State**: Axios + Custom resilient fallback service
- **Routing**: React Router v7

### Backend & Database
- **Runtime**: Node.js & Express.js (ES Modules)
- **Database**: MongoDB & Mongoose
- **Security**: Helmet, CORS, Rate Limiting, Cookie Parser, bcryptjs
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only cookies and RBAC middleware

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (Local instance or MongoDB Atlas connection string)

---

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/zips_school_db
JWT_SECRET=zips_academic_excellence_jwt_secret_key_2026_super_secure
CLIENT_URL=http://localhost:5173
```

Seed initial database (Admin accounts, exact client vision, mission, activities, facilities):
```bash
npm run seed
```

Start the Backend Server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

---

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start the Frontend Development Server:
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔐 Administrative Access
- **Admin Portal URL**: `http://localhost:5173/admin/login`
- **Default Super Admin**: `admin@zips.org.in`
- **Default Password**: `AdminPassword123!`
- *(Demo login button provided on the login screen for 1-click evaluation)*

---

## 🌐 Production Deployment Guide

### Deploying Frontend on Vercel
1. Push repository to GitHub.
2. Link project in [Vercel Dashboard](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-service.onrender.com/api`

### Deploying Backend on Render / Railway
1. Set **Root Directory** to `backend`.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Configure Environment Variables in Render:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster.mongodb.net/zips_school_db`
   - `JWT_SECRET` = `<your-secure-production-jwt-secret>`
   - `CLIENT_URL` = `https://your-frontend.vercel.app`

---

## 🏛️ Official Institutional Verification
- **Institution**: Zainab International Public School (ZIPS)
- **Location**: Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh, Uttar Pradesh, India
- **Hotlines**: `+91-9411030100`, `+91-9411022252`
- **Email**: `tonationaleducation@gmail.com`
- **Instagram**: `https://www.instagram.com/zipsaligarh/`
