import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestModal = ({ isOpen, onClose }: RequestModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after a short delay so the close animation looks clean
    setTimeout(() => setIsSubmitted(false), 300);
  };

  if (isSubmitted) {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
        title="Request Submitted!"
        primaryAction={{ label: "Got it!", onClick: handleClose }}
      >
        <p>
          Thank you for reaching out! Our academic team will review your requirements and get back to you within 24 hours to schedule a deep dive.
        </p>
      </Modal>
    );
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Submit a Request"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-[14px] font-bold text-black uppercase tracking-wider">Organization Name</label>
          <input type="text" className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[15px]" placeholder="E.g. Global University" required />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-black uppercase tracking-wider">Service Needed</label>
            <select className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 appearance-none font-bold text-[15px]" defaultValue="" required>
              <option value="" disabled>Select a service</option>
              <option value="assessment">Assessment Development</option>
              <option value="curriculum">Curriculum Structuring</option>
              <option value="instructional">Instructional Materials</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[14px] font-bold text-black uppercase tracking-wider">Location</label>
            <input type="text" className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[15px]" placeholder="City, Country" required />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[14px] font-bold text-black uppercase tracking-wider">Tell us about your project</label>
          <textarea rows={3} className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2.5 text-black focus:outline-none focus:ring-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 resize-none placeholder-gray-500 font-bold text-[15px]" placeholder="What are you trying to achieve?" required></textarea>
        </div>

        <div className="pt-4">
           <Button type="submit" variant="primary" showIcon className="w-full text-[16px] py-3 rounded-none shadow-[4px_4px_0px_rgba(0,0,0,1)] border-[2px] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0">Submit Request</Button>
        </div>
      </form>
    </Modal>
  );
};
