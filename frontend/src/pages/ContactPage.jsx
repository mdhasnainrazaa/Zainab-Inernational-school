import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Compass,
  MessageSquare,
  Instagram,
  Sparkles,
  User,
  GraduationCap,
  BookOpen,
  Lightbulb,
  PhoneCall,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import { SCHOOL_INFO } from '../data/schoolData';
import api from '../services/api';

export default function ContactPage() {
  const [submittedId, setSubmittedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await api.submitEnquiry(data);
      setSubmittedId(res.enquiryId || 'ZIPS-2026-SUBMITTED');
      reset();
    } catch (err) {
      alert('Error submitting enquiry. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO
        title="Contact Us & Campus Location"
        description="Visit Zainab International Public School behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh. Direct phone lines, email and enquiry form."
        schemaType="LocalBusiness"
      />

      <PageHero
        badge="Connect With Us"
        title="Contact & Campus Location"
        subtitle="We warmly invite parents and visitors to visit our campus or connect with our admissions desk."
        breadcrumb={[{ name: 'Contact' }]}
        bgImage="/image/Szanab-internationa-Campus.png"
        imageClassName="scale-130 sm:scale-135 object-center"
      />

      <section className="py-12 sm:py-16 bg-[#FDFCF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Contact Information Card (Compact Sleek Size) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-premium border border-gray-200/90 flex flex-col justify-between h-full relative overflow-hidden group">
                {/* Subtle top ambient glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-zips-gold-100/50 to-transparent rounded-full blur-xl pointer-events-none"></div>

                <div className="relative z-10">
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zips-gold-800 bg-gradient-to-r from-zips-gold-50 to-amber-50/80 px-2.5 py-0.5 rounded-full border border-zips-gold-300 shadow-xs">
                      <Sparkles className="w-3 h-3 text-zips-gold-600" />
                      Campus Helpdesk
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Admissions Open
                    </span>
                  </div>

                  {/* School Title & Info */}
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-zips-green-950 mb-1 leading-tight tracking-tight">
                    Zainab International <span className="text-emerald-700">Public School</span>
                  </h3>
                  <p className="text-xs text-zips-charcoal-700 leading-relaxed mb-3.5 font-medium">
                    Located in the serene green environs of Rathgawan, Aligarh (Behind CDF & Krishi Vigyan Kendra). Parents are welcome for counseling & campus tours.
                  </p>

                  {/* 4 Interactive Contact Info Blocks */}
                  <div className="space-y-2.5">
                    {/* 1. Address */}
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FBFBF8] hover:bg-white border border-gray-200/80 hover:border-emerald-300 hover:shadow-xs transition-all duration-150">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-sans font-bold text-xs text-zips-green-950">Campus Location</h5>
                        <p className="text-[11px] text-zips-charcoal-700 leading-tight mt-0.5">
                          Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh, UP
                        </p>
                        <a
                          href="https://maps.google.com/?q=Behind+CDF+Krishi+Vigyan+Kendra+Rathgawan+Aligarh"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-900 mt-0.5 hover:underline"
                        >
                          <span>Open in Google Maps</span>
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>

                    {/* 2. Admissions & Reception Phone */}
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FBFBF8] hover:bg-white border border-gray-200/80 hover:border-emerald-300 hover:shadow-xs transition-all duration-150">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zips-green-800 to-zips-green-950 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                        <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-sans font-bold text-xs text-zips-green-950">Admissions Helpline</h5>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <a
                            href={`tel:${SCHOOL_INFO.phones[0]}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-zips-green-950 hover:text-white text-zips-green-950 border border-gray-200 text-[11px] font-bold transition-all shadow-2xs group/btn"
                          >
                            <Phone className="w-3 h-3 text-emerald-600 group-hover/btn:text-amber-300" />
                            <span>{SCHOOL_INFO.phones[0]}</span>
                          </a>
                          <a
                            href={`tel:${SCHOOL_INFO.phones[1]}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-zips-green-950 hover:text-white text-zips-green-950 border border-gray-200 text-[11px] font-bold transition-all shadow-2xs group/btn"
                          >
                            <Phone className="w-3 h-3 text-emerald-600 group-hover/btn:text-amber-300" />
                            <span>{SCHOOL_INFO.phones[1]}</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* 3. Email */}
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FBFBF8] hover:bg-white border border-gray-200/80 hover:border-emerald-300 hover:shadow-xs transition-all duration-150">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-sans font-bold text-xs text-zips-green-950">Email Communication</h5>
                        <a
                          href={`mailto:${SCHOOL_INFO.email}`}
                          className="inline-flex items-center gap-1 text-[11px] text-zips-charcoal-800 hover:text-emerald-700 mt-0.5 break-all font-semibold transition-colors group/mail"
                        >
                          <span>{SCHOOL_INFO.email}</span>
                          <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover/mail:text-emerald-700 flex-shrink-0" />
                        </a>
                      </div>
                    </div>

                    {/* 4. Office Hours */}
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FBFBF8] hover:bg-white border border-gray-200/80 hover:border-emerald-300 hover:shadow-xs transition-all duration-150">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-800 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-sans font-bold text-xs text-zips-green-950">Campus Office Hours</h5>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Mon–Sat
                          </span>
                        </div>
                        <p className="text-[11px] text-zips-charcoal-700 mt-0.5 font-medium">
                          8:00 AM – 3:30 PM <span className="text-gray-400 font-normal">(Sunday Closed)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Quick WhatsApp Button */}
                <div className="mt-4 pt-2.5 relative z-10 border-t border-gray-100">
                  <a
                    href="https://wa.me/919411030100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between shadow-sm border border-emerald-400/30 transition-all duration-200 hover:scale-[1.01] group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span>Chat on WhatsApp</span>
                    </div>
                    <span className="text-[11px] font-mono text-amber-300 font-semibold flex items-center gap-1">
                      +91-9411030100 <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                  <p className="text-center text-[10px] text-gray-500 mt-1.5 font-medium">
                    ⚡ Instant counseling & inquiries during office hours
                  </p>
                </div>
              </div>
            </div>

            {/* Right Contact / Admission Enquiry Form (Compact Sleek Size) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-premium border border-gray-200 flex flex-col justify-between h-full">
                {/* Form Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <div className="inline-flex items-center gap-1.5 bg-zips-green-950 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                      REGISTER NOW • ENQUIRY FORM
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 hidden sm:inline">
                    Direct Admissions Desk
                  </span>
                </div>

                {submittedId ? (
                  <div className="text-center py-8 bg-[#FDFCF7] rounded-xl p-5 border-2 border-dashed border-zips-green-400 shadow-xs my-auto">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-green-400 animate-bounce">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-zips-gold-100 text-zips-gold-800 text-[10px] font-bold uppercase tracking-wider mb-1 border border-zips-gold-300">
                      Registration Successful! 🎉
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-zips-green-950 mb-1">
                      Enquiry Received!
                    </h3>
                    <p className="text-xs text-gray-700 mb-2 max-w-md mx-auto">
                      Your child's admission enquiry reference ID is:
                    </p>
                    <div className="inline-block bg-zips-green-950 text-zips-gold-400 font-mono font-bold text-base px-4 py-1 rounded-lg mb-3 shadow-inner border border-zips-gold-400">
                      {submittedId}
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      Our Admissions Team will contact you shortly. Helpline:{' '}
                      <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="font-bold text-zips-green-800 underline">
                        {SCHOOL_INFO.phones[0]}
                      </a>
                    </p>
                    <button
                      onClick={() => setSubmittedId(null)}
                      className="px-5 py-2 bg-zips-green-900 hover:bg-zips-green-800 text-white font-bold text-xs rounded-xl shadow transition-all"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 flex flex-col justify-between flex-1">
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Parent Name */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Parent / Guardian Name *
                          </label>
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              {...register('parentName', { required: 'Parent name is required' })}
                              placeholder="e.g. Farhan Ahmad"
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                          {errors.parentName && (
                            <span className="text-[10px] text-red-600 block mt-0.5">{errors.parentName.message}</span>
                          )}
                        </div>

                        {/* Student Name */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Student Name *
                          </label>
                          <div className="relative">
                            <GraduationCap className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              {...register('studentName', { required: 'Student name is required' })}
                              placeholder="e.g. Ayaan Ahmad"
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                          {errors.studentName && (
                            <span className="text-[10px] text-red-600 block mt-0.5">{errors.studentName.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Class Applying For */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Class Applying For *
                          </label>
                          <div className="relative">
                            <BookOpen className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <select
                              {...register('classApplyingFor', { required: 'Please select grade' })}
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
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
                            <span className="text-[10px] text-red-600 block mt-0.5">{errors.classApplyingFor.message}</span>
                          )}
                        </div>

                        {/* Phone / WhatsApp */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Contact Phone / WhatsApp *
                          </label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="tel"
                              {...register('phoneNumber', { required: 'Phone number is required' })}
                              placeholder="+91-9411030100"
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                          {errors.phoneNumber && (
                            <span className="text-[10px] text-red-600 block mt-0.5">{errors.phoneNumber.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Email */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            Email Address (Optional)
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="email"
                              {...register('email')}
                              placeholder="parent@example.com"
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                            City / Locality
                          </label>
                          <div className="relative">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              {...register('city')}
                              defaultValue="Aligarh"
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Message / Query */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-zips-charcoal-800 mb-0.5">
                          Specific Question / Message (Optional)
                        </label>
                        <div className="relative">
                          <MessageSquare className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
                          <textarea
                            rows="2"
                            {...register('message')}
                            placeholder="Write any questions regarding admissions or curriculum..."
                            className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-gray-300 focus:border-zips-green-600 focus:outline-none text-xs bg-gray-50 focus:bg-white resize-none"
                          ></textarea>
                        </div>
                      </div>

                      {/* Campus Tour Checkbox */}
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/90 border border-amber-200">
                        <input
                          type="checkbox"
                          id="contactCampusTour"
                          {...register('campusVisitRequested')}
                          defaultChecked={true}
                          className="w-3.5 h-3.5 rounded text-zips-green-800 focus:ring-zips-green-700 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="contactCampusTour" className="text-[11px] text-zips-charcoal-900 cursor-pointer font-medium">
                          Yes, book an in-person <strong>Campus Tour & Counseling</strong> for my family.
                        </label>
                      </div>

                      {/* Admissions Trust & Assurance Banner */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50/90 via-teal-50/60 to-amber-50/80 border border-emerald-200/80 shadow-2xs">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-zips-green-950 uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Admissions 2026-27 Assurance</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-800 bg-white/90 px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
                            ⚡ Quick 24h Callback
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-white/90 p-2 rounded-lg border border-gray-200/70 shadow-2xs flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-bold text-zips-green-950 leading-tight">No Reg. Fee</span>
                            <span className="text-[9px] text-gray-500 mt-0.5">Online inquiry</span>
                          </div>

                          <div className="bg-white/90 p-2 rounded-lg border border-gray-200/70 shadow-2xs flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-1">
                              <Sparkles className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-bold text-zips-green-950 leading-tight">1-on-1 Guidance</span>
                            <span className="text-[9px] text-gray-500 mt-0.5">Senior faculty</span>
                          </div>

                          <div className="bg-white/90 p-2 rounded-lg border border-gray-200/70 shadow-2xs flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mb-1">
                              <Compass className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-bold text-zips-green-950 leading-tight">Campus Tour</span>
                            <span className="text-[9px] text-gray-500 mt-0.5">Live walkthrough</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 mt-2 pt-1.5 border-t border-emerald-200/60 text-[10px] text-gray-600 font-medium">
                          <Lock className="w-3 h-3 text-emerald-700" />
                          <span>Your details are 100% safe & confidential. No spam guaranteed.</span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 px-4 rounded-xl text-white font-black text-xs uppercase tracking-wider bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-950 hover:brightness-110 shadow-sm transition-all flex items-center justify-center gap-2 border border-zips-gold-400"
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
                )}
              </div>
            </div>
          </div>

          {/* Full-Width Embedded Map */}
          <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl border-2 border-zips-green-200 h-96">
            <iframe
              title="ZIPS Campus Map Location"
              src="https://maps.google.com/maps?q=Behind+CDF+Krishi+Vigyan+Kendra+Rathgawan+Aligarh&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
