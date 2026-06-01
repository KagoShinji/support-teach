import { STATS } from '../../data/content';
import { motion } from 'framer-motion';
import { staggerContainer, brutalistPop } from '../../utils/animations';

export const SocialProof = () => {
  return (
    <section className="relative py-24 bg-white bg-diagonal-stripes border-b-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {STATS.map((stat, idx) => {
            const parts = stat.value.split(' ');
            return (
              <motion.div 
                variants={brutalistPop}
                key={idx} 
                className="flex flex-col items-center justify-center text-center group cursor-default"
              >
                <div 
                  className="text-6xl lg:text-[90px] leading-[0.9] font-dm font-black text-white mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105"
                  style={{ 
                    WebkitTextStroke: '3px black', 
                    filter: 'drop-shadow(6px 6px 0px rgba(33,197,125,1))' 
                  }}
                >
                  {parts.map((part, i) => (
                    <span key={i} className="block">{part}</span>
                  ))}
                </div>
                <div className="text-[14px] lg:text-[15px] font-black text-black uppercase tracking-[0.1em] px-4 py-2 bg-[#FFD147] border-[1.5px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -rotate-2 max-w-[200px]">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
