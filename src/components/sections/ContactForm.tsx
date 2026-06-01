import { useState } from 'react';
import type { FC } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Mail, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { brutalistSlideLeft, brutalistSlideRight, brutalistSpinIn } from '../../utils/animations';
import { StatusModal, type StatusType } from '../ui/StatusModal';

export const ContactForm: FC = () => {
  const [modalState, setModalState] = useState<{isOpen: boolean; status: StatusType}>({
    isOpen: false,
    status: 'idle'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState({ isOpen: true, status: 'loading' });
    
    // Simulate API call
    setTimeout(() => {
      setModalState({ isOpen: true, status: 'success' });
    }, 1500);
  };
  return (
    <section id="contact" className="relative py-24 lg:py-40 bg-[#FFD147] bg-polka-dots overflow-hidden border-b-2 border-black">
      
      {/* Decorative Geometric Shapes */}
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute top-20 left-10 text-white z-0 opacity-100 hidden lg:block"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] rotate-12">
          <polygon points="50,10 90,90 10,90" fill="currentColor" stroke="black" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute bottom-20 left-1/3 text-[#21C57D] z-0 opacity-100 hidden lg:block"
      >
        <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] -rotate-12">
          <circle cx="50" cy="50" r="40" fill="currentColor" stroke="black" strokeWidth="4" />
        </svg>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={brutalistSlideLeft}
          >
            <div className="bg-white p-8 lg:p-12 border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] -rotate-1">
              <div className="inline-block mb-6">
                <SectionLabel className="bg-[#FFD147] border-[2px] border-black text-black">Get In Touch</SectionLabel>
              </div>
              <h2 className="text-4xl lg:text-6xl font-dm font-black text-black leading-tight tracking-tight mb-6">
                Submit a Request
              </h2>
              <p className="text-gray-900 text-[18px] font-bold leading-relaxed mb-10 max-w-md">
                Tell us a bit about your project or content needs, and our team will get back to you with a tailored plan.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-black uppercase tracking-wider">Organization Name</label>
                  <input type="text" className="w-full bg-gray-50 border-[2px] border-black rounded-none px-4 py-3 text-black focus:outline-none focus:ring-0 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-1 focus:-translate-x-1 placeholder-gray-500 font-bold" placeholder="E.g. Global University" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-black uppercase tracking-wider">Service Needed</label>
                    <select className="w-full bg-gray-50 border-[2px] border-black rounded-none px-4 py-3 text-black focus:outline-none focus:ring-0 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-1 focus:-translate-x-1 appearance-none font-bold" defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option value="assessment">Assessment Development</option>
                      <option value="curriculum">Curriculum Structuring</option>
                      <option value="instructional">Instructional Materials</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[16px] font-bold text-black uppercase tracking-wider">Location</label>
                    <input type="text" className="w-full bg-gray-50 border-[2px] border-black rounded-none px-4 py-3 text-black focus:outline-none focus:ring-0 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-1 focus:-translate-x-1 placeholder-gray-500 font-bold" placeholder="City, Country" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[16px] font-bold text-black uppercase tracking-wider">Tell us about your project</label>
                  <textarea rows={4} className="w-full bg-gray-50 border-[2px] border-black rounded-none px-4 py-3 text-black focus:outline-none focus:ring-0 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-1 focus:-translate-x-1 resize-none placeholder-gray-500 font-bold" placeholder="What are you trying to achieve?"></textarea>
                </div>

                <div className="pt-6">
                   <Button type="submit" variant="primary" showIcon className="w-full sm:w-auto text-[18px] py-4 rounded-none shadow-[4px_4px_0px_rgba(0,0,0,1)] border-[2px] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0">Submit Request</Button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={brutalistSlideRight}
            className="relative flex items-center justify-center lg:justify-end z-20 mt-12 lg:mt-0"
          >
            <div className="w-full max-w-md relative group rotate-2">
              <Card className="w-full p-10 bg-white border-[3px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)]">
                 
                 <div className="relative z-10 flex flex-col gap-10">
                   <div>
                     <div className="h-20 w-20 rounded-none bg-[#21C57D] border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black mb-8 -rotate-3">
                       <MessageSquare className="w-10 h-10" strokeWidth={2.5} />
                     </div>
                     <h3 className="text-3xl font-dm font-black text-black mb-3">Prefer to talk directly?</h3>
                     <p className="text-gray-900 font-bold text-[17px]">Skip the form and jump straight on a call with our academic team.</p>
                     <Button variant="ghost" className="mt-6 px-0 hover:bg-transparent text-black group/link border-none shadow-none font-black underline underline-offset-8 decoration-[3px] decoration-black text-[18px]">
                       Book a Call 
                       <span className="ml-3 transition-transform group-hover/link:translate-x-2">→</span>
                     </Button>
                   </div>

                   <div className="h-[4px] w-full bg-black rounded-full my-2" />

                   <div>
                     <div className="h-20 w-20 rounded-none bg-[#FFD147] border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black mb-8 rotate-3">
                       <Mail className="w-10 h-10" strokeWidth={2.5} />
                     </div>
                     <h3 className="text-3xl font-dm font-black text-black mb-3">General inquiries</h3>
                     <p className="text-black font-black text-[18px] mb-1 hover:underline cursor-pointer">hello@teachteam.com</p>
                     <p className="text-black font-black text-[18px] hover:underline cursor-pointer">1-800-TEACH-TM</p>
                   </div>
                 </div>

              </Card>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Status Modal */}
      <StatusModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        status={modalState.status}
        title={modalState.status === 'success' ? "Request Submitted!" : "Submitting Request..."}
        message={modalState.status === 'success' ? "Thank you for reaching out! Our academic team will review your requirements and get back to you within 24 hours to schedule a deep dive." : "Please wait while we beam your request to our servers."}
        primaryAction={{ label: "Got it!", onClick: () => setModalState(prev => ({ ...prev, isOpen: false })) }}
      />
    </section>
  );
};
