import { BUNDLE_CURRICULUM as BUNDLE_PACKAGES } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Check } from 'lucide-react';

export const BundlePackages = () => {
  return (
    <section id="bundles" className="relative py-24 lg:py-40 bg-white border-b-2 border-black overflow-hidden">
      
      {/* Warning Tape Divider */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-warning-tape border-b-[1.5px] border-black"></div>

      {/* Decorative Pill Shape */}
      <div className="absolute bottom-20 -right-20 text-[#21C57D] -z-0 opacity-80 rotate-45">
        <svg width="200" height="100" viewBox="0 0 200 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <rect x="10" y="10" width="180" height="80" rx="40" fill="currentColor" stroke="black" strokeWidth="6" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6">Packages</SectionLabel>
          <h2 className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight mb-6">
            Simple bundles, endless scale.
          </h2>
          <p className="text-[17px] text-gray-700 font-medium leading-[1.6]">
            Start small with a pilot, or scale up to a full curriculum build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start pt-8">
          {BUNDLE_PACKAGES.map((bundle, idx) => (
            <div key={idx} className={`relative ${bundle.isPopular ? 'lg:-translate-y-8' : ''}`}>
               {bundle.isPopular && (
                 <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
                   <span className="bg-[#21C57D] text-black border-[1.5px] border-black text-[12px] font-bold uppercase tracking-[0.1em] py-2 px-6 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                     Most Popular
                   </span>
                 </div>
               )}
               <Card dark={bundle.isPopular} className="h-full flex flex-col p-8 lg:p-10">
                 <h3 className={`text-3xl font-dm font-bold mb-2 text-black`}>{bundle.title}</h3>
                 <p className={`text-[15px] mb-8 font-medium ${bundle.isPopular ? 'text-gray-800' : 'text-gray-600'}`}>{bundle.title}</p>
                 
                 <div className="space-y-4 mb-8 flex-grow">
                   {bundle.features.map((feature, fIdx) => (
                     <div key={fIdx} className="flex items-start gap-3">
                       <Check className="w-5 h-5 shrink-0 mt-0.5 text-black font-bold" strokeWidth={3} />
                       <span className="text-[15px] font-medium text-black">{feature}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Button 
                   variant={bundle.isPopular ? 'outline' : 'outline'} 
                   className="w-full justify-center"
                 >
                   Get Started
                 </Button>
               </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
