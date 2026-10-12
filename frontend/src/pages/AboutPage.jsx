import React from 'react';
import { Quote, CheckCircle2, ShieldCheck, Award, Users, HeartHandshake, Sparkles, Phone, GraduationCap } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import {
  SCHOOL_INFO,
  VISION_MISSION,
  LEADERSHIP_MESSAGES,
  MORAL_VALUES,
  NES_EXECUTIVE_COMMITTEE,
  NES_EXECUTIVE_MEMBERS,
  ZIPS_BOARD_MEMBERS,
  ZIPS_FACULTIES,
} from '../data/schoolData';

export default function AboutPage({ onOpenEnquiry }) {
  return (
    <div>
      <SEO
        title="About Us & Leadership"
        description="Learn about the philosophy, vision, mission, and leadership of Zainab International Public School, Rathgawan, Aligarh."
      />

      <PageHero
        badge="About Zainab International Public School"
        title="Heritage of Excellence, Indian Soul & Global Outlook"
        subtitle="Dedicated to imparting an educational experience of international standards that nurtures confident, compassionate human beings."
        breadcrumb={[{ name: 'About ZIPS' }]}
        bgImage="/image/Zainab-International-School-Entrance.webp"
      />

      {/* 1. Core Heritage & Philosophy */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-100 px-3.5 py-1 rounded-full border border-zips-gold-300">
                Our Educational Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zips-green-950">
                Where Academic Rigor Meets Enduring Human Character
              </h2>
              <p className="text-sm sm:text-base text-zips-charcoal-700 leading-relaxed">
                Zainab International Public School was founded with a transformative commitment: to establish an academic ecosystem in Rathgawan, Aligarh that provides children with world-class pedagogical infrastructure, inquiry-based STEM methodologies, and an uncompromising grounding in timeless moral values.
              </p>
              <p className="text-sm sm:text-base text-zips-charcoal-700 leading-relaxed">
                We believe that education must cultivate the whole person. Our students are challenged intellectually in modern classrooms, guided in scientific laboratories, conditioned on sports fields, and mentored in values of kindness, honesty, tolerance, and service.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-bold text-zips-green-950">
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-zips-gold-500" />
                  <span>Inquiry-Based Learning</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-zips-gold-500" />
                  <span>Indian Soul, Global Mind</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-zips-gold-500" />
                  <span>Beyond Academics Focus</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-zips-gold-500" />
                  <span>Child-Safe Environment</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/infrastructure/zips-school-interactive-classroom-study-session.webp"
                  alt="ZIPS Learning Environment"
                  width="800"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-zips-green-950/90 backdrop-blur-md p-4 rounded-xl border border-zips-gold-500/30 text-white">
                  <p className="font-sans italic text-xs text-zips-gold-300">
                    "A school that celebrates the culture of excellence and is an embodiment of values."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Section (Exact Text) */}
      <section id="vision" className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Institutional Compass"
            title="Our Vision & Mission"
            subtitle="The guiding principles shaping every academic policy, teaching module, and community engagement at ZIPS."
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
                  "{VISION_MISSION.vision.quote}"
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
                  "{VISION_MISSION.mission.quote}"
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div className="relative z-10 mt-6 pt-5 border-t border-emerald-200/50 flex items-center gap-2 text-xs font-bold text-zips-green-950 bg-emerald-50/60 -mx-2 -mb-2 p-3 rounded-2xl border border-emerald-200/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Joy of Learning & Celebration of Diversity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Founder’s Message (Mr. M. A. Siddiqui) */}
      <section id="founder" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FDFCF7] rounded-3xl p-8 sm:p-12 border border-zips-green-100 shadow-premium relative overflow-hidden">
            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-100 px-3.5 py-1 rounded-full border border-zips-gold-300">
                  Founder's Message
                </span>
                <span className="text-xs font-semibold text-zips-charcoal-500">
                  Leadership & Governance
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zips-green-950">
                "{LEADERSHIP_MESSAGES.founder.pullQuote}"
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed font-normal">
                {LEADERSHIP_MESSAGES.founder.message.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h5 className="font-sans font-bold text-base text-zips-green-950">{LEADERSHIP_MESSAGES.founder.name}</h5>
                  <p className="text-xs text-zips-gold-700 font-semibold">{LEADERSHIP_MESSAGES.founder.title}, {LEADERSHIP_MESSAGES.founder.institution}</p>
                </div>
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shadow-sm"
                >
                  Schedule Campus Walkthrough
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Principal’s Message */}
      <section id="principal" className="py-20 bg-zips-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 rounded-3xl p-8 sm:p-12 border border-zips-gold-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-400 bg-white/10 px-3 py-1 rounded-full border border-zips-gold-400/30">
                  Principal’s Message
                </span>
                
                {/* Franklin Quote */}
                <div className="p-4 bg-black/20 rounded-xl border-l-4 border-zips-gold-400">
                  <p className="font-sans text-base sm:text-lg text-zips-gold-300 italic">
                    "{LEADERSHIP_MESSAGES.principal.famousQuote}"
                  </p>
                  <p className="text-right text-xs text-gray-400 font-mono mt-1">
                    — {LEADERSHIP_MESSAGES.principal.quoteAttribute}
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {LEADERSHIP_MESSAGES.principal.message.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/15">
                  <h5 className="font-sans font-bold text-sm text-white">Principal</h5>
                  <p className="text-xs text-zips-gold-400">Zainab International Public School</p>
                </div>
              </div>

              <div className="lg:col-span-4 text-center">
                <div className="relative inline-block rounded-2xl overflow-hidden border-2 border-zips-gold-500/40 shadow-xl max-w-[280px]">
                  <img
                    src={LEADERSHIP_MESSAGES.principal.image}
                    alt="Principal"
                    className="w-full h-80 object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ZIPS Board Members & Governance */}
      <section id="board-members" className="py-20 bg-white relative overflow-hidden">
        {/* Subtle ambient blur accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-zips-gold-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-zips-green-50/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* NES Executive Committee Section */}
          <div className="mb-16">
            <SectionHeader
              badge="Apex Governing Body"
              title="NES Executive Committee"
              subtitle="The executive leadership and administrative trustees guiding the strategic vision, institutional governance, and patron initiatives of the school."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {NES_EXECUTIVE_COMMITTEE.map((member, idx) => (
                <div
                  key={member.id}
                  className="bg-gradient-to-br from-[#FDFCF7] via-white to-amber-50/30 hover:to-white rounded-2xl p-5 border border-zips-gold-300/80 hover:border-zips-gold-500 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zips-gold-400 via-amber-500 to-zips-green-800"></div>

                  <div className="flex items-start gap-3.5">
                    {/* Number Badge */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zips-gold-500 to-amber-600 text-zips-green-950 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-300 group-hover:scale-105 transition-transform">
                      {String(member.id).padStart(2, '0')}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-base text-zips-green-950 group-hover:text-zips-gold-700 transition-colors leading-snug">
                        {member.name}
                      </h4>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zips-green-950 text-zips-gold-300 text-xs font-bold shadow-xs">
                        <Award className="w-3 h-3 text-zips-gold-400 flex-shrink-0" />
                        <span>{member.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NES Executive Members Section */}
          <div className="mb-16 pt-10 border-t border-gray-200">
            <SectionHeader
              badge="Executive Administration"
              title="NES Executive Members"
              subtitle="Distinguished executive council members actively managing operational governance, institutional welfare, and pedagogical support."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {NES_EXECUTIVE_MEMBERS.map((member, idx) => (
                <div
                  key={member.id}
                  className="bg-[#FDFCF7] hover:bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/80 hover:border-zips-gold-400 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-3.5 group relative overflow-hidden"
                >
                  {/* Subtle left accent bar on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-zips-gold-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Number Badge */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-900 to-amber-950 text-zips-gold-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 shadow-sm border border-amber-500/20 group-hover:scale-105 transition-transform">
                    {String(member.id).padStart(2, '0')}
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-zips-green-950 group-hover:text-zips-gold-700 transition-colors truncate">
                      {member.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200">
            <SectionHeader
              badge="Advisory & Academic Council"
              title="ZIPS Board Members"
              subtitle="Esteemed educationists, engineers, medical doctors, scholars, and community leaders guiding the mission, academic policies, and holistic growth of Zainab International Public School."
            />

            {/* Board Members Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {ZIPS_BOARD_MEMBERS.map((member, idx) => (
                <div
                  key={member.id}
                  className="bg-[#FDFCF7] hover:bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 hover:border-zips-gold-400 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-3.5 group relative overflow-hidden"
                >
                  {/* Subtle left accent bar on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-zips-gold-400 to-zips-green-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Number Badge */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zips-green-950 to-zips-green-900 text-zips-gold-300 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 shadow-sm border border-zips-gold-500/20 group-hover:scale-105 transition-transform">
                    {String(member.id).padStart(2, '0')}
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-zips-green-950 group-hover:text-zips-gold-700 transition-colors truncate">
                      {member.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advisory Desk Summary Pill */}
          <div className="mt-10 bg-gradient-to-r from-zips-green-950 via-zips-green-900 to-zips-green-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-zips-gold-400/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zips-gold-500/20 text-zips-gold-400 flex items-center justify-center flex-shrink-0 border border-zips-gold-400/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-base sm:text-lg text-white">
                  Committed to Ethical Leadership & Academic Excellence
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
                  The ZIPS Board of Members brings decades of combined expertise across engineering, medicine, public administration, and pedagogy to ensure our students receive world-class education with uncompromising moral values.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zips-green-950 bg-zips-gold-400 hover:bg-zips-gold-300 transition-colors shadow-md flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-zips-green-950" />
              <span>Connect with Admissions</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. ZIPS Faculties */}
      <section id="faculties" className="py-20 bg-[#FDFCF7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Academic Mentors & Educators"
            title="ZIPS Faculties"
            subtitle="Meet our highly qualified, passionate educators and mentors dedicated to cultivating intellectual brilliance and strong moral character in every student."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {ZIPS_FACULTIES.map((fac, idx) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/90 hover:border-zips-gold-400 shadow-soft hover:shadow-md transition-all duration-300 flex items-start gap-4 group relative overflow-hidden"
              >
                {/* Subtle top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zips-green-800 via-zips-gold-400 to-zips-green-900"></div>

                {/* Portrait Avatar or Initials */}
                <div className="relative flex-shrink-0">
                  {fac.image ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-zips-gold-300/80 shadow-sm bg-gray-100 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={fac.image}
                        alt={fac.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-zips-green-950 to-zips-green-800 text-zips-gold-300 flex flex-col items-center justify-center font-bold text-base shadow-sm border border-zips-gold-400/30 group-hover:scale-105 transition-transform duration-300">
                      <GraduationCap className="w-6 h-6 text-zips-gold-400 mb-0.5" />
                      <span className="text-[10px] font-mono tracking-wider">#{String(fac.id).padStart(2, '0')}</span>
                    </div>
                  )}

                  {/* Index badge overlaid on photo */}
                  {fac.image && (
                    <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-zips-green-950 text-zips-gold-300 text-[10px] font-mono font-bold flex items-center justify-center border border-zips-gold-400 shadow-xs">
                      {fac.id}
                    </div>
                  )}
                </div>

                {/* Faculty Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-sans font-bold text-base text-zips-green-950 group-hover:text-zips-gold-700 transition-colors">
                      {fac.name}
                    </h4>
                  </div>

                  {/* Role Pill */}
                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zips-green-100/80 text-zips-green-900 border border-zips-green-200">
                      <Award className="w-3 h-3 text-zips-gold-600 flex-shrink-0" />
                      <span>{fac.role}</span>
                    </span>
                  </div>

                  {/* Qualification */}
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-start gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-zips-gold-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      {fac.qualification}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Values & Character Attributes Grid */}
      <section id="values" className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Ethical Pillars"
            title="Our Values & Attributes"
            subtitle="The foundational virtues practiced daily by students and educators alike."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MORAL_VALUES.map((val, idx) => (
              <div
                key={val.name}
                className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 hover:border-zips-gold-400 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-zips-green-100 text-zips-green-900 flex items-center justify-center font-sans font-bold text-sm mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-sans font-bold text-base text-zips-green-950 mb-1">
                  {val.name}
                </h4>
                <p className="text-xs text-zips-charcoal-700 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
