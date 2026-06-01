import { useState } from 'react';
import { BUNDLE_CURRICULUM as BUNDLE_PACKAGES } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, brutalistPop, brutalistSpinIn } from '../../utils/animations';
import { BundleLeadModal } from '../ui/BundleLeadModal';
import type { BundlePackage } from '../../types';

export const BundlePackages = () => {
  const [selectedBundle, setSelectedBundle] = useState<BundlePackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = (bundle: BundlePackage) => {
    setSelectedBundle(bundle);
    setIsModalOpen(true);
  };

  return (
    <section id="bundles" className="relative py-24 lg:py-40 bg-[#F8F9FA] bg-grid-pattern border-b-2 border-black overflow-hidden">
      
      {/* Warning Tape Divider */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-warning-tape border-b-[1.5px] border-black"></div>

      {/* Decorative Pill Shape */}
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute bottom-20 -right-20 text-[#21C57D] -z-0 opacity-80 rotate-45"
      >
        <svg width="200" height="100" viewBox="0 0 200 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <rect x="10" y="10" width="180" height="80" rx="40" fill="currentColor" stroke="black" strokeWidth="6" />
        </svg>
      </motion.div>

      {/* Decorative Zigzag */}
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute top-1/3 -left-10 text-[#FFD147] -z-0 opacity-90 -rotate-12 hidden lg:block"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          <polyline points="10,50 30,20 50,80 70,20 90,50" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
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
            <SectionLabel center className="mb-6">Packages</SectionLabel>
          </motion.div>
          <motion.h2 variants={brutalistPop} className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight mb-6">
            Simple bundles, endless scale.
          </motion.h2>
          <motion.p variants={brutalistPop} className="text-[17px] text-gray-700 font-medium leading-[1.6]">
            Start small with a pilot, or scale up to a full curriculum build.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 items-start pt-8"
        >
          {BUNDLE_PACKAGES.map((bundle, idx) => {
            const rotations = ['rotate-1', '-rotate-1', 'rotate-2'];
            const rotationClass = bundle.isPopular ? '' : rotations[idx % rotations.length];
            return (
              <motion.div 
                variants={brutalistPop}
                key={idx} 
                className={`relative h-full ${bundle.isPopular ? 'lg:-translate-y-4 z-20' : 'z-10'}`}
              >
                <div className={`h-full ${bundle.isPopular ? '' : `transition-transform hover:scale-105 ${rotationClass}`}`}>
                 {bundle.isPopular && (
                   <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
                     <span className="bg-[#21C57D] text-black border-[1.5px] border-black text-[12px] font-bold uppercase tracking-[0.1em] py-2 px-6 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                       Most Popular
                     </span>
                   </div>
                 )}
                 <Card dark={bundle.isPopular} className="h-full flex flex-col p-8 lg:p-10 relative overflow-hidden">
                   
                   {/* Massive Decorative Number */}
                   <div className="absolute -top-4 -right-2 text-[120px] font-dm font-bold text-gray-100 opacity-50 select-none z-0 leading-none">
                     0{idx + 1}
                   </div>

                   <div className="relative z-10 flex flex-col h-full">
                     <h3 className={`text-3xl font-dm font-bold mb-8 text-black pr-8`}>{bundle.title}</h3>
                     
                     <div className="space-y-4 mb-8 flex-grow">
                       {bundle.features.map((feature, fIdx) => (
                         <div key={fIdx} className="flex items-start gap-3">
                           <Check className="w-5 h-5 shrink-0 mt-0.5 text-black font-bold" strokeWidth={3} />
                           <span className="text-[15px] font-medium text-black">{feature}</span>
                         </div>
                       ))}
                     </div>
                     
                     <Button 
                       variant={bundle.isPopular ? 'primary' : 'outline'} 
                       className="w-full justify-center cursor-pointer"
                       onClick={() => handleGetStarted(bundle)}
                     >
                       Get Started
                     </Button>
                   </div>
                 </Card>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      <BundleLeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bundle={selectedBundle}
      />
    </section>
  );
};
