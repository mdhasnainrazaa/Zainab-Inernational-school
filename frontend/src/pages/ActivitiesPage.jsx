import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Trophy, Award, Filter, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import { BEYOND_ACADEMICS_ACTIVITIES } from '../data/schoolData';

export default function ActivitiesPage({ onOpenEnquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Martial Arts', 'Yoga & Wellness', 'Mind Games & Logic', 'Creative Arts & Calligraphy', 'Workshops & Training'];

  const filtered = activeCategory === 'All'
    ? BEYOND_ACADEMICS_ACTIVITIES
    : BEYOND_ACADEMICS_ACTIVITIES.filter(a => a.category === activeCategory);

  return (
    <div>
      <SEO
        title="Beyond Academics: Skills & Co-Curricular Programmes"
        description="Explore our specialized activities: Martial Arts, Yoga, Abacus, Chess, Sudoku, Calligraphy, Art & Craft, and project workshops at ZIPS."
      />

      <PageHero
        badge="Holistic Development"
        title="Beyond Academics: Skills, Sports & Creative Arts"
        subtitle="Unlocking cognitive speed, physical resilience, strategic foresight, and artistic elegance in every student."
        breadcrumb={[{ name: 'Activities & Beyond Academics' }]}
        bgImage="/infrastructure/zips-school-outdoor-sports-training-ground.webp"
      />

      {/* Activities Filter Bar & Grid */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Activity Showcase"
            title="Empowering the Mind, Body & Creative Spirit"
            subtitle="Explore our comprehensive co-curricular disciplines woven into our weekly academic schedule."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-zips-green-900 text-white shadow-md'
                    : 'bg-white text-zips-charcoal-800 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((act) => (
              <div
                key={act.id}
                id={act.id}
                className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-premium border border-gray-100 hover:border-zips-gold-400 transition-all flex flex-col justify-between group scroll-mt-28"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zips-green-950/80 text-zips-gold-400 backdrop-blur-xs">
                    {act.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-sans font-bold text-base text-zips-green-950 mb-2 group-hover:text-zips-gold-600 transition-colors">
                      {act.title}
                    </h4>
                    <p className="text-xs text-zips-charcoal-700 leading-relaxed mb-4">
                      {act.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 space-y-1 text-[11px] text-zips-green-900 font-medium">
                    {act.outcomes.map((out, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zips-gold-500 flex-shrink-0" />
                        <span className="truncate">{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-zips-green-950 to-zips-green-900 text-white rounded-3xl p-8 sm:p-12 text-center border border-zips-gold-500/30 shadow-2xl max-w-4xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white">
              Every Activity is Guided by Certified Instructors
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
              Our students participate in inter-school competitions, grading belts in martial arts, and speed math tournaments throughout the year.
            </p>
            <button
              onClick={onOpenEnquiry}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-zips-gold-500 text-zips-green-950 hover:bg-zips-gold-400 transition-colors shadow-lg"
            >
              Enquire About School Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
