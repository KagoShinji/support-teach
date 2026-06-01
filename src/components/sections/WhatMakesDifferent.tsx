import { WHAT_MAKES_US_DIFFERENT } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';

export const WhatMakesDifferent = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-[#FFD147] bg-diagonal-stripes border-b-2 border-black overflow-hidden">
      
      {/* Decorative Circle */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full border-[8px] border-black opacity-10 pointer-events-none -z-0"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col items-start justify-center">
             <SectionLabel className="mb-6 bg-white border-[1.5px] border-black text-black">The Difference</SectionLabel>
             <h2 className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight mb-8">
               We don't just write. <br /> We teach.
             </h2>
             <p className="text-[17px] text-gray-900 font-medium leading-relaxed">
               Most agencies hire generalist copywriters. We exclusively staff current and former educators who understand pedagogy, standards, and student engagement from the inside out.
             </p>
          </div>

          <div className="lg:col-span-7">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
               {WHAT_MAKES_US_DIFFERENT.map((item, idx) => {
                 const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'];
                 const bgColors = ['bg-[#F8F9FA]', 'bg-white', 'bg-[#21C57D]', 'bg-white'];
                 const staggerClass = idx % 2 !== 0 ? 'sm:translate-y-8' : '';
                 return (
                    <div key={idx} className={`transition-transform hover:scale-105 ${rotations[idx % rotations.length]} ${staggerClass}`}>
                      <Card className={`p-8 relative overflow-hidden h-full flex flex-col justify-start ${bgColors[idx % bgColors.length]}`}>
                        <div className="absolute -top-6 -right-4 text-[140px] font-dm font-bold text-gray-100 opacity-20 select-none z-0 leading-none">
                          0{idx + 1}
                        </div>
                        <div className="relative z-10">
                          <div className="text-6xl font-dm font-extrabold text-white mb-6 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '2px black' }}>
                            0{idx + 1}
                          </div>
                          <h3 className="text-2xl font-dm font-bold text-black mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-900 font-medium leading-relaxed text-[15px]">
                            {item.description}
                          </p>
                        </div>
                      </Card>
                    </div>
                 );
               })}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};
