import { PARTNER_CONTENT } from '../../data/content';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { SectionLabel } from '../ui/SectionLabel';

export const PartnerSection = () => {
  return (
    <section id="about" className="relative py-24 lg:py-40 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative">
             <Card className="p-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative group">
                  <div className="absolute inset-0 bg-brand-indigo/5 mix-blend-overlay z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-300"></div>
                  <img 
                    src={PARTNER_CONTENT.imagePlaceholder} 
                    alt="Educators" 
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 scale-100 group-hover:grayscale-0 group-hover:scale-105" 
                  />
                </div>
             </Card>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-start gap-8">
            <SectionLabel>Our Philosophy</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo leading-[1.2] tracking-tight">
              {PARTNER_CONTENT.heading}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-normal">
              {PARTNER_CONTENT.body}
            </p>
            
            <ul className="space-y-6 mt-4 w-full">
              {PARTNER_CONTENT.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-coral shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-gray-800 font-medium text-lg">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};
