import type { FC } from 'react';
import { WHO_WE_SUPPORT_PARTNERS, WHO_WE_SUPPORT_HELP } from '../../data/content';
import { ShieldCheck, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { SectionLabel } from '../ui/SectionLabel';

export const WhoWeSupport: FC = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-[#F8F9FA] overflow-hidden border-b-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
           <SectionLabel center className="mb-6">Partnerships</SectionLabel>
           <h2 className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight">
             Who We Support & How
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="group h-full">
            <Card className="h-full p-8 lg:p-12">
              <div className="flex items-center gap-5 mb-10">
                 <div className="h-16 w-16 rounded-2xl bg-[#FFD147] border-[1.5px] border-black shadow-[2px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black">
                   <Building2 className="w-8 h-8" strokeWidth={2} />
                 </div>
                 <h3 className="text-3xl font-dm font-bold text-black">Our Partners</h3>
              </div>
              <ul className="space-y-6">
                {WHO_WE_SUPPORT_PARTNERS.map((partner, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-800 text-[17px]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#21C57D] border border-black shrink-0" />
                    <span className="font-bold">{partner}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="group h-full">
            <Card className="h-full p-8 lg:p-12">
              <div className="flex items-center gap-5 mb-10">
                 <div className="h-16 w-16 rounded-2xl bg-[#21C57D] border-[1.5px] border-black shadow-[2px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black">
                   <ShieldCheck className="w-8 h-8" strokeWidth={2} />
                 </div>
                 <h3 className="text-3xl font-dm font-bold text-black">How We Help</h3>
              </div>
              <ul className="space-y-6">
                {WHO_WE_SUPPORT_HELP.map((help, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-800 text-[17px]">
                    <ShieldCheck className="w-6 h-6 text-black fill-[#FFD147] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="font-bold">{help}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};
