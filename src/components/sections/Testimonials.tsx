import { TESTIMONIALS } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-brand-light overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-coral/5 rounded-full blur-[100px] opacity-70" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-violet/5 rounded-full blur-[120px] opacity-70" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6">Testimonials</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo leading-tight tracking-tight mb-6">
            Trusted by educational leaders.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className={`${idx % 2 !== 0 ? 'md:mt-12' : ''}`}>
               <Card className="h-full p-8 lg:p-10 relative">
                 <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-indigo/5" />
                 
                 <p className="text-lg text-brand-indigo font-medium leading-relaxed mb-8 relative z-10">
                   "{testimonial.quote}"
                 </p>
                 
                 <div className="flex items-center gap-4 mt-auto">
                   <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                     <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="font-dm font-bold text-brand-indigo">{testimonial.name}</h4>
                     <p className="text-sm text-gray-500">{testimonial.title}, {testimonial.institution}</p>
                   </div>
                 </div>
               </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
