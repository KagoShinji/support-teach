import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { WHAT_WE_DELIVER } from '../../data/content';
import * as Icons from 'lucide-react';
import { Card } from '../ui/Card';

export const WhatWeDeliver = () => {
  return (
    <section id="services" className="relative py-24 lg:py-40 bg-[#F8F9FA] bg-polka-dots border-b-2 border-black overflow-hidden">
      
      {/* Decorative Squiggle SVG */}
      <div className="absolute top-1/4 -left-20 text-[#21C57D] -z-0 opacity-90 -rotate-12">
        <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          <path d="M10 50 Q25 20 40 50 T70 50 T90 50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6 bg-white border-[1.5px] border-black text-black">What We Deliver</SectionLabel>
          <h2 className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight mb-6">
            Everything you need to <br className="hidden sm:block" /> build modern learning.
          </h2>
          <p className="text-[17px] text-gray-700 font-medium leading-[1.6]">
            From initial structure to final video edits, our team of expert educators delivers end-to-end academic content creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHAT_WE_DELIVER.map((service, idx) => {
            const IconComponent = Icons[service.iconName as keyof typeof Icons] as React.ElementType;
            const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];
            const rotationClass = rotations[idx % rotations.length];
            return (
              <div key={service.id} className={`h-full transition-transform hover:scale-105 ${rotationClass}`}>
                <Card className="flex flex-col items-start p-8 bg-white">
                  <div className="h-12 w-12 rounded-xl border-[1.5px] border-black bg-[#FFD147] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black flex items-center justify-center mb-8">
                    {IconComponent && <IconComponent className="w-6 h-6" strokeWidth={2} />}
                  </div>
                  <h3 className="text-2xl font-dm font-bold text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-medium mt-auto">
                    {service.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
