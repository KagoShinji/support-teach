import type { FC } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Mail, MessageSquare } from 'lucide-react';

export const ContactForm: FC = () => {
  return (
    <section id="contact" className="relative py-24 lg:py-40 bg-brand-indigo overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      {/* Soft orb background */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-coral/10 rounded-full blur-[100px] opacity-80" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <SectionLabel className="mb-6">Submit Touch</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-dm font-bold text-white leading-tight tracking-tight mb-6">
              Submit a Request
            </h2>
            <p className="text-white/60 text-lg font-normal leading-relaxed mb-12 max-w-md">
              Tell us a bit about your project or content needs, and our team will get back to you with a tailored plan.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Organization Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-coral/50 transition-all placeholder-white/20" placeholder="E.g. Global University" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Service Needed</label>
                  <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/50 focus:text-white focus:outline-none focus:ring-1 focus:ring-brand-coral/50 transition-all appearance-none" defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option value="assessment">Assessment Development</option>
                    <option value="curriculum">Curriculum Structuring</option>
                    <option value="instructional">Instructional Materials</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Location</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-coral/50 transition-all placeholder-white/20" placeholder="City, Country" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Tell us about your project</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-coral/50 transition-all resize-none placeholder-white/20" placeholder="What are you trying to achieve?"></textarea>
              </div>

              <div className="pt-4">
                 <Button variant="primary" showIcon className="w-full sm:w-auto">Submit Request</Button>
              </div>
            </form>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md relative group">
              <div className="glass-card-dark w-full p-10 relative overflow-hidden">
                 
                 <div className="relative z-10 flex flex-col gap-10">
                   <div>
                     <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 backdrop-blur-md">
                       <MessageSquare className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-dm font-bold text-white mb-2">Prefer to talk directly?</h3>
                     <p className="text-white/60 font-normal text-sm">Skip the form and jump straight on a call with our academic team.</p>
                     <Button variant="ghost" className="mt-4 px-0 hover:bg-transparent text-brand-coral group/link border-none shadow-none font-bold">
                       Book a Call 
                       <span className="ml-2 transition-transform group-hover/link:translate-x-1">→</span>
                     </Button>
                   </div>

                   <div className="h-px w-full bg-white/10" />

                   <div>
                     <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 backdrop-blur-md">
                       <Mail className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-dm font-bold text-white mb-2">General inquiries</h3>
                     <p className="text-white/60 font-normal text-sm mb-1">hello@teachteam.com</p>
                     <p className="text-white/60 font-normal text-sm">1-800-TEACH-TM</p>
                   </div>
                 </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
