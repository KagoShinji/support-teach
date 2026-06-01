import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { StatusModal, type StatusType } from './StatusModal';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestModal = ({ isOpen, onClose }: RequestModalProps) => {
  const [status, setStatus] = useState<StatusType>('idle');
  const [error, setError] = useState<string | null>(null);
  const isLoading = status === 'loading';

  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    orgName: '',
    service: '',
    location: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      setStatus('success');
      // Reset form
      setFormData({
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        orgName: '',
        service: '',
        location: '',
        description: ''
      });
    } catch (err) {
      console.error('Error submitting inquiry to Firestore:', err);
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after a short delay so the close animation looks clean
    setTimeout(() => {
      setStatus('idle');
      setError(null);
    }, 300);
  };

  if (status !== 'idle') {
    return (
      <StatusModal 
        isOpen={isOpen} 
        onClose={handleClose}
        status={status}
        title={
          status === 'success' 
            ? "Request Submitted!" 
            : status === 'error'
            ? "Submission Failed"
            : "Submitting..."
        }
        message={
          status === 'success' 
            ? "Thank you for reaching out! Our academic team will review your requirements and get back to you within 24 hours to schedule a deep dive." 
            : status === 'error'
            ? "There was an error submitting your request. Please try again."
            : "Please wait while we beam your request to our servers."
        }
        primaryAction={{ label: "Got it!", onClick: handleClose }}
      />
    );
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Submit a Request"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-[#FF4747] text-black border-[2px] border-black p-3 font-bold text-[14px] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Contact Name</label>
            <input 
              type="text" 
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
              placeholder="Your Name" 
              required 
              disabled={isLoading}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
              placeholder="you@example.com" 
              required 
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Phone Number</label>
            <input 
              type="tel" 
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
              placeholder="+1 (555) 000-0000" 
              required 
              disabled={isLoading}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Organization Name</label>
            <input 
              type="text" 
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
              placeholder="E.g. Global University" 
              required 
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Service Needed</label>
            <select 
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 appearance-none font-bold text-[14px]" 
              required
              disabled={isLoading}
            >
              <option value="" disabled>Select a service</option>
              <option value="assessment">Assessment Development</option>
              <option value="curriculum">Curriculum Structuring</option>
              <option value="instructional">Instructional Materials</option>
              <option value="other">Other / Custom Services</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase tracking-wider">Location</label>
            <input 
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 placeholder-gray-500 font-bold text-[14px]" 
              placeholder="City, Country" 
              required 
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[12px] font-black text-black uppercase tracking-wider">Tell us about your project</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3} 
            className="w-full bg-gray-50 border-[2px] border-black rounded-none px-3 py-2 text-black focus:outline-none focus:ring-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform focus:-translate-y-0.5 focus:-translate-x-0.5 resize-none placeholder-gray-500 font-bold text-[14px]" 
            placeholder="What are you trying to achieve?" 
            required
            disabled={isLoading}
          ></textarea>
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            variant="primary" 
            showIcon 
            className="w-full text-[15px] py-3 rounded-none shadow-[3px_3px_0px_rgba(0,0,0,1)] border-[2px] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
