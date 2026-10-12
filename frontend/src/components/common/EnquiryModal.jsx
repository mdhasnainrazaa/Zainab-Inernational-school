import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Sparkles,
  Send,
  User,
  GraduationCap,
  BookOpen,
  MapPin,
  MessageSquare,
  Lightbulb,
  Star,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import Logo from '../../assets/Logo';
import { SCHOOL_INFO } from '../../data/schoolData';

export default function EnquiryModal({ isOpen, onClose }) {
  const [submittedId, setSubmittedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const handleClose = () => {
    setSubmittedId(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#FDFCF7] rounded-2xl shadow-2xl z-10 my-auto border-4 border-zips-gold-400 font-sans"
            style={{
              backgroundImage: `radial-gradient(#d4d4d8 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2.5 right-2.5 z-30 p-1.5 rounded-full bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 shadow transition-all duration-200 border border-gray-200"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 1. Header Banner (Compact Single Row) */}
            <div className="relative bg-white/95 border-b border-zips-gold-300 px-4 py-2 shadow-xs">
              <div className="flex items-center gap-3 pr-8">
                <img src="/zip-logo.png" alt="ZIPS Logo" className="h-10 w-auto flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-black tracking-tight text-zips-green-950 uppercase truncate">
                      ZAINAB INTERNATIONAL PUBLIC SCHOOL
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold tracking-wider uppercase border border-red-200 flex-shrink-0">
                      UDISE: 09124109231
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-gray-600 flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-zips-gold-600 flex-shrink-0" />
                    <span>Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Main Body Content */}
            <div className="p-3 sm:p-4">
              {submittedId ? (
                <div className="text-center py-6 bg-white/95 rounded-xl p-5 border-2 border-dashed border-zips-green-400 shadow-md">
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
                    onClick={handleClose}
                    className="px-6 py-2 bg-zips-green-900 hover:bg-zips-green-800 text-white font-bold text-xs rounded-lg shadow transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                  {/* Left Column: Compact Blackboard & Admission Badge */}
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

                    {/* Compact Cartoon Blackboard */}
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

                          {/* 3 Compact Bullet Points */}
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

                  {/* Right Column: Compact Registration Form */}
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
                      <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                        <input
                          type="checkbox"
                          id="modalCampusTour"
                          {...register('campusVisitRequested')}
                          defaultChecked={true}
                          className="w-3.5 h-3.5 rounded text-zips-green-800 focus:ring-zips-green-700 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="modalCampusTour" className="text-[11px] text-zips-charcoal-900 cursor-pointer font-medium">
                          Yes, book an in-person <strong>Campus Tour & Counseling</strong> for my family.
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2 px-3 rounded-lg text-white font-black text-xs uppercase tracking-wider bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-950 hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-1.5 border border-zips-gold-400"
                      >
                        {submitting ? (
                          <div className="flex items-center gap-1.5">
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
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bottom Footer Quick Action Bar */}
            <div className="bg-[#E6C687] border-t border-zips-gold-500/40 px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-bold text-zips-green-950">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-zips-green-950 flex-shrink-0" />
                <div className="flex items-center gap-1.5">
                  <a href={`tel:${SCHOOL_INFO.phones[1]}`} className="hover:underline">
                    {SCHOOL_INFO.phones[1]}
                  </a>
                  <span>,</span>
                  <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="hover:underline">
                    {SCHOOL_INFO.phones[0]}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-zips-green-950 flex-shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:underline">
                  {SCHOOL_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-zips-green-950 flex-shrink-0" />
                <a href={SCHOOL_INFO.social.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  www.zips.org.in
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
