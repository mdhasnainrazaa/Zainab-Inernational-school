import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  Camera,
  Layers,
  Building,
  FlaskConical,
  GraduationCap,
  Trophy,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import { FACILITIES_LIST, SCHOOL_INFO } from '../data/schoolData';

const ALL_INFRASTRUCTURE_GALLERY = [
  {
    title: 'Modern Smart Classroom Interior',
    category: 'Classrooms & Studios',
    image: '/infrastructure/zips-school-modern-smart-classroom-interior.webp',
    thumb: '/infrastructure/zips-school-modern-smart-classroom-interior-thumb.webp',
    caption: 'Ergonomic dual-student desks and daylight-filled smart classrooms.',
  },
  {
    title: 'Composite Science & STEM Lab',
    category: 'Labs & Media',
    image: '/infrastructure/zips-school-science-composite-laboratory.webp',
    thumb: '/infrastructure/zips-school-science-composite-laboratory-thumb.webp',
    caption: 'Precision optical microscopes and comprehensive experimental apparatus.',
  },
  {
    title: 'Audio-Visual Seminar Hall',
    category: 'Labs & Media',
    image: '/infrastructure/zips-school-smart-seminar-hall-projector-room.webp',
    thumb: '/infrastructure/zips-school-smart-seminar-hall-projector-room-thumb.webp',
    caption: 'High-definition ceiling projection & digital audio-visual auditorium.',
  },
  {
    title: '24/7 CCTV Surveillance Command',
    category: 'Administration & Safety',
    image: '/infrastructure/zips-school-cctv-surveillance-security-monitoring-room.webp',
    thumb: '/infrastructure/zips-school-cctv-surveillance-security-monitoring-room-thumb.webp',
    caption: 'Multi-screen central surveillance command ensuring complete campus safety.',
  },
  {
    title: 'Physical Education & Agility Arena',
    category: 'Sports & Wellness',
    image: '/infrastructure/zips-school-physical-education-sports-agility-drills.webp',
    thumb: '/infrastructure/zips-school-physical-education-sports-agility-drills-thumb.webp',
    caption: 'Agility cone drills, martial arts training, and athletic conditioning.',
  },
  {
    title: 'Lush Outdoor Sports Grounds',
    category: 'Sports & Wellness',
    image: '/infrastructure/zips-school-outdoor-sports-training-ground.webp',
    thumb: '/infrastructure/zips-school-outdoor-sports-training-ground-thumb.webp',
    caption: 'Tree-lined sports grounds and athletics field for sportsmanship and wellness.',
  },
  {
    title: 'Kindergarten & Early Play Studio',
    category: 'Classrooms & Studios',
    image: '/infrastructure/zips-school-kindergarten-primary-activity-classroom.webp',
    thumb: '/infrastructure/zips-school-kindergarten-primary-activity-classroom-thumb.webp',
    caption: 'Colorful, child-safe round tables and interactive early-childhood activity zone.',
  },
  {
    title: 'Spacious Ventilated Lecture Hall',
    category: 'Classrooms & Studios',
    image: '/infrastructure/zips-school-spacious-classroom-lecture-hall.webp',
    thumb: '/infrastructure/zips-school-spacious-classroom-lecture-hall-thumb.webp',
    caption: 'Generously sized classrooms equipped for focused academic lectures.',
  },
  {
    title: 'Interactive Whiteboard Teaching Session',
    category: 'Classrooms & Studios',
    image: '/infrastructure/zips-school-classroom-teacher-whiteboard-session.webp',
    thumb: '/infrastructure/zips-school-classroom-teacher-whiteboard-session-thumb.webp',
    caption: 'Structured whiteboard instruction promoting clear conceptual understanding.',
  },
  {
    title: 'Interactive Study & Discussion Circles',
    category: 'Classrooms & Studios',
    image: '/infrastructure/zips-school-interactive-classroom-study-session.webp',
    thumb: '/infrastructure/zips-school-interactive-classroom-study-session-thumb.webp',
    caption: 'Inquiry-led learning and curriculum chart exploration.',
  },
  {
    title: 'Primary School Learning Studio',
    category: 'Classrooms & Studios',
    image: '/infrastructure/zips-school-primary-students-classroom-learning.webp',
    thumb: '/infrastructure/zips-school-primary-students-classroom-learning-thumb.webp',
    caption: 'Focused desk-side learning and teacher review for primary grades.',
  },
  {
    title: 'One-on-One Student Mentorship',
    category: 'Classrooms & Studios',
    image: '/infrastructure/zips-school-student-teacher-interaction-classroom.webp',
    thumb: '/infrastructure/zips-school-student-teacher-interaction-classroom-thumb.webp',
    caption: 'Individualized guidance and compassionate teacher-student mentorship.',
  },
  {
    title: 'Administrative Reception & Welcome Foyer',
    category: 'Administration & Safety',
    image: '/infrastructure/zips-school-reception-administrative-lobby.webp',
    thumb: '/infrastructure/zips-school-reception-administrative-lobby-thumb.webp',
    caption: 'Welcoming front office for parent admissions counseling and queries.',
  },
  {
    title: "Principal's Executive Office & Boardroom",
    category: 'Administration & Safety',
    image: '/infrastructure/zips-school-principal-office-conference-room.webp',
    thumb: '/infrastructure/zips-school-principal-office-conference-room-thumb.webp',
    caption: 'Executive boardroom for academic governance and faculty planning.',
  },
  {
    title: 'Campus Architectural Corridors',
    category: 'Administration & Safety',
    image: '/infrastructure/zips-school-campus-corridor-hallway.webp',
    thumb: '/infrastructure/zips-school-campus-corridor-hallway-thumb.webp',
    caption: 'Wide, naturally lit hallways adorned with inspirational portraits.',
  },
  {
    title: 'Student Council & Campus Facade',
    category: 'Administration & Safety',
    image: '/infrastructure/zips-school-student-council-campus-building-entrance.webp',
    thumb: '/infrastructure/zips-school-student-council-campus-building-entrance-thumb.webp',
    caption: 'Student prefects and leadership team at the main campus entrance.',
  },
  {
    title: 'Grand Campus Entrance & Gate',
    category: 'Administration & Safety',
    image: '/image/Zainab-International-School-Entrance-front.webp',
    thumb: '/image/Zainab-International-School-Entrance-front-thumb.webp',
    caption: 'Main gated entrance welcoming students, staff, and visitors to ZIPS.',
  },
  {
    title: 'Campus Driveway & Approaching View',
    category: 'Administration & Safety',
    image: '/image/Zainab-International-School-Entrance.webp',
    thumb: '/image/Zainab-International-School-Entrance-thumb.webp',
    caption: 'Paved approach road leading towards the main school building.',
  },
  {
    title: 'Joyful Students on Campus Grounds',
    category: 'Sports & Wellness',
    image: '/image/zanaib-international-school-Campus-with-Children.webp',
    thumb: '/image/zanaib-international-school-Campus-with-Children-thumb.webp',
    caption: 'Vibrant student life and playful moments across the open campus lawn.',
  },
  {
    title: 'Outdoor Sports & Play Arena',
    category: 'Sports & Wellness',
    image: '/image/zip-playground.webp',
    thumb: '/image/zip-playground-thumb.webp',
    caption: 'Open-air athletic playground for daily physical education, games, and sports meets.',
  },
];

export default function FacilitiesPage({ onOpenEnquiry }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    'All',
    'Classrooms & Studios',
    'Labs & Media',
    'Administration & Safety',
    'Sports & Wellness',
  ];

  const filteredGallery =
    activeFilter === 'All'
      ? ALL_INFRASTRUCTURE_GALLERY
      : ALL_INFRASTRUCTURE_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <div>
      <SEO
        title="Campus Infrastructure & Facilities"
        description="Explore the Smart Classrooms, Composite Science Labs, Audio-Visual Seminar Hall, 24/7 CCTV Security, and Sports Grounds at Zainab International Public School."
      />

      <PageHero
        badge="Campus & Infrastructure"
        title="World-Class Learning Spaces & Facilities"
        subtitle="Purpose-built infrastructure designed for safety, academic excellence, scientific discovery, and active wellness in Rathgawan, Aligarh."
        breadcrumb={[{ name: 'Campus Facilities' }]}
        bgImage="/image/Szanab-internationa-Campus.png"
      />

      {/* Facilities Detailed Editorial Cards */}
      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            badge="Infrastructure Highlights"
            title="Purpose-Built Facilities for 360° Student Growth"
            subtitle="Every square foot of ZIPS is engineered to support safety, comfort, and cognitive engagement."
          />

          {FACILITIES_LIST.map((fac, idx) => (
            <div
              key={fac.id}
              id={fac.id}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-premium border border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24"
            >
              {/* Image Col (Alternating) */}
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-zips-gold-500/30 group">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-green-950 text-zips-gold-400 backdrop-blur-xs">
                    {fac.tag}
                  </div>
                </div>
              </div>

              {/* Text Col */}
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="text-xs font-bold uppercase tracking-widest text-zips-gold-700 bg-zips-gold-50 px-3 py-1 rounded-full border border-zips-gold-300">
                  {fac.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zips-green-950">
                  {fac.name}
                </h3>
                <p className="font-sans italic text-sm text-zips-gold-700 border-l-2 border-zips-gold-500 pl-3">
                  "{fac.highlightQuote}"
                </p>
                <p className="text-xs sm:text-sm text-zips-charcoal-700 leading-relaxed">
                  {fac.desc}
                </p>

                <div className="pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-zips-green-950 mb-2">
                    Key Infrastructure Highlights:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-zips-charcoal-800">
                    {fac.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-zips-green-800 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenEnquiry}
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shadow-sm"
                  >
                    Schedule Campus Walkthrough
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Campus Infrastructure Visual Gallery */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Visual Walkthrough"
            title="Complete Campus Infrastructure Showcase"
            subtitle="Explore our real campus classrooms, science lab, seminar hall, CCTV command center, sports grounds, and learning spaces."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? 'bg-zips-green-900 text-white shadow-md'
                    : 'bg-[#FDFCF7] text-zips-charcoal-800 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group relative bg-[#FDFCF7] rounded-2xl overflow-hidden border border-gray-200 hover:border-zips-gold-400 shadow-soft hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={item.thumb || item.image}
                    alt={item.title}
                    width="400"
                    height="260"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-zips-green-950/80 text-zips-gold-400 backdrop-blur-xs">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-sans font-bold text-sm leading-tight text-white mb-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
                <div className="p-4 bg-white flex items-center justify-between">
                  <p className="text-[11px] text-zips-charcoal-700 leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                  <Eye className="w-4 h-4 text-zips-gold-500 group-hover:text-zips-green-900 ml-2 flex-shrink-0 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/20"
            >
              <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zips-gold-600 bg-zips-gold-50 px-2.5 py-0.5 rounded-full border border-zips-gold-200 mb-1 inline-block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-zips-green-950">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-zips-charcoal-700 mt-0.5">
                    {selectedImage.caption}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenEnquiry?.();
                  }}
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shrink-0"
                >
                  Book Campus Visit
                </button>
              </div>
            </div>
          </div>
        )}
      
    </div>
  );
}
