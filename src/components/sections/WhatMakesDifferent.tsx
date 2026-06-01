import { WHAT_MAKES_US_DIFFERENT } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';

export const WhatMakesDifferent = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col items-start justify-center">
             <SectionLabel className="mb-6">The Difference</SectionLabel>
             <h2 className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo leading-tight tracking-tight mb-8">
               We don't just write. <br /> We teach.
             </h2>
             <p className="text-lg text-gray-600 font-normal leading-relaxed">
               Most agencies hire generalist copywriters. We exclusively staff current and former educators who understand pedagogy, standards, and student engagement from the inside out.
             </p>
          </div>

          <div className="lg:col-span-7">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {WHAT_MAKES_US_DIFFERENT.map((item, idx) => (
                  <Card key={idx} className="p-8">
                    <div className="text-4xl font-dm font-bold text-brand-coral/20 mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xl font-dm font-bold text-brand-indigo mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-normal leading-relaxed text-sm">
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
