import { PARTNER_CONTENT } from '../../data/content';
import { CheckCircle2 } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';

export const PartnerSection = () => {
  return (
    <section id="about" className="relative py-24 lg:py-40 bg-white bg-grid-pattern border-b-2 border-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative">
             <div className="relative">
                {/* Offset shape background */}
                <div className="absolute inset-0 bg-[#FFD147] rounded-2xl border-[1.5px] border-black translate-x-6 translate-y-6"></div>
                <div className="aspect-[4/3] rounded-2xl border-[1.5px] border-black overflow-hidden relative z-10 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                  <img 
                    src={PARTNER_CONTENT.imagePlaceholder} 
                    alt="Educators" 
                    className="w-full h-full object-cover" 
                  />
                </div>
             </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-start gap-8 relative">
            {/* Decorative SVG Star */}
            <div className="absolute -top-16 -right-12 text-[#FFD147] -z-10 rotate-12 opacity-80">
              <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <path d="M50 0 L55 35 L90 20 L65 50 L90 80 L55 65 L50 100 L45 65 L10 80 L35 50 L10 20 L45 35 Z" fill="currentColor" stroke="black" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            
            <SectionLabel>Our Philosophy</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-dm font-bold text-black leading-[1.1] tracking-tight">
              {PARTNER_CONTENT.heading}
            </h2>
            <p className="text-[17px] text-gray-700 leading-[1.6] font-medium">
              {PARTNER_CONTENT.body}
            </p>
            
            <ul className="space-y-6 mt-4 w-full">
              {PARTNER_CONTENT.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-black fill-[#21C57D] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-black font-bold text-lg">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};
