import { WHAT_MAKES_US_DIFFERENT } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';

export const WhatMakesDifferent = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-[#FFD147] border-b-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
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
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {WHAT_MAKES_US_DIFFERENT.map((item, idx) => (
                  <Card key={idx} className="p-8">
                    <div className="text-5xl font-dm font-extrabold text-gray-200 mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] stroke-black outline-black">
                      0{idx + 1}
                    </div>
                    <h3 className="text-2xl font-dm font-bold text-black mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </Card>
               ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};
