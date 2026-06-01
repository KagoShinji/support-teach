import type { FC } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Mail, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';

export const ContactForm: FC = () => {
  return (
    <section id="contact" className="relative py-24 lg:py-40 bg-[#FFD147] overflow-hidden border-b-2 border-black">
      
      {/* Decorative Geometric Shapes */}
      <div className="absolute top-20 left-10 text-white -z-0 opacity-100 rotate-12 hidden lg:block">
        <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <polygon points="50,10 90,90 10,90" fill="currentColor" stroke="black" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-1/3 text-[#21C57D] -z-0 opacity-100 -rotate-12 hidden lg:block">
        <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <circle cx="50" cy="50" r="40" fill="currentColor" stroke="black" strokeWidth="4" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <SectionLabel className="mb-6 bg-white border-[1.5px] border-black text-black">Submit Touch</SectionLabel>
            <h2 className="text-4xl lg:text-6xl font-dm font-bold text-black leading-tight tracking-tight mb-6">
              Submit a Request
            </h2>
            <p className="text-gray-900 text-[17px] font-bold leading-relaxed mb-12 max-w-md">
              Tell us a bit about your project or content needs, and our team will get back to you with a tailored plan.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-black">Organization Name</label>
                <input type="text" className="w-full bg-white border-[1.5px] border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 font-medium" placeholder="E.g. Global University" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-black">Service Needed</label>
                  <select className="w-full bg-white border-[1.5px] border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all appearance-none font-medium" defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option value="assessment">Assessment Development</option>
                    <option value="curriculum">Curriculum Structuring</option>
                    <option value="instructional">Instructional Materials</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-black">Location</label>
                  <input type="text" className="w-full bg-white border-[1.5px] border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-500 font-medium" placeholder="City, Country" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] font-bold text-black">Tell us about your project</label>
                <textarea rows={4} className="w-full bg-white border-[1.5px] border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all resize-none placeholder-gray-500 font-medium" placeholder="What are you trying to achieve?"></textarea>
              </div>

              <div className="pt-4">
                 <Button variant="primary" showIcon className="w-full sm:w-auto">Submit Request</Button>
              </div>
            </form>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md relative group">
              <Card className="w-full p-10 bg-white border-[1.5px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                 
                 <div className="relative z-10 flex flex-col gap-10">
                   <div>
                     <div className="h-14 w-14 rounded-xl bg-[#21C57D] border-[1.5px] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black mb-6">
                       <MessageSquare className="w-7 h-7" strokeWidth={2} />
                     </div>
                     <h3 className="text-2xl font-dm font-bold text-black mb-2">Prefer to talk directly?</h3>
                     <p className="text-gray-700 font-medium text-[15px]">Skip the form and jump straight on a call with our academic team.</p>
                     <Button variant="ghost" className="mt-4 px-0 hover:bg-transparent text-black group/link border-none shadow-none font-bold underline underline-offset-4 decoration-2 decoration-black">
                       Book a Call 
                       <span className="ml-2 transition-transform group-hover/link:translate-x-1">→</span>
                     </Button>
                   </div>

                   <div className="h-[2px] w-full bg-black/10" />

                   <div>
                     <div className="h-14 w-14 rounded-xl bg-[#FFD147] border-[1.5px] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black mb-6">
                       <Mail className="w-7 h-7" strokeWidth={2} />
                     </div>
                     <h3 className="text-2xl font-dm font-bold text-black mb-2">General inquiries</h3>
                     <p className="text-gray-700 font-bold text-[15px] mb-1">hello@teachteam.com</p>
                     <p className="text-gray-700 font-bold text-[15px]">1-800-TEACH-TM</p>
                   </div>
                 </div>

              </Card>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
