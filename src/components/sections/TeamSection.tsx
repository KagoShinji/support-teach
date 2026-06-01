import type { FC } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { EDUCATORS } from '../../data/content';
import { Badge } from '../ui/Badge';

export const TeamSection: FC = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6">Our Experts</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo leading-tight tracking-tight">
            Meet the Educators Ready <br className="hidden sm:block" /> to Build With You
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {EDUCATORS.map((educator) => (
            <div key={educator.id} className="group glass-card p-4 transition-transform duration-300 hover:-translate-y-2">
                 <div className="aspect-[3/4] w-full overflow-hidden rounded-xl mb-6 bg-gray-100">
                   <img src={educator.image} alt={educator.name} className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100" />
                 </div>
                 <div className="text-center pb-2">
                   <h3 className="font-dm font-bold text-brand-indigo text-lg mb-1">{educator.name}</h3>
                   <p className="text-sm text-gray-500">{educator.title}</p>
                 </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Badge className="px-4 py-2 border-brand-indigo/10 text-brand-indigo bg-white/50 backdrop-blur-sm">Serving institutions across 30+ countries worldwide</Badge>
        </div>

      </div>
    </section>
  );
};
