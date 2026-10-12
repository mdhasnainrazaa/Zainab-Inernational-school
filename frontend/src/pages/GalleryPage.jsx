import React, { useState } from 'react';
import { X, Sparkles, Image, Maximize2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'ZIPS Main Campus Building & Facade',
      category: 'Campus & Infrastructure',
      image: '/image/Szanab-internationa-Campus.webp',
      thumb: '/image/Szanab-internationa-Campus-thumb.webp',
      caption: 'Serene, secure, and modern campus located in Rathgawan, Aligarh.',
    },
    {
      id: 2,
      title: 'Modern Smart Classroom Interior',
      category: 'Smart Classrooms',
      image: '/infrastructure/zips-school-modern-smart-classroom-interior.webp',
      thumb: '/infrastructure/zips-school-modern-smart-classroom-interior-thumb.webp',
      caption: 'Ergonomic dual-student desks and daylight-filled smart classrooms.',
    },
    {
      id: 3,
      title: 'Composite Science & STEM Laboratory',
      category: 'Laboratories',
      image: '/infrastructure/zips-school-science-composite-laboratory.webp',
      thumb: '/infrastructure/zips-school-science-composite-laboratory-thumb.webp',
      caption: 'Precision optical microscopes and comprehensive experimental apparatus.',
    },
    {
      id: 4,
      title: 'Audio-Visual Seminar Hall & Discovery Center',
      category: 'Campus & Infrastructure',
      image: '/infrastructure/zips-school-smart-seminar-hall-projector-room.webp',
      thumb: '/infrastructure/zips-school-smart-seminar-hall-projector-room-thumb.webp',
      caption: 'High-definition ceiling projection & digital audio-visual auditorium.',
    },
    {
      id: 5,
      title: 'Physical Education & Agility Training',
      category: 'Sports & Martial Arts',
      image: '/infrastructure/zips-school-physical-education-sports-agility-drills.webp',
      thumb: '/infrastructure/zips-school-physical-education-sports-agility-drills-thumb.webp',
      caption: 'Agility cone drills, athletic conditioning, and fitness development.',
    },
    {
      id: 6,
      title: 'Outdoor Sports Grounds & Athletics Area',
      category: 'Sports & Martial Arts',
      image: '/infrastructure/zips-school-outdoor-sports-training-ground.webp',
      thumb: '/infrastructure/zips-school-outdoor-sports-training-ground-thumb.webp',
      caption: 'Lush tree-lined sports grounds and athletic training zone.',
    },
    {
      id: 7,
      title: 'Kindergarten & Early Play Learning Studio',
      category: 'Kindergarten',
      image: '/infrastructure/zips-school-kindergarten-primary-activity-classroom.webp',
      thumb: '/infrastructure/zips-school-kindergarten-primary-activity-classroom-thumb.webp',
      caption: 'Colorful, child-safe round tables and interactive early-childhood activity zone.',
    },
    {
      id: 8,
      title: 'Spacious Ventilated Lecture Hall',
      category: 'Smart Classrooms',
      image: '/infrastructure/zips-school-spacious-classroom-lecture-hall.webp',
      thumb: '/infrastructure/zips-school-spacious-classroom-lecture-hall-thumb.webp',
      caption: 'Generously sized classrooms equipped for focused academic lectures.',
    },
    {
      id: 9,
      title: 'Interactive Whiteboard Academic Instruction',
      category: 'Smart Classrooms',
      image: '/infrastructure/zips-school-classroom-teacher-whiteboard-session.webp',
      thumb: '/infrastructure/zips-school-classroom-teacher-whiteboard-session-thumb.webp',
      caption: 'Structured whiteboard instruction promoting clear conceptual understanding.',
    },
    {
      id: 10,
      title: 'Collaborative Group Study & Wall Charts',
      category: 'Smart Classrooms',
      image: '/infrastructure/zips-school-interactive-classroom-study-session.webp',
      thumb: '/infrastructure/zips-school-interactive-classroom-study-session-thumb.webp',
      caption: 'Inquiry-led learning and curriculum chart exploration.',
    },
    {
      id: 11,
      title: 'Primary School Learning Studio',
      category: 'Smart Classrooms',
      image: '/infrastructure/zips-school-primary-students-classroom-learning.webp',
      thumb: '/infrastructure/zips-school-primary-students-classroom-learning-thumb.webp',
      caption: 'Focused desk-side learning and teacher review for primary grades.',
    },
    {
      id: 12,
      title: 'One-on-One Student Mentorship',
      category: 'Smart Classrooms',
      image: '/infrastructure/zips-school-student-teacher-interaction-classroom.webp',
      thumb: '/infrastructure/zips-school-student-teacher-interaction-classroom-thumb.webp',
      caption: 'Individualized guidance and compassionate teacher-student mentorship.',
    },
    {
      id: 13,
      title: '24/7 CCTV Surveillance Control Command',
      category: 'Campus & Infrastructure',
      image: '/infrastructure/zips-school-cctv-surveillance-security-monitoring-room.webp',
      thumb: '/infrastructure/zips-school-cctv-surveillance-security-monitoring-room-thumb.webp',
      caption: 'Multi-screen central surveillance command ensuring complete campus safety.',
    },
    {
      id: 14,
      title: 'Administrative Reception & Welcome Foyer',
      category: 'Campus & Infrastructure',
      image: '/infrastructure/zips-school-reception-administrative-lobby.webp',
      thumb: '/infrastructure/zips-school-reception-administrative-lobby-thumb.webp',
      caption: 'Welcoming front office for parent admissions counseling and queries.',
    },
    {
      id: 15,
      title: "Principal's Executive Office & Conference Suite",
      category: 'Campus & Infrastructure',
      image: '/infrastructure/zips-school-principal-office-conference-room.webp',
      thumb: '/infrastructure/zips-school-principal-office-conference-room-thumb.webp',
      caption: 'Executive boardroom for academic governance and faculty planning.',
    },
    {
      id: 16,
      title: 'Campus Architectural Corridors',
      category: 'Campus & Infrastructure',
      image: '/infrastructure/zips-school-campus-corridor-hallway.webp',
      thumb: '/infrastructure/zips-school-campus-corridor-hallway-thumb.webp',
      caption: 'Wide, naturally lit hallways adorned with inspirational portraits.',
    },
    {
      id: 17,
      title: 'Student Council & Campus Facade',
      category: 'Campus & Infrastructure',
      image: '/infrastructure/zips-school-student-council-campus-building-entrance.webp',
      thumb: '/infrastructure/zips-school-student-council-campus-building-entrance-thumb.webp',
      caption: 'Student prefects and leadership team at the main campus entrance.',
    },
    {
      id: 18,
      title: 'Grand Campus Entrance & Gate',
      category: 'Campus & Infrastructure',
      image: '/image/Zainab-International-School-Entrance-front.webp',
      thumb: '/image/Zainab-International-School-Entrance-front-thumb.webp',
      caption: 'Main gated entrance welcoming students, staff, and visitors to ZIPS.',
    },
    {
      id: 19,
      title: 'Campus Driveway & Approaching View',
      category: 'Campus & Infrastructure',
      image: '/image/Zainab-International-School-Entrance.webp',
      thumb: '/image/Zainab-International-School-Entrance-thumb.webp',
      caption: 'Paved approach road leading towards the main school building.',
    },
    {
      id: 20,
      title: 'Joyful Students on Campus Grounds',
      category: 'Campus & Infrastructure',
      image: '/image/zanaib-international-school-Campus-with-Children.webp',
      thumb: '/image/zanaib-international-school-Campus-with-Children-thumb.webp',
      caption: 'Vibrant student life and playful moments across the open campus lawn.',
    },
    {
      id: 21,
      title: 'Outdoor Sports & Play Arena',
      category: 'Sports & Martial Arts',
      image: '/image/zip-playground.webp',
      thumb: '/image/zip-playground-thumb.webp',
      caption: 'Open-air athletic playground for daily physical education, games, and sports meets.',
    },
  ];

  const categories = ['All', 'Campus & Infrastructure', 'Smart Classrooms', 'Laboratories', 'Sports & Martial Arts', 'Kindergarten'];
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const displayedItems = filtered.slice(0, visibleCount);

  return (
    <div>
      <SEO
        title="Campus Photo Gallery"
        description="View photo moments from our classrooms, laboratories, Discovery Library, sports fields, and activities at Zainab International Public School."
      />

      <PageHero
        badge="Visual Tour"
        title="Campus Life & Activity Gallery"
        subtitle="A glimpse into daily life, academic rigor, co-curricular energy, and joyous learning at ZIPS."
        breadcrumb={[{ name: 'Photo Gallery' }]}
        bgImage="/image/Zainab-International-School-Entrance-front.webp"
      />

      <section className="py-20 bg-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(12);
                }}
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

          {/* Masonry / Grid Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                layout
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-premium cursor-pointer bg-white border border-gray-100"
              >
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={item.thumb || item.image}
                    alt={item.title}
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-zips-gold-400">
                      {item.category}
                    </span>
                    <h4 className="font-sans font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">{item.caption}</p>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-zips-gold-300">
                      <Maximize2 className="w-3 h-3" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progressive Load More */}
          {visibleCount < filtered.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-zips-green-900 text-white hover:bg-zips-green-800 transition-colors shadow-md"
              >
                Load More Photos ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full bg-zips-green-950 rounded-2xl overflow-hidden border border-zips-gold-500/40 shadow-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-6 text-white">
                <span className="text-xs uppercase font-bold text-zips-gold-400">
                  {selectedImage.category}
                </span>
                <h3 className="font-sans font-bold text-xl text-white mt-1">
                  {selectedImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {selectedImage.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      
    </div>
  );
}
