import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, X } from 'lucide-react';
import { Button } from './Button';

export type StatusType = 'success' | 'error' | 'loading' | 'idle';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: StatusType;
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const StatusModal = ({
  isOpen,
  onClose,
  status,
  title,
  message,
  primaryAction
}: StatusModalProps) => {
  
  // Prevent scrolling
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

  if (status === 'idle') return null;

  const config = {
    success: {
      color: 'bg-[#21C57D]',
      icon: <CheckCircle className="w-12 h-12 text-black" strokeWidth={2.5} />,
      rotation: 'rotate-2'
    },
    error: {
      color: 'bg-[#FF4747]',
      icon: <XCircle className="w-12 h-12 text-black" strokeWidth={2.5} />,
      rotation: '-rotate-2'
    },
    loading: {
      color: 'bg-[#FFD147]',
      icon: <Loader2 className="w-12 h-12 text-black animate-spin" strokeWidth={2.5} />,
      rotation: 'rotate-0'
    }
  };

  const currentConfig = config[status];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={status !== 'loading' ? onClose : undefined}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.8, y: 50, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, y: 50, opacity: 0, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative w-full max-w-sm bg-white border-[3px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] z-10 flex flex-col items-center text-center p-8`}
          >
            {/* Close Button (if not loading) */}
            {status !== 'loading' && (
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white border-[2px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-transform focus:outline-none z-20"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-black" strokeWidth={3} />
              </button>
            )}

            {/* Icon Wrapper */}
            <div className={`w-24 h-24 rounded-none ${currentConfig.color} border-[3px] border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6 ${currentConfig.rotation}`}>
              {currentConfig.icon}
            </div>

            <h2 className="text-2xl font-dm font-black text-black leading-tight mb-4">
              {title}
            </h2>
            
            <p className="text-gray-900 font-bold text-[16px] leading-relaxed mb-8">
              {message}
            </p>

            {status !== 'loading' && primaryAction && (
              <Button 
                variant="primary" 
                onClick={primaryAction.onClick}
                className="w-full text-[16px]"
              >
                {primaryAction.label}
              </Button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
