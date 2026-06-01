import { BUNDLE_CURRICULUM as BUNDLE_PACKAGES } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Check } from 'lucide-react';

export const BundlePackages = () => {
  return (
    <section id="bundles" className="relative py-24 lg:py-40 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6">Packages</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo leading-tight tracking-tight mb-6">
            Simple bundles, endless scale.
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            Start small with a pilot, or scale up to a full curriculum build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {BUNDLE_PACKAGES.map((bundle, idx) => (
            <div key={idx} className={`relative ${bundle.isPopular ? 'lg:-translate-y-4' : ''}`}>
               {bundle.isPopular && (
                 <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                   <span className="bg-brand-coral text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                     Most Popular
                   </span>
                 </div>
               )}
               <Card dark={bundle.isPopular} className="h-full flex flex-col p-8 lg:p-10">
                 <h3 className={`text-2xl font-dm font-bold mb-2 ${bundle.isPopular ? 'text-white' : 'text-brand-indigo'}`}>{bundle.title}</h3>
                 <p className={`text-sm mb-8 font-normal ${bundle.isPopular ? 'text-white/70' : 'text-gray-500'}`}>{bundle.title}</p>
                 
                 <div className="space-y-4 mb-8 flex-grow">
                   {bundle.features.map((feature, fIdx) => (
                     <div key={fIdx} className="flex items-start gap-3">
                       <Check className={`w-5 h-5 shrink-0 mt-0.5 ${bundle.isPopular ? 'text-brand-coral' : 'text-brand-indigo/60'}`} />
                       <span className={`text-sm ${bundle.isPopular ? 'text-white/90' : 'text-gray-700'}`}>{feature}</span>
                     </div>
                   ))}
                 </div>
                 
                 <Button 
                   variant={bundle.isPopular ? 'primary' : 'outline'} 
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
