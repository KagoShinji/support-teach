import type { FC } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { EDUCATORS } from '../../data/content';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export const TeamSection: FC = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-[#21C57D] bg-polka-dots border-b-2 border-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6 bg-white border-[1.5px] border-black text-black">Our Experts</SectionLabel>
          <h2 className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight">
            Meet the Educators Ready <br className="hidden sm:block" /> to Build With You
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {EDUCATORS.map((educator, idx) => {
            const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'];
            const bgColors = ['bg-[#FFD147]', 'bg-white', 'bg-[#F8F9FA]', 'bg-[#FFD147]'];
            return (
              <div key={educator.id} className={`group ${rotations[idx % rotations.length]}`}>
                   <Card className="p-4 bg-white flex flex-col items-center">
                     <div className={`aspect-[3/4] w-full overflow-hidden rounded-xl mb-6 border-[1.5px] border-black ${bgColors[idx % bgColors.length]}`}>
                       <img src={educator.image} alt={educator.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                     </div>
                     <div className="text-center pb-2">
                       <h3 className="font-dm font-bold text-black text-xl mb-1">{educator.name}</h3>
                       <p className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">{educator.title}</p>
                     </div>
                   </Card>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Badge className="px-6 py-2 border-[1.5px] border-black text-black bg-[#FFD147] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[13px]">Serving institutions across 30+ countries worldwide</Badge>
        </div>

      </div>
    </section>
  );
};
