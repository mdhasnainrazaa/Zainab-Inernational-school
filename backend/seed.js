import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import User from './models/User.js';
import Enquiry from './models/Enquiry.js';
import Blog from './models/Blog.js';
import Activity from './models/Activity.js';
import Event from './models/Event.js';
import Facility from './models/Facility.js';
import Gallery from './models/Gallery.js';
import Testimonial from './models/Testimonial.js';
import SiteSetting from './models/SiteSetting.js';
import Notice from './models/Notice.js';

dotenv.config();

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (_) {}

const connUri = process.env.MONGODB_URI || process.env.MONGODB_URL || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zips_school_db';

const seedData = async () => {
  try {
    await mongoose.connect(connUri);
    console.log('[Seed] Connected to database');

    // Clean existing
    await User.deleteMany();
    await Blog.deleteMany();
    await Activity.deleteMany();
    await Event.deleteMany();
    await Facility.deleteMany();
    await Gallery.deleteMany();
    await Testimonial.deleteMany();
    await SiteSetting.deleteMany();
    await Enquiry.deleteMany();
    await Notice.deleteMany();

    console.log('[Seed] Cleared existing collections');

    // 1. Users
    const adminEmail = (process.env.ADMIN_EMAIL || process.env.ADMIN_GMAIL || 'hkbinfotechofficial@gmail.com').trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || 'zips@123').trim();

    const superAdmin = await User.create({
      name: process.env.ADMIN_NAME || 'ZIPS Administrator',
      email: adminEmail,
      password: adminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    });

    console.log(`[Seed] Created Admin user from .env (${adminEmail})`);

    // 2. Site Settings
    await SiteSetting.create({
      schoolName: 'Zainab International Public School',
      tagline: 'Rise & Shine',
      headline: 'Shaping Confident Learners. Building Strong Character.',
      primaryPhone: '+91-9411030100',
      secondaryPhone: '+91-9411022252',
      primaryEmail: 'tonationaleducation@gmail.com',
      address: 'Behind CDF, Krishi Vigyan Kendra, Rathgawan, Aligarh, Uttar Pradesh, India',
      mapCoordinates: { lat: 27.8974, lng: 78.0880 },
      mapEmbedUrl: 'https://maps.google.com/maps?q=Behind+CDF+Krishi+Vigyan+Kendra+Rathgawan+Aligarh&t=&z=14&ie=UTF8&iwloc=&output=embed',
      instagramUrl: 'https://www.instagram.com/zipsaligarh/',
      facebookUrl: 'https://www.facebook.com',
      academicSession: '2026-2027',
      isAdmissionOpen: true,
      announcementNotice: {
        isActive: true,
        text: 'Admissions Open for Academic Session 2026-2027 (Nursery to Class IX). Campus tours & interaction sessions open now!',
        link: '/admissions',
      },
    });

    // 3. Facilities
    await Facility.create([
      {
        name: 'Discovery Library',
        slug: 'discovery-library',
        tag: 'Academic Resource Centre',
        highlightQuote: 'More than a library — a world of discovery.',
        shortDescription: 'A modern, light-filled knowledge hub fostering a lifelong passion for reading, independent research, and imaginative exploration.',
        fullDescription: 'Our school library is meticulously curated to ignite intellectual curiosity across age groups. Featuring rich collections of literary classics, reference encyclopedias, children’s illustrated literature, audiobooks, and digital periodicals, the library is an inspiring sanctuary for inquisitive minds.',
        features: [
          'Extensive fiction, non-fiction and research titles',
          'Age-appropriate early-reader corner for Kindergarten',
          'Comfortable ergonomic reading bays and study carrels',
          'Digital cataloguing and multimedia research stations',
          'Weekly guided storytelling and book club circles',
        ],
        coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
        sortOrder: 1,
      },
      {
        name: 'Hygienic Canteen & Nutrition Hub',
        slug: 'hygienic-canteen',
        tag: 'Student Wellness',
        highlightQuote: 'Affordable, healthy, hygienic, student-friendly nutrition.',
        shortDescription: 'Wholesome, balanced meals and nutritious snacks prepared under strict safety and hygiene standards.',
        fullDescription: 'At ZIPS, we believe that proper nutrition fuels sharp minds. Our campus canteen serves clean, wholesome, vegetarian food prepared daily in a modern, stainless-steel culinary environment supervised for utmost cleanliness and nutritional balance.',
        features: [
          'Daily prepared fresh, nutritious meals and seasonal juices',
          'Strict sanitization and food quality monitoring',
          'Subsidized and student-friendly pricing',
          'Spacious, airy dining hall promoting dining etiquette',
          'Filtered UV-purified drinking water systems campus-wide',
        ],
        coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        sortOrder: 2,
      },
      {
        name: 'Interactive Laboratories',
        slug: 'interactive-laboratories',
        tag: 'Experiential STEM',
        highlightQuote: 'Learning science through hypothesis, experiment, and discovery.',
        shortDescription: 'Modern, fully equipped Composite Science and Computer Technology labs that translate theoretical concepts into hands-on understanding.',
        fullDescription: 'Our laboratory infrastructure encourages students to test hypotheses and discover scientific principles empirically. Under teacher supervision, students conduct chemistry reactions, observe biological specimens under high-power microscopes, investigate physics principles, and develop algorithmic thinking in computer labs.',
        features: [
          'High-precision optical microscopes and laboratory apparatus',
          'High-speed networked computer stations with modern programming tools',
          'Safety gear, fire protection, and first-aid containment protocols',
          'Hands-on experimental kits tailored to each grade syllabus',
          'Demonstration tables for interactive group presentations',
        ],
        coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
        sortOrder: 3,
      },
      {
        name: 'Smart Classrooms',
        slug: 'smart-classrooms',
        tag: 'Modern Learning Spaces',
        highlightQuote: 'Vibrant, ventilated, technology-integrated learning studios.',
        shortDescription: 'Naturally lit, acoustically balanced classrooms equipped with interactive display systems and modular seating.',
        fullDescription: 'Our classrooms are designed around student comfort and active engagement. Featuring large windows for natural ventilation, interactive digital boards, age-appropriate ergonomic desks, and collaborative cluster arrangements, every classroom is a lively studio of learning.',
        features: [
          'Interactive smart touch displays for visual pedagogy',
          'Ergonomic, height-optimized posture furniture',
          'Natural cross-ventilation and abundant daylight',
          'Dedicated display boards for student artwork and projects',
          'Low student-to-teacher ratio ensuring individualized care',
        ],
        coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
        sortOrder: 4,
      },
      {
        name: 'Sports & Athletics Grounds',
        slug: 'sports-athletics',
        tag: 'Physical Fitness & Character',
        highlightQuote: 'Building stamina, sportsmanship, and teamwork on the field.',
        shortDescription: 'Dedicated outdoor play areas, athletic tracks, and courts designed to cultivate discipline, endurance, and team spirit.',
        fullDescription: 'Physical education is integral to our holistic ethos. Students participate in regular physical training, athletics, team sports, and agility drills under trained coaches, learning the invaluable life skills of perseverance, fair play, and resilience.',
        features: [
          'Multipurpose green sports turf for football and athletics',
          'Dedicated badminton and volleyball practice courts',
          'Early-years secure playground with safety-cushioned surfaces',
          'Trained sports instructors guiding inter-house tournaments',
          'Daily morning warm-up, calisthenics, and movement routines',
        ],
        coverImage: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=1200&q=80',
        sortOrder: 5,
      },
    ]);

    // 4. Activities (Exact items from prompt)
    await Activity.create([
      {
        title: 'Martial Arts & Self-Defense',
        slug: 'martial-arts',
        category: 'Martial Arts',
        shortDescription: 'Instilling mental discipline, physical agility, self-confidence, and defensive techniques under certified trainers.',
        fullDescription: 'Martial arts training at ZIPS teaches students balance, mental focus, situational awareness, and respect. Beyond physical fitness and defensive forms, students internalize self-restraint, patience, and unwavering confidence.',
        keyOutcomes: ['Physical stamina and reflex speed', 'Self-discipline and respect for peers', 'Practical self-defense awareness', 'Belt grading and tournament readiness'],
        coverImage: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'Class I to IX',
        frequency: 'Bi-Weekly Sessions',
        sortOrder: 1,
      },
      {
        title: 'Yoga & Mindful Breathing',
        slug: 'yoga-wellness',
        category: 'Yoga & Wellness',
        shortDescription: 'Cultivating mindfulness, flexibility, concentration, and emotional equilibrium through ancient yogic postures and pranayama.',
        fullDescription: 'Yoga sessions provide our students with tools to manage study stress, enhance lung capacity, correct spinal posture, and cultivate inner tranquility through guided asanas, Surya Namaskar, and mindfulness techniques.',
        keyOutcomes: ['Improved concentration and memory retention', 'Core stability and physical flexibility', 'Stress management and emotional regulation', 'Postural alignment and breathing health'],
        coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'Kindergarten to Class IX',
        frequency: 'Weekly Routine',
        sortOrder: 2,
      },
      {
        title: 'Abacus & Speed Mental Math',
        slug: 'abacus-mental-math',
        category: 'Mind Games & Logic',
        shortDescription: 'Unlocking rapid mental arithmetic, bilateral brain stimulation, and hyper-focused computational accuracy.',
        fullDescription: 'The Abacus mental calculation programme trains children to visualize numbers as bead patterns, activating both left and right cerebral hemispheres to solve arithmetic operations at remarkable speed without reliance on calculators.',
        keyOutcomes: ['Lightning-speed calculation ability', 'Enhanced photographic memory and visualization', 'Sharper attention span and listening skills', 'Lifelong confidence in mathematics'],
        coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'Class KG to Class VI',
        frequency: 'Weekly Intensive Workshop',
        sortOrder: 3,
      },
      {
        title: 'Chess Mastery & Strategic Thinking',
        slug: 'chess-strategy',
        category: 'Mind Games & Logic',
        shortDescription: 'Teaching students patience, predictive reasoning, tactical evaluation, and responsible decision-making on the 64 squares.',
        fullDescription: 'Chess is an unmatched catalyst for cognitive development. Our chess club introduces openings, middle-game tactics, and endgame mastery, challenging students to forecast opponent moves, manage time under pressure, and embrace setbacks as learning steps.',
        keyOutcomes: ['Logical forecasting and foresight', 'Spatial analysis and pattern recognition', 'Impulse control and strategic patience', 'Competitive sportsmanship'],
        coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'Class II to Class IX',
        frequency: 'Weekly Club Meetings',
        sortOrder: 4,
      },
      {
        title: 'Sudoku & Critical Logic Lab',
        slug: 'sudoku-logic-lab',
        category: 'Mind Games & Logic',
        shortDescription: 'Fostering deductive reasoning, persistence, and algorithmic problem-solving through grid puzzles.',
        fullDescription: 'Sudoku puzzle sessions train students in structured elimination, trial evaluation, and persistence. By solving puzzles across difficulty grades, learners hone analytical problem-solving skills applicable to science, math, and everyday reasoning.',
        keyOutcomes: ['Deductive reasoning and logical deduction', 'Quick recognition of numerical patterns', 'Concentration and methodical thinking', 'Healthy intellectual recreation'],
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'Class III to Class IX',
        frequency: 'Weekly Puzzle Circle',
        sortOrder: 5,
      },
      {
        title: 'Calligraphy & Fine Handwriting',
        slug: 'calligraphy-handwriting',
        category: 'Creative Arts & Calligraphy',
        shortDescription: 'Developing beautiful handwriting, precision stroke control, aesthetic sense, and fine-motor dexterity.',
        fullDescription: 'Our calligraphy and handwriting workshops instruct students in proper pen grip, stroke pressure, letter proportions, and artistic lettering styles. Cultivating neat handwriting reinforces patience, pride in one’s work, and aesthetic appreciation.',
        keyOutcomes: ['Flawless penmanship and letter proportion', 'Refined fine-motor coordination and grip strength', 'Patience, deliberate focus, and diligence', 'Appreciation for visual arts and typography'],
        coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'Class I to Class VIII',
        frequency: 'Weekly Studio Workshop',
        sortOrder: 6,
      },
      {
        title: 'Art, Craft & Creative Expression',
        slug: 'art-craft-creativity',
        category: 'Creative Arts & Calligraphy',
        shortDescription: 'Encouraging boundless visual creativity through painting, clay modeling, origami, and sustainable upcycling projects.',
        fullDescription: 'The ZIPS Art & Craft studio is a space of freedom and visual exploration. Students experiment with watercolors, acrylics, papier-mâché, origami, and recycled craft materials, translating emotions and observations into tangible artistic masterpieces.',
        keyOutcomes: ['Creative innovation and imaginative confidence', 'Spatial awareness and tactile motor dexterity', 'Understanding colour theory and composition', 'Pride in personal creative creation'],
        coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'All Classes (Nursery to Class IX)',
        frequency: 'Bi-Weekly Studio Sessions',
        sortOrder: 7,
      },
      {
        title: 'Project-Based Training & Club Workshops',
        slug: 'project-based-workshops',
        category: 'Workshops & Training',
        shortDescription: 'Collaborative team challenges, STEM building workshops, debate forums, and practical inquiry investigations.',
        fullDescription: 'Through interdisciplinary club meetings and hands-on project sprints, students work in peer teams to research real-world questions, build prototype models, create presentations, and develop collaborative leadership.',
        keyOutcomes: ['Public speaking and teamwork collaboration', 'Inquiry-led research and synthesis', 'Practical application of textbook theory', 'Leadership and project management skills'],
        coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
        ageGroup: 'Class IV to Class IX',
        frequency: 'Monthly Project Cycles & Club Meets',
        sortOrder: 8,
      },
    ]);

    // 5. Blogs
    await Blog.create([
      {
        title: 'The Power of Involving Learners: Why Active Pedagogy Outperforms Rote Learning',
        slug: 'the-power-of-involving-learners',
        excerpt: 'Exploring Benjamin Franklin’s timeless axiom and how modern inquiry-based methods transform student engagement and comprehension.',
        content: `
          <p><em>"Tell me and I forgot. Teach me and I remember. Involve me and I learn."</em> This profound quote, attributed to Benjamin Franklin, forms the bedrock of pedagogical architecture at Zainab International Public School.</p>
          <h3>Moving Beyond Passive Listening</h3>
          <p>Traditional classrooms often position the child as a passive receptacle of facts. In contrast, 21st-century cognitive science confirms that deep, durable neural connections form when students actively hypothesize, experiment, evaluate, and synthesize ideas.</p>
          <h3>How We Implement Active Learning at ZIPS</h3>
          <ul>
            <li><strong>Inquiry-Based Investigations:</strong> Students begin lessons with provocative questions rather than prefabricated answers.</li>
            <li><strong>Flipped Classroom Discussions:</strong> Foundational reading occurs before class, freeing classroom time for high-level debates and problem solving.</li>
            <li><strong>Hands-On Laboratory Verification:</strong> Theoretical concepts in physics, chemistry, and biology are verified empirically.</li>
            <li><strong>Collaborative Role Play:</strong> Literature and social studies come alive through historical simulations and perspective-taking.</li>
          </ul>
          <p>When students are actively involved, education ceases to be a chore and becomes an exhilarating voyage of discovery.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        category: 'Academic Insights',
        tags: ['Pedagogy', 'Active Learning', 'Teaching Philosophy', 'Child Development'],
        author: superAdmin._id,
        authorName: 'ZIPS Academic Council',
        readTime: '4 min read',
        status: 'PUBLISHED',
      },
      {
        title: 'Nurturing Global Citizens with an Indian Soul: The ZIPS Vision',
        slug: 'nurturing-global-citizens-indian-soul',
        excerpt: 'How our educational environment bridges timeless cultural virtues with global competitiveness for the 21st century.',
        content: `
          <p>At Zainab International Public School, we recognise the imperative of imparting an educational experience that is world-class in every respect and which prepares children for global citizenship. We are a school with an Indian mind, an Indian heart and an Indian soul; a school that celebrates the culture of excellence and is an embodiment of values.</p>
          <h3>Enduring Moral Values</h3>
          <p>Academic excellence devoid of moral character produces incomplete individuals. Our curriculum weaves core virtues into daily school life:</p>
          <ul>
            <li><strong>Kindness & Compassion:</strong> Fostering genuine empathy for peers, elders, and the wider community.</li>
            <li><strong>Honesty & Integrity:</strong> Developing uncompromising ethical standards in academics and sportsmanship.</li>
            <li><strong>Tolerance & Hospitality:</strong> Celebrating diversity and embracing open-hearted communal harmony.</li>
            <li><strong>Charity & Social Responsibility:</strong> Cultivating awareness of social needs and the joy of selfless contribution.</li>
          </ul>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        category: 'School Philosophy',
        tags: ['Vision', 'Character Building', 'Values', 'Holistic Education'],
        author: superAdmin._id,
        authorName: 'Mr. M. A. Siddiqui',
        readTime: '5 min read',
        status: 'PUBLISHED',
      },
      {
        title: 'Unlocking Early Potential: The Kindergarten Journey at ZIPS',
        slug: 'unlocking-early-potential-kindergarten',
        excerpt: 'A child-centric exploration of play-based discovery, foundational literacy, and social awareness in Nursery and KG.',
        content: `
          <p>The early developmental window between ages 3 and 6 is a period of boundless neuroplasticity and curiosity. At ZIPS, our Kindergarten programme (Nursery and KG) is crafted as a joyful, secure harbor where children learn through play, tactile exploration, and supportive guidance.</p>
          <h3>Core Early-Years Pillars</h3>
          <p>Our early childhood curriculum focuses on language immersion, sensorial numeracy, gross and fine motor coordination, and moral socialization.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80',
        category: 'Early Years Education',
        tags: ['Kindergarten', 'Nursery', 'Early Childhood', 'Parenting'],
        author: superAdmin._id,
        authorName: 'Early Years Department',
        readTime: '3 min read',
        status: 'PUBLISHED',
      },
    ]);

    // 6. Events
    await Event.create([
      {
        title: 'Annual Science & Innovation Expo 2026',
        slug: 'annual-science-expo-2026',
        eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        eventTime: '09:30 AM - 02:30 PM',
        location: 'ZIPS Main Auditorium & Science Labs, Rathgawan',
        shortDescription: 'Student-led exhibition featuring working STEM models, robotics demonstrations, and environmental science displays.',
        fullDescription: 'Parents and community members are warmly invited to witness innovative scientific models, live chemistry experiments, and digital presentations engineered by our students from Class III to IX.',
        coverImage: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1000&q=80',
        isUpcoming: true,
      },
      {
        title: 'Inter-House Chess & Abacus Championship',
        slug: 'inter-house-chess-abacus-2026',
        eventDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        eventTime: '10:00 AM - 01:30 PM',
        location: 'ZIPS Indoor Mind Sports Arena',
        shortDescription: 'Exciting tournament testing speed calculation, strategic chess endgames, and puzzle agility across houses.',
        fullDescription: 'Our quarterly mind sports championship brings together young masters across house teams in timed chess matches, rapid abacus calculation rounds, and Sudoku challenges.',
        coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80',
        isUpcoming: true,
      },
      {
        title: 'New Academic Session Orientation & Parent Meet',
        slug: 'parent-orientation-session-2026',
        eventDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000),
        eventTime: '10:30 AM - 12:30 PM',
        location: 'ZIPS Campus Conference Hall',
        shortDescription: 'Comprehensive briefing on 2026-27 academic roadmaps, co-curricular schedules, and parent-teacher collaboration.',
        fullDescription: 'An interactive session welcoming new and existing parents to discuss curriculum milestones, holistic student evaluation, transport protocols, and communication channels.',
        coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
        isUpcoming: true,
      },
    ]);

    // 7. Gallery
    await Gallery.create([
      {
        title: 'ZIPS Campus Facade & Landscaped Grounds',
        category: 'Campus & Buildings',
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
        caption: 'The serene and safe campus environment at Rathgawan, Aligarh.',
        sortOrder: 1,
      },
      {
        title: 'Collaborative Classrooms in Action',
        category: 'Smart Classrooms',
        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
        caption: 'Engaging interactive learning session with modern digital teaching aids.',
        sortOrder: 2,
      },
      {
        title: 'Discovery Library Reading Bay',
        category: 'Discovery Library',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
        caption: 'Students immersing themselves in literature and guided reading.',
        sortOrder: 3,
      },
      {
        title: 'Martial Arts Training & Self Defense',
        category: 'Sports & Martial Arts',
        imageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=80',
        caption: 'Developing physical resilience and discipline during morning training.',
        sortOrder: 4,
      },
      {
        title: 'Science Exploration & Microscopic Observation',
        category: 'Laboratories',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
        caption: 'Hands-on scientific investigations in the composite laboratory.',
        sortOrder: 5,
      },
      {
        title: 'Art, Craft & Calligraphy Workshop',
        category: 'Activities & Workshops',
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80',
        caption: 'Unleashing imagination with colors, papercraft, and lettering.',
        sortOrder: 6,
      },
    ]);

    // 8. Testimonials
    await Testimonial.create([
      {
        authorName: 'Dr. Tariq Khan',
        role: 'Parent',
        relation: 'Parent of Class IV Student',
        content: 'What stands out at Zainab International Public School is the warm balance between academic rigor and moral values. The teachers pay personal attention to each child, and the focus on activities like Abacus and Martial Arts has noticeably boosted my child’s confidence and discipline.',
        rating: 5,
      },
      {
        authorName: 'Mrs. S. Parveen',
        role: 'Parent',
        relation: 'Parent of KG & Class II Students',
        content: 'The Kindergarten environment is safe, caring, and vibrant. My children look forward to going to school every single morning. The library and experiential teaching methods make a huge difference in their curiosity and language development.',
        rating: 5,
      },
      {
        authorName: 'Mohd. Imran Siddiqui',
        role: 'Parent',
        relation: 'Parent of Class VII Student',
        content: 'ZIPS brings genuine international-standard education right to Rathgawan, Aligarh at accessible fee terms. The leadership is accessible, and the emphasis on values like honesty, kindness, and hard work gives parents complete peace of mind.',
        rating: 5,
      },
    ]);

    // 9. Admission Enquiries (Kept clean for real parent submissions)

    // 10. Initial School Notices
    await Notice.create([
      {
        title: 'Admissions Open for Academic Session 2026–27 (Nursery to Class VIII)',
        category: 'Admissions',
        priority: 'Urgent',
        shortSummary: 'Online & walk-in registrations are underway for Nursery to Class VIII. Schedule a personal campus tour & counseling session.',
        content: 'Zainab International Public School announces admissions open for Academic Session 2026-2027 from Nursery & KG up to Class VIII. Parents are invited to register online or visit our admissions helpdesk behind CDF, Rathgawan, Aligarh between 8:00 AM – 3:30 PM.',
        publishDate: new Date('2026-10-06T08:00:00.000Z'),
        targetAudience: 'Parents',
        isActive: true,
      },
      {
        title: 'Parent-Teacher Meeting (PTM) & Student Growth Review',
        category: 'Academic',
        priority: 'Important',
        shortSummary: 'One-on-one parent-educator interaction scheduled for Saturday to discuss holistic learning progress & activities.',
        content: 'Dear Parents & Guardians, the Parent-Teacher Meeting (PTM) is scheduled for this Saturday from 9:00 AM to 1:00 PM. Class teachers and skill mentors look forward to discussing your ward’s foundational progress, communication skills, and term activities.',
        publishDate: new Date('2026-10-04T09:30:00.000Z'),
        targetAudience: 'Parents',
        isActive: true,
      },
      {
        title: 'Annual Sports Meet & Inter-House Championship Trials',
        category: 'Events',
        priority: 'Normal',
        shortSummary: 'Intra-school selection trials for Athletics, Martial Arts (Karate), Chess, and Speed Math beginning next week.',
        content: 'Selection trials for upcoming Inter-House Athletics, Karate, Yoga, and Chess championships will take place on the campus sports ground. Students from Class I to VIII can register with their sports instructors.',
        publishDate: new Date('2026-10-01T10:00:00.000Z'),
        targetAudience: 'Students',
        isActive: true,
      },
      {
        title: 'Winter Uniform Shift & Revised Morning Campus Schedule',
        category: 'General',
        priority: 'Normal',
        shortSummary: 'Guidelines on seasonal winter uniform sets and updated morning assembly timings for the upcoming season.',
        content: 'Parents and guardians are requested to prepare standard winter uniform sets (school blazer, sweater, and tie) for their wards. Revised morning assembly and bus pickup timings will be communicated via the official school portal.',
        publishDate: new Date('2026-09-28T11:00:00.000Z'),
        targetAudience: 'All',
        isActive: true,
      },
    ]);

    console.log('[Seed] Database successfully populated with authentic ZIPS initial dataset!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
