import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { WHAT_WE_DELIVER } from '../../data/content';
import * as Icons from 'lucide-react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { staggerContainer, brutalistPop, brutalistSpinIn } from '../../utils/animations';

export const WhatWeDeliver = () => {
  return (
    <section id="services" className="relative py-24 lg:py-40 bg-[#F8F9FA] bg-polka-dots border-b-2 border-black overflow-hidden">
      
      {/* Decorative Squiggle SVG */}
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute top-1/4 -left-20 text-[#21C57D] -z-0 opacity-90 -rotate-12"
      >
        <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          <path d="M10 50 Q25 20 40 50 T70 50 T90 50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24"
        >
          <motion.div variants={brutalistPop}>
            <SectionLabel center className="mb-6 bg-white border-[2px] border-black text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">What We Deliver</SectionLabel>
          </motion.div>
          <motion.h2 variants={brutalistPop} className="text-4xl lg:text-7xl font-dm font-black text-black leading-tight tracking-tight mb-8 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
            Everything you need to <br className="hidden lg:block" /> build modern learning.
          </motion.h2>
          
          {/* Brutalist Text Box for Readability */}
          <motion.div variants={brutalistPop} className="inline-block bg-white border-[3px] border-black px-6 lg:px-8 py-4 lg:py-5 shadow-[6px_6px_0px_rgba(255,209,71,1)] -rotate-1">
            <p className="text-[17px] lg:text-[20px] text-black font-bold leading-relaxed max-w-2xl text-left lg:text-center">
              From initial structure to final video edits, our team of expert educators delivers end-to-end academic content creation.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {WHAT_WE_DELIVER.map((service, idx) => {
            const IconComponent = Icons[service.iconName as keyof typeof Icons] as React.ElementType;
            const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];
            const rotationClass = rotations[idx % rotations.length];
            return (
              <motion.div 
                variants={brutalistPop}
                key={service.id} 
                className="h-full"
              >
                <div className={`h-full transition-transform hover:scale-105 ${rotationClass}`}>
                  <Card className="flex flex-col items-start p-8 lg:p-10 bg-white border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] h-full">
                    <div className="h-16 w-16 rounded-xl border-[2px] border-black bg-[#21C57D] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black flex items-center justify-center mb-8 -rotate-2">
                      {IconComponent && <IconComponent className="w-8 h-8" strokeWidth={2.5} />}
                    </div>
                    <h3 className="text-3xl font-dm font-black text-black mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-900 leading-relaxed font-bold text-[16px] mt-auto">
                      {service.description}
                    </p>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
