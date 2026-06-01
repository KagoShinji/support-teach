import { TESTIMONIALS } from '../../data/content';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="relative py-24 lg:py-40 bg-[#F8F9FA] bg-grid-pattern overflow-hidden border-b-2 border-black">
      
      {/* Decorative Blob */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#21C57D] border-[1.5px] border-black opacity-80 -z-0" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionLabel center className="mb-6">Testimonials</SectionLabel>
          <h2 className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight mb-6">
            Trusted by educational leaders.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className={`${idx % 2 !== 0 ? 'md:mt-16' : ''}`}>
               <Card className="h-full p-8 lg:p-12 relative bg-white">
                 <Quote className="absolute top-8 right-8 w-12 h-12 text-[#FFD147]" fill="#FFD147" />
                 
                 <p className="text-[17px] text-black font-medium leading-relaxed mb-10 relative z-10 pt-4">
                   "{testimonial.quote}"
                 </p>
                 
                 <div className="flex items-center gap-5 mt-auto">
                   <div className="w-14 h-14 rounded-full overflow-hidden border-[1.5px] border-black bg-gray-200 shrink-0">
                     <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="font-dm font-bold text-black text-[16px]">{testimonial.name}</h4>
                     <p className="text-[13px] text-gray-600 font-medium">{testimonial.title}, {testimonial.institution}</p>
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
