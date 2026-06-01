import type { FC } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { EDUCATORS } from '../../data/content';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { staggerContainer, brutalistPop, brutalistSpinIn } from '../../utils/animations';

export const TeamSection: FC = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-[#21C57D] bg-polka-dots border-b-2 border-black overflow-hidden">
      {/* Decorative Shapes */}
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute top-40 -left-10 text-[#FFD147] -z-0 opacity-100 rotate-12 hidden lg:block"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <polygon points="50,15 90,85 10,85" fill="currentColor" stroke="black" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute bottom-20 -right-16 text-white -z-0 opacity-100 -rotate-12 hidden lg:block"
      >
        <svg width="180" height="180" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <path d="M 20 50 Q 50 10 80 50 T 20 50" fill="currentColor" stroke="black" strokeWidth="2" />
        </svg>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={brutalistPop}>
            <SectionLabel center className="mb-6 bg-white border-[1.5px] border-black text-black">Our Experts</SectionLabel>
          </motion.div>
          <motion.h2 variants={brutalistPop} className="text-4xl lg:text-7xl font-dm font-black text-white leading-tight tracking-tight drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '2px black' }}>
            Meet the Educators Ready <br className="hidden sm:block" /> to Build With You
          </motion.h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 items-start"
        >
          {EDUCATORS.map((educator, idx) => {
            const rotations = ['rotate-2', '-rotate-3', 'rotate-1', '-rotate-2'];
            const bgColors = ['bg-[#FFD147]', 'bg-white', 'bg-[#F8F9FA]', 'bg-[#FFD147]'];
            const staggerClass = idx % 2 !== 0 ? 'lg:translate-y-12' : '';
            return (
              <motion.div 
                variants={brutalistPop}
                key={educator.id} 
                className={staggerClass}
              >
                <div className={`group h-full ${rotations[idx % rotations.length]}`}>
                   <Card className="h-full p-4 bg-white flex flex-col items-center">
                     <div className={`aspect-[3/4] w-full overflow-hidden rounded-xl mb-6 border-[2px] border-black ${bgColors[idx % bgColors.length]}`}>
                       <img src={educator.image} alt={educator.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 mix-blend-multiply grayscale group-hover:grayscale-0" />
                     </div>
                     <div className="text-center pb-2 mt-auto">
                       <h3 className="font-dm font-black text-black text-2xl mb-1">{educator.name}</h3>
                       <p className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">{educator.title}</p>
                     </div>
                   </Card>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={brutalistPop}
          className="flex justify-center mt-20"
        >
          <Badge className="px-8 py-3 border-[2px] border-black text-black bg-[#FFD147] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[14px] lg:text-[16px] -rotate-1 hover:rotate-1 transition-transform cursor-default">
            SERVING INSTITUTIONS ACROSS 30+ COUNTRIES WORLDWIDE
          </Badge>
        </motion.div>

      </div>
    </section>
  );
};
