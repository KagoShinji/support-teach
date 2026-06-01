import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // List of heavy assets to wait for
    const imageUrls = [
      '/hero-image.png',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    ];

    let loadedCount = 0;

    const finishLoading = () => {
      setProgress(100);
      // Wait a tiny bit for the 100% animation to finish visually before hiding the splash screen
      setTimeout(() => setIsVisible(false), 500);
    };

    if (imageUrls.length === 0) {
      finishLoading();
    } else {
      imageUrls.forEach(url => {
        const img = new Image();
        const handleLoad = () => {
          loadedCount++;
          setProgress((loadedCount / imageUrls.length) * 100);
          if (loadedCount === imageUrls.length) finishLoading();
        };
        // We trigger handleLoad on both success and error so the user doesn't get stuck forever
        img.onload = handleLoad;
        img.onerror = handleLoad;
        img.src = url;
      });
    }

    // Failsafe: if the network is extremely slow or an image hangs, force finish after 8 seconds
    const failsafe = setTimeout(finishLoading, 8000);

    // Prevent scrolling while splash screen is visible
    document.body.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(failsafe);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[#FFD147] bg-polka-dots flex flex-col items-center justify-center overflow-hidden border-b-8 border-black"
        >
          
          {/* Animated decorative shapes */}
          <motion.div 
            initial={{ rotate: -45, scale: 0 }}
            animate={{ rotate: 12, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="absolute top-20 right-20 text-[#21C57D] hidden md:block"
          >
            <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <polygon points="50,10 90,90 10,90" fill="currentColor" stroke="black" strokeWidth="4" />
            </svg>
          </motion.div>

          <motion.div 
            initial={{ rotate: 45, scale: 0, x: -100 }}
            animate={{ rotate: -15, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
            className="absolute bottom-32 left-20 text-white hidden md:block"
          >
            <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <circle cx="50" cy="50" r="40" fill="currentColor" stroke="black" strokeWidth="4" />
            </svg>
          </motion.div>

          {/* Central Logo Container */}
          <div className="relative z-10 flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 50, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-24 w-24 md:h-32 md:w-32 bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-8"
            >
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-black" strokeWidth={3} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center"
            >
              <span className="font-dm text-5xl md:text-7xl font-black tracking-tight text-black">
                Teach<span className="text-[#21C57D] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Team</span>
              </span>
            </motion.div>

            {/* Brutalist Progress Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-[280px] md:w-[400px] h-8 bg-white border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mt-12 p-1 overflow-hidden relative"
            >
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`h-full bg-[#21C57D] ${progress > 0 ? 'border-r-[3px] border-black' : ''}`}
              />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 font-dm font-bold text-black uppercase tracking-widest text-[14px]"
            >
              {progress < 100 ? `Loading Assets (${Math.round(progress)}%)...` : 'Curriculum Ready!'}
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
