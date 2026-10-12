import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Compass,
  Users,
  HeartHandshake,
  CheckCircle2,
  Phone,
  MessageSquare,
  Calendar,
  Layers,
  Search,
  FlaskConical,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Star,
  Quote,
  Download,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import NoticeBoard from '../components/common/NoticeBoard';
import {
  SCHOOL_INFO,
  VISION_MISSION,
  LEADERSHIP_MESSAGES,
  MORAL_VALUES,
  TEACHING_METHODOLOGIES,
  EDUCATIONAL_OUTCOMES,
  BEYOND_ACADEMICS_ACTIVITIES,
  FACILITIES_LIST,
  KINDERGARTEN_PROGRAMME,
  ADMISSION_STEPS,
  PARENT_TESTIMONIALS,
} from '../data/schoolData';
import api from '../services/api';

const HERO_CAMPUS_IMAGES = [
  {
    src: '/image/Szanab-internationa-Campus.webp',
    title: 'Zainab International Public School Campus',
    subtitle: 'Rathgawan, Aligarh',
  },
  {
    src: '/image/Zainab-International-School-Entrance-front.webp',
    title: 'Grand Entrance & Campus Facade',
    subtitle: 'Welcoming & Secure Environment',
  },
  {
    src: '/image/Zainab-International-School-Entrance.webp',
    title: 'Modern Architectural Infrastructure',
    subtitle: 'Safe, Green & Inspiring School Grounds',
  },
  {
    src: '/image/zanaib-international-school-Campus-with-Children.webp',
    title: 'Vibrant Campus Life with Students',
    subtitle: 'Nurturing Mind, Heart & Character',
  },
];

export default function HomePage({ onOpenEnquiry }) {
  const [selectedActivity, setSelectedActivity] = useState(BEYOND_ACADEMICS_ACTIVITIES[0]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  // Auto transition hero campus images every 5 seconds smoothly
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_CAMPUS_IMAGES.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  // Auto transition testimonials single-line one by one every 3 seconds smoothly
  useEffect(() => {
    if (isTestimonialPaused) return;
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % PARENT_TESTIMONIALS.length);
    }, 3000);
    return () => clearInterval(testimonialTimer);
  }, [isTestimonialPaused]);

  return (
    <div className="overflow-hidden">
      <SEO
        title="Zainab International Public School | Rathgawan, Aligarh"
        description="A premier educational institution in Rathgawan, Aligarh blending an Indian mind, heart and soul with 21st-century global excellence. Admissions open 2026-27."
      />

      {/* =========================================================================
          SECTION 1 — CINEMATIC HERO (Auto 3s Campus Image Transition)
          ========================================================================= */}
      <section className="relative min-h-[520px] sm:min-h-[600px] md:min-h-[680px] flex items-center justify-center bg-zips-green-950 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dynamic Campus Image Background Slider (Full Length Image & Pure Smooth Fade) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-zips-green-950">
          {HERO_CAMPUS_IMAGES.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0 }}
              animate={{
                opacity: idx === currentHeroSlide ? 1 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <img
                src={img.src}
                alt={img.title}
                width="1600"
                height="900"
                loading={idx === 0 ? "eager" : "lazy"}
                fetchpriority={idx === 0 ? "high" : undefined}
                decoding="async"
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              />
            </motion.div>
          ))}
          {/* Subtle Soft Vignette Overlay for Crisp Visibility & Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-zips-green-950/90 via-black/25 to-black/35"></div>
          {/* Subtle gold decorative rings */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full border border-zips-gold-500/20 blur-xs pointer-events-none"></div>
          <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full border border-zips-gold-500/15 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mt-auto mb-2">
          {/* Slide Indicators & Live Active Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-2.5"
          >
            {/* Active Slide Caption Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-zips-gold-400/30 text-zips-gold-300 text-[11px] font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Campus View: <strong>{HERO_CAMPUS_IMAGES[currentHeroSlide].title}</strong></span>
            </div>

            {/* 6 Slide Dots */}
            <div className="flex items-center gap-2">
              {HERO_CAMPUS_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentHeroSlide
                      ? 'w-8 bg-zips-gold-400 shadow-gold-glow'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  title={img.title}
                />
              ))}
            </div>
          </motion.div>

          {/* Quick Contact & Visit Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300"
          >
            <a href={`tel:${SCHOOL_INFO.phones[0]}`} className="flex items-center gap-2 hover:text-zips-gold-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-zips-gold-500" />
              <span>Call: {SCHOOL_INFO.phones[0]}</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <a
              href="https://wa.me/919411030100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Admissions</span>
            </a>
            <span className="hidden sm:inline text-white/30">•</span>
            <Link to="/contact" className="flex items-center gap-1.5 hover:text-zips-gold-400 transition-colors">
              <Compass className="w-3.5 h-3.5 text-zips-gold-500" />
              <span>Visit Campus in Rathgawan</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — KEY TRUST & EXCELLENCE HIGHLIGHTS
          ========================================================================= */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-premium border border-zips-green-100">
          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zips-green-50/60 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm text-zips-green-950">Inquiry-Based Pedagogy</h3>
              <p className="text-xs text-zips-charcoal-700 mt-0.5">Active learning, STEM labs, and flipped classrooms.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zips-green-50/60 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm text-zips-green-950">Enduring Moral Values</h3>
              <p className="text-xs text-zips-charcoal-700 mt-0.5">Kindness, honesty, compassion, and hospitality.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zips-green-50/60 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm text-zips-green-950">Beyond Academics</h3>
              <p className="text-xs text-zips-charcoal-700 mt-0.5">Martial Arts, Yoga, Abacus, Chess, and Calligraphy.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-zips-green-50/60 transition-colors">
            <div className="w-11 h-11 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm text-zips-green-950">Child-Centric Campus</h3>
              <p className="text-xs text-zips-charcoal-700 mt-0.5">Secure grounds, Discovery Library, and hygienic canteen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CAMPUS DIGITAL NOTICE BOARD & LATEST CIRCULARS (DYNAMIC ADMIN CMS)
          ========================================================================= */}
      <NoticeBoard />

      {/* =========================================================================
          SECTION 3 — ABOUT ZAINAB INTERNATIONAL PUBLIC SCHOOL (WITH CAMPUS VIDEO)
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 w-80 h-80 bg-zips-gold-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-zips-green-50/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="About Zainab International Public School"
            title="Nurturing Brilliance, Character & Future Global Citizens"
            subtitle="Discover the vibrant campus environment and progressive learning pedagogy shaping tomorrow's leaders in Rathgawan, Aligarh."
            className="mb-6 sm:mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Descriptive narrative & Key highlights */}
            <div
              className="lg:col-span-6 space-y-3.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zips-green-50 border border-zips-green-200 text-zips-green-950 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-zips-gold-600" />
                <span>Quality Education • CBSE Pattern • Nursery to Class VIII</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-sans font-bold text-zips-green-950 leading-snug">
                Where Academic Rigor Meets Warmth & Moral Integrity
              </h3>

              <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed">
                Located behind CDF, Krishi Vigyan Kendra in Rathgawan, Aligarh, <strong className="text-zips-green-950 font-semibold">Zainab International Public School (ZIPS)</strong> combines inquiry-based smart classrooms, dedicated science & computer labs, and holistic sports development ranging from Karate and Yoga to Athletics.
              </p>

              {/* 4 Feature highlight badges (Compact) */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FDFCF7] border border-gray-200/70">
                  <div className="w-7 h-7 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-[11px] text-zips-green-950 leading-tight">Inquiry Learning</h5>
                    <p className="text-[10px] text-gray-500">STEM & Smart Class</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FDFCF7] border border-gray-200/70">
                  <div className="w-7 h-7 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-[11px] text-zips-green-950 leading-tight">Child-Safe Campus</h5>
                    <p className="text-[10px] text-gray-500">CCTV & Secure</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FDFCF7] border border-gray-200/70">
                  <div className="w-7 h-7 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-[11px] text-zips-green-950 leading-tight">Sports & Martial Arts</h5>
                    <p className="text-[10px] text-gray-500">Karate, Yoga & Chess</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FDFCF7] border border-gray-200/70">
                  <div className="w-7 h-7 rounded-lg bg-zips-green-900 text-zips-gold-400 flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-[11px] text-zips-green-950 leading-tight">Moral Values</h5>
                    <p className="text-[10px] text-gray-500">Character First</p>
                  </div>
                </div>
              </div>

              {/* Action buttons (Compact) */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <Link
                  to="/about"
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-zips-green-900 hover:bg-zips-green-800 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Explore School Story</span>
                  <ArrowRight className="w-3 h-3 text-zips-gold-400" />
                </Link>
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zips-green-950 bg-zips-gold-400 hover:bg-zips-gold-300 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-zips-green-950" />
                  <span>Enquire for Admissions</span>
                </button>
              </div>
            </div>

            {/* Right Column: Embedded YouTube Video */}
            <div
              className="lg:col-span-6"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100 bg-zips-green-950 p-1.5 sm:p-2 group">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1TiIJHBzN-8?rel=0&modestbranding=1"
                    title="Zainab International Public School Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Video Info Strip (Compact) */}
                <div className="mt-2 px-2 py-1 flex items-center justify-between text-[11px] text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="font-semibold text-gray-200">Campus Video Tour</span>
                  </div>
                  <a
                    href="https://youtu.be/1TiIJHBzN-8?si=JUVIGSvGvzMjubPj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-zips-gold-400 hover:text-zips-gold-300 transition-colors"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — VISION & MISSION (AUTHORITATIVE CLIENT CONTENT)
          ========================================================================= */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="The ZIPS Foundation"
            title="An Educational Experience of International Standards"
            subtitle="Rooted in an Indian mind, heart and soul — preparing children for 21st-century global citizenship."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <div
              className="bg-gradient-to-br from-white via-[#FCFBF7] to-amber-50/30 rounded-3xl p-7 sm:p-9 shadow-lg hover:shadow-2xl border-2 border-zips-gold-300/80 hover:border-zips-gold-500 transition-all duration-300 relative flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-zips-gold-400 via-zips-gold-500 to-zips-green-800"></div>

              {/* Background Watermark Quote */}
              <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-zips-gold-500/10 pointer-events-none transform -rotate-12" />

              <div className="relative z-10">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-amber-500/5 border border-amber-400/40 text-amber-900 shadow-xs">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest">Our Vision</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Institutional Purpose
                  </span>
                </div>

                {/* Normal Clean Body Text */}
                <p className="font-sans text-sm sm:text-base text-gray-800 leading-relaxed font-normal not-italic">
                  "At Zainab International Public School, we recognise the imperative of imparting an educational experience that is world-class in every respect and which prepares children for global citizenship. We are a school with an Indian mind, an Indian heart and an Indian soul; a school that celebrates the culture of excellence and is an embodiment of values. We believe that a curriculum of excellence with a global dimension is central to the education of children to face the challenges of the 21st century with confidence and strength of character."
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div className="relative z-10 mt-6 pt-5 border-t border-amber-200/50 flex items-center gap-2 text-xs font-bold text-zips-green-950 bg-amber-50/60 -mx-2 -mb-2 p-3 rounded-2xl border border-amber-200/40">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Culture of Excellence & Embodiment of Values</span>
              </div>
            </div>

            {/* Mission Card */}
            <div
              className="bg-gradient-to-br from-white via-[#F6FAF7] to-emerald-50/30 rounded-3xl p-7 sm:p-9 shadow-lg hover:shadow-2xl border-2 border-emerald-300/80 hover:border-emerald-500 transition-all duration-300 relative flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-zips-gold-500"></div>

              {/* Background Watermark Quote */}
              <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-emerald-600/10 pointer-events-none transform -rotate-12" />

              <div className="relative z-10">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600/15 to-emerald-600/5 border border-emerald-500/40 text-emerald-950 shadow-xs">
                    <Award className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest">Our Mission</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Core Commitment
                  </span>
                </div>

                {/* Normal Clean Body Text */}
                <p className="font-sans text-sm sm:text-base text-gray-800 leading-relaxed font-normal not-italic">
                  "Zainab International Public School’s mission is to provide a learning environment that encourages children to bring out the best in themselves and enables their all-round development through the joy of learning, enduring values and the celebration of diversity."
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div className="relative z-10 mt-6 pt-5 border-t border-emerald-200/50 flex items-center gap-2 text-xs font-bold text-zips-green-950 bg-emerald-50/60 -mx-2 -mb-2 p-3 rounded-2xl border border-emerald-200/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Joy of Learning & Celebration of Diversity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — MORAL VALUES & CHARACTER ATTRIBUTES
          ========================================================================= */}
      <section className="py-20 bg-zips-green-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Character Architecture"
            title="Our Values & Attributes"
            subtitle="Academic success without moral foundation is incomplete. We cultivate timeless virtues across daily school life."
            light={true}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
            {MORAL_VALUES.map((val, idx) => (
              <div
                key={val.name}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 sm:p-5 text-center border border-white/10 hover:border-zips-gold-500/40 transition-all flex flex-col items-center justify-between group"
              >
                <div className="w-10 h-10 rounded-full bg-zips-gold-500/20 text-zips-gold-400 flex items-center justify-center font-sans font-bold text-sm mb-3 group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-white mb-1 group-hover:text-zips-gold-300">
                    {val.name}
                  </h4>
                  <p className="text-[11px] text-gray-300 leading-tight">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 & 7 — LEADERSHIP MESSAGES: FOUNDER & PRINCIPAL
          ========================================================================= */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. Founder Message (Mr. M. A. Siddiqui) */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-premium border border-zips-green-100 relative overflow-hidden">
            <div className="space-y-5 relative z-10 max-w-4xl mx-auto">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-100 px-3.5 py-1 rounded-full border border-zips-gold-300">
                  Founder’s Message
                </span>
                <span className="text-xs font-semibold text-zips-charcoal-500">
                  Zainab International Public School
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zips-green-950">
                "{LEADERSHIP_MESSAGES.founder.pullQuote}"
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed font-normal">
                {LEADERSHIP_MESSAGES.founder.message.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-gray-100">
                <div>
                  <p className="font-sans font-bold text-zips-green-950 text-base">{LEADERSHIP_MESSAGES.founder.name}</p>
                  <p className="text-xs text-zips-gold-700 font-semibold">{LEADERSHIP_MESSAGES.founder.title}, {LEADERSHIP_MESSAGES.founder.institution}</p>
                </div>
                <Link to="/about" className="text-xs font-bold text-zips-green-800 hover:text-zips-green-950 flex items-center gap-1">
                  <span>Read Full Profile & Philosophy</span>
                  <ChevronRight className="w-4 h-4 text-zips-gold-500" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Principal Message (Benjamin Franklin quote) */}
          <div className="bg-gradient-to-br from-zips-green-900 to-zips-green-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-zips-gold-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 order-2 lg:order-1">
                <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-400 bg-white/10 px-3 py-1 rounded-full border border-zips-gold-400/30">
                  From the Principal’s Desk
                </span>
                
                {/* Franklin Quote Callout */}
                <div className="p-4 bg-white/5 rounded-xl border-l-4 border-zips-gold-400">
                  <p className="font-sans text-base sm:text-lg text-zips-gold-300 italic">
                    "{LEADERSHIP_MESSAGES.principal.famousQuote}"
                  </p>
                  <p className="text-right text-xs text-gray-400 font-mono mt-1">
                    — {LEADERSHIP_MESSAGES.principal.quoteAttribute}
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {LEADERSHIP_MESSAGES.principal.message.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/15">
                  <div>
                    <p className="font-sans font-bold text-white text-sm">Principal & Academic Mentor</p>
                    <p className="text-xs text-zips-gold-400">Zainab International Public School</p>
                  </div>
                  <button
                    onClick={onOpenEnquiry}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-zips-gold-500 text-zips-green-950 hover:bg-zips-gold-400 transition-colors"
                  >
                    Schedule Interaction
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 text-center order-1 lg:order-2">
                <div className="relative inline-block rounded-2xl overflow-hidden border-2 border-zips-gold-500/40 shadow-xl max-w-[260px]">
                  <img
                    src={LEADERSHIP_MESSAGES.principal.image}
                    alt="ZIPS Principal"
                    className="w-full h-72 object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 & 9 — TEACHING & LEARNING FRAMEWORK (8 METHODOLOGIES)
          ========================================================================= */}
      <section className="py-20 bg-zips-green-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Pedagogical Excellence"
            title="How We Teach: Inquiry, Application & Mastery"
            subtitle="Moving away from passive memorization to dynamic student involvement, critical analysis, and hands-on laboratory discovery."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEACHING_METHODOLOGIES.map((item, idx) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-premium border border-gray-100 hover:border-zips-green-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zips-green-100 text-zips-green-900 flex items-center justify-center mb-4 group-hover:bg-zips-green-900 group-hover:text-zips-gold-400 transition-colors">
                    <span className="font-sans font-bold text-sm">0{idx + 1}</span>
                  </div>
                  <h4 className="font-sans font-bold text-base text-zips-green-950 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zips-charcoal-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-zips-green-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zips-gold-500" />
                  <span>Student Centred</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — KINDERGARTEN PROGRAMME (NURSERY & KG SPOTLIGHT)
          ========================================================================= */}
      <section className="py-20 bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-emerald-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* 3 Interlocking Overlapping Circular Rings (Matching Reference Design) */}
            <div className="lg:col-span-6">
              <div className="relative w-full max-w-[480px] h-[310px] sm:h-[400px] md:h-[450px] mx-auto flex items-center justify-center">
                {/* Ambient Soft Blur Backdrop */}
                <div className="absolute top-1/4 left-1/4 w-52 sm:w-72 h-52 sm:h-72 bg-gradient-to-tr from-amber-400/20 via-emerald-400/20 to-teal-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

                {/* Floating Programme Badge */}
                <div className="absolute -top-3 left-0 sm:-left-2 z-40 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg border-2 border-white flex items-center gap-1.5">
                  <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-200" />
                  <span>Nursery & KG Programme</span>
                </div>

                {/* CIRCLE 1: Top-Right Ring */}
                <div
                  whileHover={{ scale: 1.05, zIndex: 40 }}
                  className="absolute top-2 right-1 sm:right-4 w-[54%] sm:w-[55%] aspect-square rounded-full overflow-hidden z-20 border-[6px] sm:border-[10px] md:border-[12px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.18)] bg-white group cursor-pointer"
                >
                  <img
                    src="/infrastructure/zips-school-spacious-classroom-lecture-hall.webp"
                    alt="Spacious Classroom Lecture Hall"
                    width="600"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* CIRCLE 2: Left-Center Ring */}
                <div
                  whileHover={{ scale: 1.05, zIndex: 40 }}
                  className="absolute top-[20%] left-0 sm:left-2 w-[54%] sm:w-[55%] aspect-square rounded-full overflow-hidden z-10 border-[6px] sm:border-[10px] md:border-[12px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.18)] bg-white group cursor-pointer"
                >
                  <img
                    src="/infrastructure/zips-school-kindergarten-primary-activity-classroom.webp"
                    alt="Kindergarten Activity Classroom"
                    width="600"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* CIRCLE 3: Bottom-Center/Right Ring */}
                <div
                  whileHover={{ scale: 1.05, zIndex: 40 }}
                  className="absolute bottom-1 right-[14%] sm:right-[18%] w-[54%] sm:w-[55%] aspect-square rounded-full overflow-hidden z-30 border-[6px] sm:border-[10px] md:border-[12px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.18)] bg-white group cursor-pointer"
                >
                  <img
                    src="/infrastructure/zips-school-student-council-campus-building-entrance.webp"
                    alt="ZIPS Student Council & Campus Entrance"
                    width="600"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Early Childhood Discovery
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-zips-green-950">
                A Joyful, Secure Haven for Little Explorers
              </h3>
              <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed">
                Our early-years curriculum in Nursery & KG balances phonics, sensorial math, and fine-motor coordination with warmth, social empathy, and play-based wonder.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {KINDERGARTEN_PROGRAMME.pillars.slice(0, 4).map((pil) => (
                  <div key={pil.title} className="bg-white/90 p-3.5 rounded-xl border border-amber-200/60 shadow-xs">
                    <h5 className="font-sans font-bold text-xs sm:text-sm text-zips-green-950">{pil.title}</h5>
                    <p className="text-[11px] text-zips-charcoal-600 mt-0.5 leading-snug">{pil.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/kindergarten"
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shadow-md text-center"
                >
                  Explore Kindergarten Page
                </Link>
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shadow-md text-center"
                >
                  Enquire for Nursery & KG
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — BEYOND ACADEMICS: MARTIAL ARTS, YOGA, ABACUS, CHESS, SUDOKU, CALLIGRAPHY, ART
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Holistic Development"
            title="Beyond Academics: Skills for Mind, Body & Character"
            subtitle="At ZIPS, every child develops mental calculation agility, physical discipline, strategic foresight, and artistic elegance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BEYOND_ACADEMICS_ACTIVITIES.map((act) => (
              <div
                key={act.id}
                className="bg-[#FDFCF7] rounded-2xl overflow-hidden shadow-soft hover:shadow-premium border border-gray-100 hover:border-zips-gold-400 transition-all flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    width="600"
                    height="350"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zips-green-950/80 text-zips-gold-400 backdrop-blur-xs">
                    {act.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sans font-bold text-base text-zips-green-950 mb-2 group-hover:text-zips-gold-600 transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-xs text-zips-charcoal-700 leading-relaxed mb-3">
                      {act.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200/60">
                    <ul className="space-y-1 text-[11px] text-zips-green-900 font-medium">
                      {act.outcomes.slice(0, 2).map((out, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-zips-gold-500 flex-shrink-0" />
                          <span className="truncate">{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-zips-green-900 hover:text-zips-gold-600 transition-colors"
            >
              <span>Explore All Skill Workshops & Activities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 — CAMPUS FACILITIES (LIBRARY, CANTEEN, LABS, CLASSROOMS, SPORTS)
          ========================================================================= */}
      <section className="py-20 bg-zips-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Campus Architecture"
            title="World-Class Infrastructure Designed for Learners"
            subtitle="Safe, ventilated, child-friendly spaces equipped for rigorous study, creative expression, and active wellness."
            light={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES_LIST.map((fac) => (
              <div
                key={fac.id}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-zips-gold-500/50 transition-all flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    width="600"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase font-bold text-zips-gold-400 tracking-wider">
                      {fac.tag}
                    </span>
                    <h4 className="font-sans font-bold text-lg text-white">
                      {fac.name}
                    </h4>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="font-sans text-xs italic text-zips-gold-300">
                    "{fac.highlightQuote}"
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {fac.desc}
                  </p>
                  <ul className="space-y-1 text-[11px] text-gray-200">
                    {fac.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zips-gold-500"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-gold-500 text-zips-green-950 hover:bg-zips-gold-400 transition-colors shadow-lg"
            >
              <span>View All Campus Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13 — EDUCATIONAL OUTCOMES: PREPARING STUDENTS FOR THE FUTURE
          ========================================================================= */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Future Readiness"
            title="Preparing Students for the 21st Century"
            subtitle="The 12 core competencies cultivated across every learner’s journey at Zainab International Public School."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {EDUCATIONAL_OUTCOMES.map((item, idx) => (
              <div
                key={item.title}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs hover:border-zips-green-300 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-zips-gold-600 block mb-1">
                  0{idx + 1}
                </span>
                <h5 className="font-sans font-bold text-sm text-zips-green-950 mb-1">
                  {item.title}
                </h5>
                <p className="text-[11px] text-zips-charcoal-700 leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14 — ADMISSION CONVERSION & 4-STEP PROCESS
          ========================================================================= */}
      <section className="py-20 bg-gradient-to-br from-zips-green-900 to-zips-green-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-400 bg-white/10 px-3.5 py-1 rounded-full border border-zips-gold-400/30">
              Admissions 2026-27 Open
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white mt-3 mb-4">
              Your Child’s Path to Excellence Starts Here
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-200">
              Simple, transparent 4-step admission procedure. Apply online or schedule your campus interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-sans font-extrabold text-zips-gold-400 mb-3 font-mono">
                    {step.step}
                  </div>
                  <h4 className="font-sans font-bold text-base text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto text-center border border-zips-gold-500/40 shadow-2xl space-y-4">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
              Ready to Join the ZIPS Community?
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto">
              Seats are allocated on a rolling interaction basis. Submit your online enquiry now or download the official print-ready PDF form for Session {SCHOOL_INFO.academicSession}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenEnquiry}
                className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-zips-green-950 bg-gradient-to-r from-zips-gold-400 to-zips-gold-500 hover:brightness-105 shadow-xl transition-all"
              >
                Submit Admission Form Online
              </button>
              <a
                href="/ZIPS-Admission-Form.pdf"
                download="ZIPS-Admission-Form.pdf"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-zips-gold-400 text-zips-gold-300 hover:bg-zips-gold-500 hover:text-zips-green-950 transition-all inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Form (PDF)</span>
              </a>
              <Link
                to="/admissions"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-white border border-white/30 hover:bg-white/10 transition-all"
              >
                View Checklist & Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 15 — PARENT VOICES & TESTIMONIALS (PROFESSIONAL & MINIMALIST)
          ========================================================================= */}
      <section className="py-20 bg-[#FAF8F2] border-t border-b border-amber-200/50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="Parent Testimonials & Trust"
            title="What Parents Say About Zainab International"
            subtitle="Authentic reflections of holistic character growth, academic discipline, and individualized care from our parent community."
          />

          {/* Minimalist Single-Line Testimonial (Auto-Transition Every 3s, No Boxes) */}
          <div
            className="relative mt-8"
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >
            {/* Elegant Quotation Mark */}
            <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-zips-gold-500/40 mx-auto mb-4" />

            {/* Testimonial Quote & Author */}
            <div className="min-h-[190px] sm:min-h-[160px] flex flex-col justify-center items-center">
              
                <div
                  key={PARENT_TESTIMONIALS[currentTestimonial].id}
                  className="space-y-5"
                >
                  {/* Quote Statement */}
                  <blockquote className="text-base sm:text-xl md:text-2xl text-zips-green-950 font-normal font-sans italic leading-relaxed max-w-3xl mx-auto px-4">
                    "{PARENT_TESTIMONIALS[currentTestimonial].quote}"
                  </blockquote>

                  {/* 5-Star Rating */}
                  <div className="flex items-center justify-center gap-1 text-amber-400 pt-1">
                    {[...Array(PARENT_TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Clean Single-Line Author Information */}
                  <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs sm:text-sm">
                    <span className="font-sans font-bold text-zips-green-950 text-sm sm:text-base">
                      {PARENT_TESTIMONIALS[currentTestimonial].name}
                    </span>
                    <span className="text-gray-400 hidden sm:inline">•</span>
                    <span className="text-zips-gold-700 font-semibold">
                      {PARENT_TESTIMONIALS[currentTestimonial].role}
                    </span>
                    <span className="text-gray-400 hidden sm:inline">•</span>
                    <span className="text-gray-500">
                      📍 {PARENT_TESTIMONIALS[currentTestimonial].location}
                    </span>
                  </div>
                </div>
              
            </div>

            {/* Clean Minimalist Navigation & Dots */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev - 1 + PARENT_TESTIMONIALS.length) % PARENT_TESTIMONIALS.length
                  )
                }
                className="w-8 h-8 rounded-full border border-gray-300 hover:border-zips-green-900 hover:bg-white text-zips-green-950 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {PARENT_TESTIMONIALS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentTestimonial
                        ? 'w-7 bg-zips-green-900'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentTestimonial((prev) => (prev + 1) % PARENT_TESTIMONIALS.length)
                }
                className="w-8 h-8 rounded-full border border-gray-300 hover:border-zips-green-900 hover:bg-white text-zips-green-950 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 16 — CAMPUS MAP & DIRECT ACCESS
          ========================================================================= */}
      <section className="py-16 bg-[#FDFCF7] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-100 px-3 py-1 rounded-full border border-zips-gold-300">
                Location & Accessibility
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zips-green-950">
                Visit Our Campus in Rathgawan, Aligarh
              </h3>
              <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed">
                Conveniently situated behind CDF and Krishi Vigyan Kendra, Rathgawan, offering serene green surroundings away from traffic congestion while remaining readily accessible from Aligarh city.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-zips-charcoal-800">
                <p><strong>Address:</strong> Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh, U.P.</p>
                <p><strong>Hotline:</strong> {SCHOOL_INFO.phones[0]} / {SCHOOL_INFO.phones[1]}</p>
                <p><strong>Visiting Hours:</strong> Mon – Sat: 8:30 AM to 3:00 PM</p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Behind+CDF+Krishi+Vigyan+Kendra+Rathgawan+Aligarh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-zips-gold-400" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-premium border-2 border-zips-green-100 h-80">
                <iframe
                  title="ZIPS Campus Map"
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
          </div>
        </div>
      </section>
    </div>
  );
}
