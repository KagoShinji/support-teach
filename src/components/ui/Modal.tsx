import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction
}: ModalProps) => {

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, y: 40, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, y: 40, opacity: 0, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative w-full max-w-lg bg-white border-[3px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-[3px] border-black bg-[#FFD147]">
              <h2 className="text-2xl font-dm font-black text-black leading-none">
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white border-[2px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-transform focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-black" strokeWidth={3} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto text-black font-medium text-[16px] leading-relaxed">
              {children}
            </div>

            {/* Footer */}
            {(primaryAction || secondaryAction) && (
              <div className="p-6 border-t-[3px] border-black bg-gray-50 flex flex-col sm:flex-row justify-end gap-4 mt-auto">
                {secondaryAction && (
                  <Button 
                    variant="outline" 
                    onClick={secondaryAction.onClick}
                    className="w-full sm:w-auto justify-center"
                  >
                    {secondaryAction.label}
                  </Button>
                )}
                {primaryAction && (
                  <Button 
                    variant="primary" 
                    onClick={primaryAction.onClick}
                    className="w-full sm:w-auto justify-center"
                  >
                    {primaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
