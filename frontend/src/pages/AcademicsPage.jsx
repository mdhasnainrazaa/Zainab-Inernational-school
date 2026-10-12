import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, ArrowRight, Sparkles, Layers, Users, Lightbulb, FlaskConical, Search, RefreshCw, Briefcase, CheckSquare } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import {
  TEACHING_METHODOLOGIES,
  EDUCATIONAL_OUTCOMES,
  SCHOOL_INFO,
} from '../data/schoolData';

export default function AcademicsPage({ onOpenEnquiry }) {
  const iconMap = {
    Search: Search,
    Layers: Layers,
    RefreshCw: RefreshCw,
    Briefcase: Briefcase,
    Lightbulb: Lightbulb,
    Users: Users,
    FlaskConical: FlaskConical,
    CheckSquare: CheckSquare,
  };

  return (
    <div>
      <SEO
        title="Academics & Pedagogical Framework"
        description="Discover our inquiry-based learning, flipped classroom methodology, laboratory training, and educational outcomes at Zainab International Public School."
      />

      <PageHero
        badge="Academic Excellence"
        title="Inquiry, Rigor & Experiential Pedagogy"
        subtitle="Empowering students to think critically, experiment boldly, and master concepts through deep intellectual involvement."
        breadcrumb={[{ name: 'Academics' }]}
        bgImage="/infrastructure/zips-school-classroom-teacher-whiteboard-session.webp"
      />

      {/* 1. Academic Structure Overview */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Academic Wings"
            title="Educational Continuum: Early Years to Secondary"
            subtitle="Carefully structured developmental milestones tailored to each age group."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wing 1: Kindergarten */}
            <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
                  Early Years
                </span>
                <h3 className="text-2xl font-sans font-bold text-zips-green-950 mt-4 mb-2">
                  Kindergarten (Nursery & KG)
                </h3>
                <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed mb-4">
                  Curiosity-driven play pedagogy, phonics immersion, sensorial numeracy, and gentle moral socialization.
                </p>
                <ul className="space-y-2 text-xs text-zips-green-900 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sensory exploration & curiosity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Emergent literacy & phonics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Safe, loving environment</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <Link
                  to="/kindergarten"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zips-green-900 hover:text-amber-700 transition-colors"
                >
                  <span>Explore Kindergarten</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Wing 2: Primary */}
            <div id="primary" className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                  Class I to V
                </span>
                <h3 className="text-2xl font-sans font-bold text-zips-green-950 mt-4 mb-2">
                  Primary School
                </h3>
                <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed mb-4">
                  Building deep foundational mastery in mathematics, languages, environmental studies, and integrated arts.
                </p>
                <ul className="space-y-2 text-xs text-zips-green-900 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Abacus mental math & logic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Calligraphy & penmanship</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Yoga & physical conditioning</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <button
                  onClick={onOpenEnquiry}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zips-green-900 hover:text-emerald-700 transition-colors"
                >
                  <span>Enquire for Primary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Wing 3: Middle & Secondary */}
            <div className="bg-white rounded-3xl p-8 border border-blue-200 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-300">
                  Class VI to IX
                </span>
                <h3 className="text-2xl font-sans font-bold text-zips-green-950 mt-4 mb-2">
                  Middle & Secondary
                </h3>
                <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed mb-4">
                  Rigorous scientific inquiry, laboratory experimentation, advanced STEM projects, and analytical debate.
                </p>
                <ul className="space-y-2 text-xs text-zips-green-900 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Composite science & IT labs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Chess tactics & Sudoku lab</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Project-based club meetings</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <button
                  onClick={onOpenEnquiry}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zips-green-900 hover:text-blue-700 transition-colors"
                >
                  <span>Enquire for Middle / Secondary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Teaching Methodologies (Exact 8 Pillars from Prompt) */}
      <section id="methodology" className="py-20 bg-zips-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Pedagogical Architecture"
            title="Our 8 Teaching & Learning Methodologies"
            subtitle="Crafted around active student involvement, experiential verification, and reflective thinking."
            light={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEACHING_METHODOLOGIES.map((m, idx) => {
              const Icon = iconMap[m.icon] || BookOpen;
              return (
                <div
                  key={m.title}
                  className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-zips-gold-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-zips-gold-500/20 text-zips-gold-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-sans font-bold text-base text-white mb-2">
                      {m.title}
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-zips-gold-400">
                    METHODOLOGY 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Educational Outcomes (12 Core Competencies) */}
      <section id="outcomes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Future Proof Skills"
            title="Educational Outcomes: Preparing for 21st-Century Challenges"
            subtitle="The 12 holistic competencies cultivated in every ZIPS graduate."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {EDUCATIONAL_OUTCOMES.map((out, idx) => (
              <div
                key={out.title}
                className="bg-[#FDFCF7] p-5 rounded-xl border border-gray-200 hover:border-zips-green-400 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-zips-gold-600 block mb-1">
                  0{idx + 1}
                </span>
                <h5 className="font-sans font-bold text-sm text-zips-green-950 mb-1.5">
                  {out.title}
                </h5>
                <p className="text-[11px] text-zips-charcoal-700 leading-relaxed">
                  {out.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
