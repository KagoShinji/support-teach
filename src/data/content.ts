import type { 
  BundlePackage, 
  Educator, 
  FeatureColumn, 
  ServiceCard, 
  StatItem, 
  Testimonial 
} from "../types";

export const HERO_CONTENT = {
  badge: "High-end content",
  headline: "Learning Content and Assessments,",
  headlineHighlight: "Built by Real Educators",
  subheadline: "High-quality assessments and academic content — built by real educators, ready to deploy.",
  primaryCTA: "Submit Request",
  secondaryCTA: "Book a Call",
};

export const PARTNER_CONTENT = {
  heading: "A Partner That Understands Both Teaching and Scale",
  body: "We blend the rigor of real teaching experience with the scalability required by modern institutions. Our experts ensure every piece of content meets the highest academic standards.",
  bullets: [
    "Built by real educators, not generic writers",
    "Progress your outcomes from day one",
    "Rigorous, accreditation-ready quality"
  ],
  imagePlaceholder: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
};

export const WHAT_WE_DELIVER: ServiceCard[] = [
  { id: "1", title: "Assessment Development", description: "Rigorous and psychometrically sound items.", iconName: "FileCheck2" },
  { id: "2", title: "Curriculum & Course Structuring", description: "Full mapping and alignment to standards.", iconName: "LayoutTemplate" },
  { id: "3", title: "Instructional Materials", description: "Presentations, handouts, and guides.", iconName: "BookOpen" },
  { id: "4", title: "Academic Content Production", description: "Textbook and original academic content.", iconName: "PenTool" },
  { id: "5", title: "Video Editing & Content Creation", description: "Engaging multimedia learning assets.", iconName: "Video" },
  { id: "6", title: "Content Review & Updating", description: "Modernizing legacy instructional materials.", iconName: "RefreshCcw" },
];

export const BUNDLE_CURRICULUM: BundlePackage[] = [
  { id: "c1", title: "Curriculum Foundation", features: ["Needs analysis", "Learning objectives", "Basic structure"] },
  { id: "c2", title: "Design & Alignment", features: ["Standard mapping", "Course sequencing", "Assessment plan"] },
  { id: "c3", title: "Full Curriculum Development", isPopular: true, features: ["End-to-end design", "All resources included", "Accreditation support"] },
  { id: "c4", title: "Curriculum Review & Enhancement", features: ["Audit existing content", "Modernization", "Gap analysis"] },
];

export const BUNDLE_INSTRUCTIONAL: BundlePackage[] = [
  { id: "i1", title: "Instructional Content Starter", features: ["Syllabus creation", "Basic slide decks", "Reading lists"] },
  { id: "i2", title: "Instructional Materials Development", features: ["Comprehensive guides", "Interactive worksheets", "Multimedia assets"] },
  { id: "i3", title: "Assessment & Evaluation", isPopular: true, features: ["Item banks", "Rubric design", "Formative assessments"] },
  { id: "i4", title: "Full Instructional Design", features: ["Storyboarding", "LMS integration", "Multimedia production"] },
];

export const WHAT_MAKES_US_DIFFERENT: FeatureColumn[] = [
  { title: "Teacher-Powered Approach", description: "Every project is led by someone with real classroom experience.", iconName: "GraduationCap" },
  { title: "Assessment-First Mindset", description: "We build content around outcomes to guarantee mastery.", iconName: "Target" },
  { title: "Consistency at Scale", description: "Rigorous QA processes ensure every module is flawless.", iconName: "Layers" },
  { title: "Expert Network", description: "Access a global pool of specialized subject matter experts.", iconName: "Globe" },
];

export const STATS: StatItem[] = [
  { value: "8 weeks", label: "New program approved", icon: "⏱" },
  { value: "4 educators", label: "Expert team assigned", icon: "👥" },
  { value: "450+", label: "Items endorsed & approved", icon: "✅" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "TeachTeam transformed our curriculum. The assessments are rigorous and truly aligned with our standards.", name: "Dr. Sarah Jenkins", title: "Dean of Academics", institution: "Global University", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
  { id: "t2", quote: "We scaled our online programs twice as fast thanks to their network of incredible educators.", name: "Mark Hamil", title: "Director of eLearning", institution: "TechEd Academy", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" },
  { id: "t3", quote: "The quality of the instructional materials is unparalleled. It feels like they were built by our own faculty.", name: "Elena Rostova", title: "Chief Academic Officer", institution: "European Institute", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" },
];

export const EDUCATORS: Educator[] = [
  { id: "e1", name: "James Carter", title: "STEM Specialist", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=400" },
  { id: "e2", name: "Anita Patel", title: "Assessment Architect", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=400" },
  { id: "e3", name: "David Kim", title: "Curriculum Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=400" },
  { id: "e4", name: "Maria Garcia", title: "ESL Expert", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=400" },
];

export const WHO_WE_SUPPORT_PARTNERS = [
  "Universities & higher education",
  "Language schools & academies",
  "Training & certification providers",
  "Coaches & learning platforms",
  "LMS & EdTech companies"
];

export const WHO_WE_SUPPORT_HELP = [
  "Build new courses and programs from the ground up",
  "Improve the quality and rigor of assessments",
  "Update content and modernize curriculum",
  "Support accreditation and certification requirements",
  "Reduce internal workload for academic teams"
];

export const MARQUEE_TAGS = [
  "Mathematics", "Science", "ESL", "Medical", "Business", "Law", "Computer Science", 
  "History", "Psychology", "Engineering", "Nursing", "Economics", "Literature"
];
