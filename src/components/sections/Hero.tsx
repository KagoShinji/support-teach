import { useState } from 'react';
import { HERO_CONTENT, STATS } from '../../data/content';
import { Star, Link as LinkIcon, Code, Monitor, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, brutalistPop, brutalistSpinIn } from '../../utils/animations';
import { RequestModal } from '../ui/RequestModal';

export const Hero = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  return (
    <section className="relative min-h-[100dvh] bg-[#F8F9FA] bg-grid-pattern overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-24">
      {/* Decorative Star Background */}
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        animate="show"
        className="absolute top-40 left-10 text-[#FFD147] -z-0 opacity-80 -rotate-12 hidden lg:block"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <path d="M50 0 L55 35 L90 20 L65 50 L90 80 L55 65 L50 100 L45 65 L10 80 L35 50 L10 20 L45 35 Z" fill="currentColor" stroke="black" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-8 mt-10"
          >
            <motion.div variants={brutalistPop}>
               <h1 className="text-6xl md:text-7xl lg:text-[84px] font-dm font-extrabold text-black leading-[1.05] tracking-[-0.03em]">
                 Learning <br />
                 Content and <br />
                 Assessments
               </h1>
            </motion.div>
            
            {/* Decorative Dots */}
            <motion.div variants={brutalistPop} className="flex items-center gap-2">
              <div className="h-4 w-12 bg-black rounded-full"></div>
              <div className="h-4 w-4 bg-[#21C57D]/40 rounded-full"></div>
              <div className="h-4 w-4 bg-[#21C57D] rounded-full"></div>
            </motion.div>

            <motion.p variants={brutalistPop} className="text-[17px] md:text-[19px] text-gray-700 max-w-md font-medium leading-[1.6]">
              {HERO_CONTENT.subheadline}
            </motion.p>
            
            <motion.div variants={brutalistPop}>
               <button 
                 onClick={() => setIsRequestModalOpen(true)}
                 className="bg-[#21C57D] text-black text-[17px] font-bold px-8 py-3 rounded-full border-[1.5px] border-black shadow-[3px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[2px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:shadow-none transition-all"
               >
                 {HERO_CONTENT.primaryCTA}
               </button>
            </motion.div>

            {/* Bottom Left Stats */}
            <motion.div variants={brutalistPop} className="mt-12 flex items-center gap-12">
              <div>
                <h3 className="text-4xl font-extrabold text-black font-dm">{STATS[0].value}</h3>
                <p className="text-gray-500 font-medium text-sm mt-1">{STATS[0].label}</p>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-black font-dm">{STATS[2].value}</h3>
                <p className="text-gray-500 font-medium text-sm mt-1">{STATS[2].label}</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Hero Image & Blobs */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="relative w-full h-[600px] lg:h-[750px]"
          >
            
            {/* Background Blobs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 mt-12 lg:mt-16">
              
              {/* Green Blob (Back) */}
              <motion.div 
                animate={{ rotate: [0, 5, 0], scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute w-[75%] h-[80%] bg-[#21C57D] translate-x-12 translate-y-8"
                style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
              ></motion.div>

              {/* Yellow Blob (Front with black drop shadow) */}
              <motion.div 
                animate={{ rotate: [0, -5, 0], scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                className="absolute w-[80%] h-[85%] bg-[#FFD147] -translate-x-6 -translate-y-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                style={{ borderRadius: '60% 40% 50% 50% / 50% 50% 50% 50%' }}
              ></motion.div>
            </div>

            {/* Main Character Image */}
            <div className="absolute inset-x-0 bottom-0 lg:bottom-[2%] flex items-end justify-center z-10 pointer-events-none h-[110%] lg:h-[115%]">
              <img src="/hero-image.png" alt="Hero" className="h-full w-auto object-contain object-bottom" />
            </div>

            {/* Floating Elements */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="absolute right-0 lg:right-[-2%] top-[18%] flex flex-col gap-3 z-20 items-end"
            >
              <motion.div variants={brutalistPop} className="bg-[#FFD147] px-5 py-2.5 rounded-full border-[1.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black font-bold text-[14px] whitespace-nowrap">
                Assessment Design
              </motion.div>
              <motion.div variants={brutalistPop} className="bg-white px-5 py-2.5 rounded-full border-[1.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black font-semibold text-[14px] whitespace-nowrap">
                Curriculum Structure
              </motion.div>
              <motion.div variants={brutalistPop} className="bg-white px-5 py-2.5 rounded-full border-[1.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black font-semibold text-[14px] whitespace-nowrap">
                Instructional Materials
              </motion.div>
              <motion.div variants={brutalistPop} className="bg-white px-5 py-2.5 rounded-full border-[1.5px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black font-semibold text-[14px] whitespace-nowrap">
                Academic Review
              </motion.div>
            </motion.div>

            {/* Floating Card */}
            <motion.div 
              variants={brutalistPop}
              initial="hidden"
              animate="show"
              className="absolute right-[-10%] lg:right-[-8%] bottom-[22%] bg-white p-4 rounded-xl border-[1.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 flex gap-4 items-start max-w-[260px]"
            >
              <div className="bg-[#FFD147] p-2 rounded-full border-[1.5px] border-black shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] mt-1">
                <Star className="w-4 h-4 text-black fill-black" />
              </div>
              <div>
                <h4 className="font-bold text-black text-[15px] mb-1 leading-tight">Accreditation Ready</h4>
                <p className="text-gray-500 text-[11.5px] leading-relaxed">
                  Rigorous content built to meet standard alignment and strict quality controls.
                </p>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* Bottom Section (Video Card & Icons) */}
        <motion.div 
          variants={brutalistPop}
          initial="hidden"
          animate="show"
          className="mt-16 flex flex-col md:flex-row items-center gap-12 max-w-[1000px]"
        >
          {/* Video / Image Card */}
          <div className="relative w-full md:w-[400px] h-[200px] rounded-[100px] overflow-hidden border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-white ml-1"></div>
              </div>
            </div>
          </div>
          
          {/* Text & Icons */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold font-dm text-black max-w-sm mb-6 leading-tight">
              We have {STATS[2].value} items endorsed by educators this year
            </h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer bg-white">
                <LinkIcon className="w-4 h-4 text-black" />
              </div>
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer bg-white">
                <Code className="w-4 h-4 text-black" />
              </div>
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer bg-white">
                <Monitor className="w-4 h-4 text-black" />
              </div>
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer bg-white">
                <BookOpen className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      <RequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </section>
  );
};

