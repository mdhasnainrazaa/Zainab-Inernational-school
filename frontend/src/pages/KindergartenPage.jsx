import React from 'react';
import { Sparkles, Heart, Smile, Sun, CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import { KINDERGARTEN_PROGRAMME, SCHOOL_INFO } from '../data/schoolData';

export default function KindergartenPage({ onOpenEnquiry }) {
  return (
    <div>
      <SEO
        title="Kindergarten Programme (Nursery & KG)"
        description="A warm, safe, and curiosity-driven early-childhood learning environment for Nursery and KG at Zainab International Public School."
      />

      <PageHero
        badge="Early Childhood Education"
        title="Kindergarten Programme: Nursery & KG"
        subtitle="Where natural curiosity meets play-based discovery, phonics immersion, and loving guidance in Rathgawan, Aligarh."
        breadcrumb={[{ name: 'Academics', path: '/academics' }, { name: 'Kindergarten' }]}
        bgImage="/infrastructure/zips-school-kindergarten-primary-activity-classroom.webp"
      />

      {/* 1. Introduction to Early Years */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Nursery & KG
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zips-green-950">
                Laying the Joyful Foundations for a Lifetime of Learning
              </h2>
              <p className="text-sm sm:text-base text-zips-charcoal-700 leading-relaxed">
                At Zainab International Public School, we understand that the early childhood years are a sacred window of discovery. Our Kindergarten programme is designed to feel like a warm, supportive home where every child feels cherished, secure, and inspired to explore.
              </p>
              <p className="text-sm sm:text-base text-zips-charcoal-700 leading-relaxed">
                We blend foundational phonics, sensorial mathematics, and fine-motor arts with moral socialization and abundant physical play.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shadow-md"
                >
                  Apply for Nursery & KG
                </button>
                <a
                  href={`tel:${SCHOOL_INFO.phones[0]}`}
                  className="px-5 py-3 rounded-full text-xs font-semibold text-zips-green-900 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Call Early Years Coordinator
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <img
                    src="/infrastructure/zips-school-kindergarten-primary-activity-classroom.webp"
                    alt="Kindergarten Activity Classroom"
                    width="400"
                    height="230"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white mt-6">
                  <img
                    src="/infrastructure/zips-school-student-teacher-interaction-classroom.webp"
                    alt="Playful Exploration & Teacher Care"
                    width="400"
                    height="230"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 6 Developmental Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Early Years Pillars"
            title="The Kindergarten Learning Experience"
            subtitle="Carefully calibrated developmental areas supporting every little learner’s cognitive, social, and emotional growth."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {KINDERGARTEN_PROGRAMME.pillars.map((pil, idx) => (
              <div
                key={pil.title}
                className="bg-[#FDFCF7] p-7 rounded-3xl border border-amber-200/80 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-sans font-bold text-lg mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="font-sans font-bold text-lg text-zips-green-950 mb-2">
                    {pil.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-amber-200/60 flex items-center gap-2 text-xs font-semibold text-amber-900">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Joyful Discovery</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
