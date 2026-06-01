import type { FC } from 'react';
import { WHO_WE_SUPPORT_PARTNERS, WHO_WE_SUPPORT_HELP } from '../../data/content';
import { ShieldCheck, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { SectionLabel } from '../ui/SectionLabel';
import { motion } from 'framer-motion';
import { staggerContainer, brutalistSlideLeft, brutalistSlideRight, brutalistPop } from '../../utils/animations';

export const WhoWeSupport: FC = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-[#F8F9FA] bg-grid-pattern overflow-hidden border-b-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 relative z-10"
        >
           <motion.div variants={brutalistPop}>
             <SectionLabel center className="mb-6 bg-white border-[1.5px] border-black text-black">Partnerships</SectionLabel>
           </motion.div>
           <motion.h2 variants={brutalistPop} className="text-4xl lg:text-7xl font-dm font-black text-black leading-tight tracking-tight drop-shadow-[3px_3px_0px_rgba(255,209,71,1)]">
             Who We Support & How
           </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 py-8">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={brutalistSlideLeft}
            className="group h-full z-10"
          >
            <div className="h-full transition-transform hover:scale-105 -rotate-2">
              <Card className="h-full p-8 lg:p-12 bg-[#FFD147] border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-12">
                   <div className="h-20 w-20 rounded-xl bg-white border-[2px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black shrink-0">
                     <Building2 className="w-10 h-10" strokeWidth={2.5} />
                   </div>
                   <h3 className="text-4xl lg:text-5xl font-dm font-black text-black leading-none drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">Our Partners</h3>
                </div>
                <ul className="space-y-0 border-t-2 border-black">
                  {WHO_WE_SUPPORT_PARTNERS.map((partner, idx) => (
                    <li key={idx} className="flex items-center gap-5 text-black text-[18px] lg:text-[20px] font-bold py-6 border-b-2 border-black">
                      <div className="w-3 h-3 rounded-none bg-white border-2 border-black shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={brutalistSlideRight}
            className="group h-full z-20"
          >
            <div className="h-full transition-transform hover:scale-105 rotate-1">
              <Card className="h-full p-8 lg:p-12 bg-[#21C57D] border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-12">
                   <div className="h-20 w-20 rounded-xl bg-white border-[2px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black shrink-0">
                     <ShieldCheck className="w-10 h-10" strokeWidth={2.5} />
                   </div>
                   <h3 className="text-4xl lg:text-5xl font-dm font-black text-black leading-none drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">How We Help</h3>
                </div>
                <ul className="space-y-0 border-t-2 border-black">
                  {WHO_WE_SUPPORT_HELP.map((help, idx) => (
                    <li key={idx} className="flex items-start gap-5 text-black text-[18px] lg:text-[20px] font-bold py-6 border-b-2 border-black">
                      <ShieldCheck className="w-8 h-8 text-black fill-white shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{help}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
