import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { BundlePackage } from '../../types';

interface BundleLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: BundlePackage | null;
}

export const BundleLeadModal = ({ isOpen, onClose, bundle }: BundleLeadModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orgName: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundle) return;
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'bundle_orders'), {
        ...formData,
        bundleId: bundle.id,
        bundleTitle: bundle.title,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        orgName: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting bundle order:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setError(null);
    }, 300);
  };

  if (isSubmitted) {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
        title="Details Received!"
        primaryAction={{ label: "Got it!", onClick: handleClose }}
      >
        <div className="text-center space-y-4">
          <p className="font-bold text-gray-900 leading-relaxed text-[16px]">
            Thank you for your interest in the <span className="underline decoration-[#21C57D] decoration-[3px] font-black">{bundle?.title}</span> package!
          </p>
          <p className="text-gray-700 text-[15px] font-medium leading-relaxed">
            Our academic advisors will contact you shortly via email to outline the next steps and customize the package to your organization's exact needs.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={`Get Started: ${bundle?.title || ''}`}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-[#FF4747] text-black border-[2px] border-black p-3 font-bold text-[14px] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[12px] font-black text-black uppercase tracking-wider">Your Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
            placeholder="Contact Name" 
            required 
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
              placeholder="name@organization.com" 
              required 
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
              placeholder="+1 (555) 000-0000" 
              required 
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[12px] font-black text-black uppercase tracking-wider">Organization Name</label>
          <input 
            type="text" 
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
            placeholder="E.g. Global College" 
            required 
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[12px] font-black text-black uppercase tracking-wider">Additional Requirements / Notes</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3} 
            className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 resize-none placeholder-gray-500 font-bold text-[14px]" 
            placeholder="Any specific timeline, scope, or learning outcomes to highlight?" 
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full text-[15px] py-3 rounded-none shadow-[3px_3px_0px_rgba(0,0,0,1)] border-[2px] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending Request...' : 'Confirm & Request Setup'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
