import type { FC } from 'react';
import { WHO_WE_SUPPORT_PARTNERS, WHO_WE_SUPPORT_HELP } from '../../data/content';
import { ShieldCheck, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { SectionLabel } from '../ui/SectionLabel';

export const WhoWeSupport: FC = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
           <SectionLabel center className="mb-6">Partnerships</SectionLabel>
           <h2 className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo leading-tight tracking-tight">
             Who We Support & How
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="group h-full">
            <Card className="h-full">
              <div className="flex items-center gap-5 mb-10">
                 <div className="h-14 w-14 rounded-2xl bg-brand-indigo/5 flex items-center justify-center text-brand-indigo transition-transform duration-300 group-hover:scale-110">
                   <Building2 className="w-7 h-7" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl font-dm font-bold text-brand-indigo">Our Partners</h3>
              </div>
              <ul className="space-y-6">
                {WHO_WE_SUPPORT_PARTNERS.map((partner, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-700 text-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-coral shrink-0" />
                    <span className="font-normal">{partner}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="group h-full">
            <Card className="h-full">
              <div className="flex items-center gap-5 mb-10">
                 <div className="h-14 w-14 rounded-2xl bg-brand-coral/10 flex items-center justify-center text-brand-coral transition-transform duration-300 group-hover:scale-110">
                   <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-2xl font-dm font-bold text-brand-indigo">How We Help</h3>
              </div>
              <ul className="space-y-6">
                {WHO_WE_SUPPORT_HELP.map((help, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-700 text-lg">
                    <ShieldCheck className="w-6 h-6 text-brand-coral shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="font-normal">{help}</span>
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
