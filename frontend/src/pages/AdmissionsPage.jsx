import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  CheckCircle2,
  FileText,
  Calendar,
  HelpCircle,
  Phone,
  Send,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Building,
  MapPin,
  Mail,
  Globe,
  User,
  GraduationCap,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Download,
  ExternalLink,
  Printer,
  BadgeIndianRupee,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import {
  SCHOOL_INFO,
  ADMISSION_STEPS,
  REQUIRED_DOCUMENTS,
  ADMISSION_FAQS,
} from '../data/schoolData';
import api from '../services/api';

export default function AdmissionsPage() {
  const [submittedId, setSubmittedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await api.submitEnquiry(data);
      setSubmittedId(res.enquiryId || 'ZIPS-2026-SUBMITTED');
      reset();
    } catch (_) {
      alert('Error submitting enquiry. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO
        title="Admissions 2026-2027 | Process, Eligibility & Online Form"
        description="Apply for admission at Zainab International Public School for the 2026-27 session. Nursery to Class VIII in Rathgawan, Aligarh. Step-by-step guidance and downloadable PDF admission form."
        schemaType="FAQPage"
      />

      <PageHero
        badge="Admissions Open 2026-2027"
        title="Begin Your Child’s Journey at ZIPS"
        subtitle="Transparent admission process, caring student counseling, and simple documentation for Nursery to Class VIII."
        breadcrumb={[{ name: 'Admissions' }]}
        bgImage="/infrastructure/zips-school-principal-office-conference-room.webp"
      />

      {/* Offline Admission Form Download Section */}
      <section className="py-8 bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-950 text-white border-b-2 border-zips-gold-400/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-zips-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-zips-gold-400 to-amber-500 text-zips-green-950 flex items-center justify-center flex-shrink-0 shadow-lg border border-amber-300">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-zips-gold-400 text-zips-green-950 text-[10px] font-black uppercase tracking-wider">
                  <span>Official Offline Registration</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-sans font-bold text-white">
                  Download Printable Admission Form (PDF)
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-2xl">
                  Prefer to apply offline? Download the official print-ready PDF form for Session {SCHOOL_INFO.academicSession} (Nursery to Class VIII). Fill it out and submit it at our school admission reception with the required documents.
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-amber-200 pt-0.5">
                  <span>✓ Format: Official PDF Document</span>
                  <span>✓ Print-Ready (A4 Size)</span>
                  <span>✓ Session {SCHOOL_INFO.academicSession}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-shrink-0">
              <a
                href="/ZIPS-Admission-Form.pdf"
                download="ZIPS-Admission-Form.pdf"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-zips-gold-400 to-zips-gold-500 hover:brightness-110 text-zips-green-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all border border-amber-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Form (PDF)</span>
              </a>
              <a
                href="/ZIPS-Admission-Form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/30 flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Online</span>
              </a>
              <Link
                to="/fees"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zips-gold-400/20 hover:bg-zips-gold-400/30 text-zips-gold-300 font-bold text-xs sm:text-sm uppercase tracking-wider border border-zips-gold-400/40 flex items-center justify-center gap-2 transition-all"
              >
                <BadgeIndianRupee className="w-4 h-4" />
                <span>Fee Structure</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Admission Steps */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Simple 4 Steps"
            title="Step-by-Step Admission Procedure"
            subtitle="Designed to be smooth, supportive, and parent-friendly from first enquiry to classroom welcome."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-sans font-extrabold text-zips-gold-500 mb-3 font-mono">
                    {step.step}
                  </div>
                  <h4 className="font-sans font-bold text-base text-zips-green-950 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zips-charcoal-700 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Documents Checklist & Eligibility Details */}
      <section id="documents" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Required Documents */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-zips-green-900 bg-zips-green-50 px-3.5 py-1 rounded-full border border-zips-green-200">
                Checklist
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zips-green-950">
                Required Documents for Admission
              </h3>
              <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed">
                Parents are requested to bring self-attested photocopies along with original documents for verification during the interaction session.
              </p>

              <div className="bg-[#FDFCF7] p-6 rounded-2xl border border-gray-200 space-y-3">
                {REQUIRED_DOCUMENTS.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zips-charcoal-800">
                    <CheckCircle2 className="w-4 h-4 text-zips-green-800 flex-shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-gray-500 font-medium">Have your documents ready?</span>
                  <a
                    href="/ZIPS-Admission-Form.pdf"
                    download="ZIPS-Admission-Form.pdf"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-zips-green-900 hover:text-zips-gold-600 underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Form (PDF)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Eligibility & Grade Information */}
            <div id="eligibility" className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-50 px-3.5 py-1 rounded-full border border-zips-gold-300">
                Grade Structure
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zips-green-950">
                Available Classes & Age Guidelines
              </h3>
              <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed">
                ZIPS offers admissions for children across Kindergarten, Primary, and Middle/Secondary grades for Academic Session {SCHOOL_INFO.academicSession}.
              </p>

              <div className="bg-[#FDFCF7] p-6 rounded-2xl border border-gray-200 space-y-4">
                <div className="border-b border-gray-200 pb-3">
                  <h5 className="font-sans font-bold text-sm text-zips-green-950">Kindergarten Wing</h5>
                  <p className="text-xs text-zips-charcoal-700 mt-1">
                    <strong>Nursery & KG:</strong> Child should be at least 3+ years old for Nursery as of March 31st of the academic year.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-3">
                  <h5 className="font-sans font-bold text-sm text-zips-green-950">Primary Wing (Class I to V)</h5>
                  <p className="text-xs text-zips-charcoal-700 mt-1">
                    Age criteria progressive as per standard educational guidelines. Previous academic report card and transfer certificate required for Class I and above.
                  </p>
                </div>
                <div>
                  <h5 className="font-sans font-bold text-sm text-zips-green-950">Middle & Secondary Wing (Class VI to IX)</h5>
                  <p className="text-xs text-zips-charcoal-700 mt-1">
                    Evaluation based on previous school transcripts and foundational subject readiness in English, Math, and Science.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Inline Admission Enquiry Form (Exact Match to Popup Design) */}
      <section id="form" className="py-16 sm:py-20 bg-zips-green-950 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Online Registration"
            title="Admission Enquiry Form 2026-2027"
            subtitle="Submit your details below to schedule an interaction session and campus walkthrough."
            light={true}
          />

          {/* Exact Popup-Styled Institutional Card */}
          <div
            className="relative w-full bg-[#FDFCF7] text-zips-charcoal-900 rounded-2xl shadow-2xl border-4 border-zips-gold-400 font-sans overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(#d4d4d8 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          >
            {/* 1. Top Header Banner */}
            <div className="relative bg-white/95 border-b border-zips-gold-300 px-4 py-2.5 shadow-xs">
              <div className="flex items-center gap-3">
                <img src="/zip-logo.png" alt="ZIPS Logo" className="h-10 w-auto flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-black tracking-tight text-zips-green-950 uppercase truncate">
                      ZAINAB INTERNATIONAL PUBLIC SCHOOL
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold tracking-wider uppercase border border-red-200 flex-shrink-0">
                      UDISE: 09124109231
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-600 flex items-center gap-1 truncate mt-0.5">
                    <MapPin className="w-3 h-3 text-zips-gold-600 flex-shrink-0" />
                    <span>Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Main Body Content */}
            <div className="p-3 sm:p-4">
              {submittedId ? (
                <div className="text-center py-8 bg-white/95 rounded-xl p-5 border-2 border-dashed border-zips-green-400 shadow-md my-4">
                  <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-400 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-zips-gold-100 text-zips-gold-800 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-zips-gold-300">
                    Registration Successful! 🎉
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-zips-green-950 mb-1.5">
                    Enquiry Received!
                  </h3>
                  <p className="text-xs text-gray-700 mb-3 max-w-md mx-auto">
                    Your child's admission enquiry reference ID is:
                  </p>
                  <div className="inline-block bg-zips-green-950 text-zips-gold-400 font-mono font-bold text-lg px-5 py-1.5 rounded-lg mb-4 shadow-inner border border-zips-gold-400">
                    {submittedId}
                  </div>
                  <p className="text-[11px] text-gray-600 mb-4">
                    Our Admissions Team will contact you shortly. Helpline:{' '}
                    <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="font-bold text-zips-green-800 underline">
                      {SCHOOL_INFO.phones[0]}
                    </a>
                  </p>
                  <button
                    onClick={() => setSubmittedId(null)}
                    className="px-6 py-2 bg-zips-green-900 hover:bg-zips-green-800 text-white font-bold text-xs rounded-lg shadow transition-all"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                  {/* Left Column: Blackboard & Admission Badge */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
                    {/* Compact Admission Open Bar */}
                    <div className="flex items-center justify-between gap-1 p-2 rounded-xl bg-gradient-to-r from-emerald-800 via-zips-green-900 to-emerald-800 text-white shadow-sm border border-emerald-600/40">
                      <span className="text-xs font-black uppercase text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                        <span>ADMISSION OPEN</span>
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold">
                        <span className="px-1.5 py-0.5 rounded bg-amber-400 text-zips-green-950 font-extrabold">{SCHOOL_INFO.academicSession}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/20 text-white">NURSERY – VIII</span>
                      </div>
                    </div>

                    {/* Cartoon Blackboard */}
                    <div className="rounded-xl p-2 bg-[#8B5A2B] shadow-md border-2 border-[#6B4226] flex-grow flex flex-col justify-between">
                      <div className="bg-[#1C4332] text-white rounded-lg p-3 border border-dashed border-emerald-400/40 shadow-inner flex flex-col justify-between h-full">
                        <div>
                          {/* Header */}
                          <div className="flex items-center justify-between border-b border-emerald-400/30 pb-1.5 mb-2">
                            <h4 className="text-xs sm:text-sm font-black text-amber-300 tracking-wide flex items-center gap-1">
                              <span>✨ Why Trust ZIPS ?</span>
                            </h4>
                            <span className="text-[9px] uppercase font-bold text-emerald-200 bg-emerald-950/70 px-1.5 py-0.5 rounded">
                              Excellence
                            </span>
                          </div>

                          {/* 3 Bullet Points */}
                          <ul className="space-y-1.5 text-[11px] text-gray-100">
                            <li className="flex items-start gap-1.5 leading-tight">
                              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>
                                <strong className="text-amber-200">Concept-Based Learning:</strong> Digital smart classes & experiential activities.
                              </span>
                            </li>
                            <li className="flex items-start gap-1.5 leading-tight">
                              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>
                                <strong className="text-amber-200">Experienced Faculty:</strong> Caring mentors for all-round personality growth.
                              </span>
                            </li>
                            <li className="flex items-start gap-1.5 leading-tight">
                              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span>
                                <strong className="text-amber-200">English Speaking Ambience:</strong> Strong communication & moral values.
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* Bottom Tagline */}
                        <div className="mt-2 pt-1.5 border-t border-emerald-400/20 flex items-center justify-between text-[10px] text-emerald-200">
                          <span>🚀 Rise & Shine</span>
                          <span>🎨 Sports & Clubs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Registration Form */}
                  <div className="lg:col-span-7 bg-white/95 rounded-xl p-3 sm:p-4 shadow-md border-2 border-zips-gold-400 flex flex-col justify-between">
                    {/* Form Header */}
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100">
                      <div className="inline-flex items-center gap-1.5 bg-zips-green-950 text-white px-2.5 py-1 rounded-full shadow-xs">
                        <Lightbulb className="w-3 h-3 text-amber-400" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                          REGISTER NOW • ENQUIRY FORM
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 hidden sm:inline">
                        Quick Apply
                      </span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Parent Name */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Parent / Guardian Name *
                          </label>
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              {...register('parentName', { required: 'Required' })}
                              placeholder="e.g. Farhan Ahmad"
                              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                          {errors.parentName && (
                            <span className="text-[10px] text-red-600 block">{errors.parentName.message}</span>
                          )}
                        </div>

                        {/* Student Name */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Student Name *
                          </label>
                          <div className="relative">
                            <GraduationCap className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              {...register('studentName', { required: 'Required' })}
                              placeholder="e.g. Ayaan Ahmad"
                              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                          {errors.studentName && (
                            <span className="text-[10px] text-red-600 block">{errors.studentName.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Class Applying For */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Class Applying For *
                          </label>
                          <div className="relative">
                            <BookOpen className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <select
                              {...register('classApplyingFor', { required: 'Required' })}
                              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select Grade</option>
                              <option value="Nursery">Nursery</option>
                              <option value="KG">KG</option>
                              <option value="Class I">Class I</option>
                              <option value="Class II">Class II</option>
                              <option value="Class III">Class III</option>
                              <option value="Class IV">Class IV</option>
                              <option value="Class V">Class V</option>
                              <option value="Class VI">Class VI</option>
                              <option value="Class VII">Class VII</option>
                              <option value="Class VIII">Class VIII</option>
                            </select>
                          </div>
                          {errors.classApplyingFor && (
                            <span className="text-[10px] text-red-600 block">{errors.classApplyingFor.message}</span>
                          )}
                        </div>

                        {/* Phone / WhatsApp */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Contact Phone / WhatsApp *
                          </label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="tel"
                              {...register('phoneNumber', { required: 'Required' })}
                              placeholder="+91-9411030100"
                              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                          {errors.phoneNumber && (
                            <span className="text-[10px] text-red-600 block">{errors.phoneNumber.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Email */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Email Address (Optional)
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="email"
                              {...register('email')}
                              placeholder="parent@example.com"
                              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            City / Locality
                          </label>
                          <div className="relative">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              {...register('city')}
                              defaultValue="Aligarh"
                              className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Campus Tour Checkbox */}
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/90 border border-amber-200">
                        <input
                          type="checkbox"
                          id="admissionsCampusTour"
                          {...register('campusVisitRequested')}
                          defaultChecked={true}
                          className="w-3.5 h-3.5 rounded text-zips-green-800 focus:ring-zips-green-700 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="admissionsCampusTour" className="text-[11px] text-zips-charcoal-900 cursor-pointer font-medium">
                          Yes, book an in-person <strong>Campus Tour & Counseling</strong> for my family.
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-2.5 px-4 rounded-xl text-white font-black text-xs uppercase tracking-wider bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-950 hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2 border border-zips-gold-400"
                        >
                          {submitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Submitting...</span>
                            </div>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-amber-300" />
                              <span>SUBMIT ENQUIRY NOW</span>
                              <span className="text-amber-300">🚀</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bottom Footer Utility Bar */}
            <div className="bg-[#EAE5D8] border-t border-zips-gold-300/80 px-4 py-2 text-[11px] text-zips-charcoal-800 flex flex-wrap items-center justify-between gap-2 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zips-green-800 flex-shrink-0" />
                <span>
                  <a href={`tel:${SCHOOL_INFO.phones[1]}`} className="hover:underline">{SCHOOL_INFO.phones[1]}</a> ,{' '}
                  <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="hover:underline">{SCHOOL_INFO.phones[0]}</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zips-green-800 flex-shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:underline">{SCHOOL_INFO.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-zips-green-800 flex-shrink-0" />
                <a href={SCHOOL_INFO.social.website} target="_blank" rel="noopener noreferrer" className="hover:underline">www.zips.org.in</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Admission FAQs */}
      <section id="faq" className="py-20 bg-[#FDFCF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Got Questions?"
            title="Frequently Asked Admission Questions"
            subtitle="Quick answers to common questions about admissions, values, transport, and campus life."
          />

          <div className="space-y-4">
            {ADMISSION_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <h5 className="font-sans font-bold text-sm sm:text-base text-zips-green-950">
                    {faq.q}
                  </h5>
                  <ChevronDown className={`w-5 h-5 text-zips-gold-600 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zips-charcoal-700 border-t border-gray-100 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
