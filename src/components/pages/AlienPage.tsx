import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { brutalistPop, brutalistSpinIn } from '../../utils/animations';

export const AlienPage = () => {
  return (
    <div className="min-h-screen bg-[#0C0A09] bg-polka-dots-dark flex flex-col items-center justify-center p-6 relative overflow-hidden font-dm selection:bg-[#21C57D] selection:text-black">
      
      {/* Decorative Star/Planet */}
      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        animate="show"
        className="absolute top-20 left-10 md:left-20 text-[#FFD147] opacity-80 rotate-12"
      >
        <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[6px_6px_0px_rgba(33,197,125,0.4)]">
          <circle cx="50" cy="50" r="40" fill="currentColor" stroke="#21C57D" strokeWidth="4" />
          <path d="M 10 50 Q 50 80 90 50" fill="none" stroke="#21C57D" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.div 
        variants={brutalistSpinIn}
        initial="hidden"
        animate="show"
        className="absolute bottom-20 right-10 md:right-32 text-[#21C57D] opacity-80 -rotate-12"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(255,209,71,0.4)]">
          <polygon points="50,10 90,90 10,90" fill="currentColor" stroke="#FFD147" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center">
        
        {/* Massive Alien Head Wrapper */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative mb-12"
        >
          <div className="absolute -inset-8 bg-[#21C57D] rounded-full blur-3xl opacity-20"></div>
          
          <div className="w-48 h-48 md:w-64 md:h-64 bg-[#21C57D] rounded-[45%] border-[6px] border-[#FFD147] shadow-[12px_12px_0px_rgba(255,209,71,1)] flex items-center justify-center relative overflow-hidden">
            {/* Alien Eyes */}
            <div className="absolute top-[40%] left-[20%] w-12 h-20 md:w-16 md:h-24 bg-[#0C0A09] rounded-[50%] rotate-[25deg] shadow-[inset_2px_2px_0px_rgba(255,255,255,0.2)]"></div>
            <div className="absolute top-[40%] right-[20%] w-12 h-20 md:w-16 md:h-24 bg-[#0C0A09] rounded-[50%] -rotate-[25deg] shadow-[inset_2px_2px_0px_rgba(255,255,255,0.2)]"></div>
            {/* Alien Mouth */}
            <div className="absolute bottom-[15%] w-6 h-2 md:w-8 md:h-2.5 bg-[#0C0A09] rounded-full opacity-80"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-block mb-6">
            <span className="bg-[#FFD147] text-black font-black text-xl md:text-2xl px-4 py-2 border-[2px] border-[#FFD147] uppercase tracking-widest shadow-[4px_4px_0px_rgba(33,197,125,1)]">
              Error 404
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-dm font-black text-white leading-tight mb-6">
            THIS PAGE WAS <br/> <span className="text-[#21C57D]">ABDUCTED</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl font-bold max-w-lg mx-auto leading-relaxed mb-10">
            The coordinates you requested have been beamed up by an unknown intelligence. Let's get you back to familiar space.
          </p>

          <Button 
            variant="primary" 
            showIcon 
            onClick={() => window.location.href = '/'}
            className="text-lg py-4 border-[#21C57D] shadow-[4px_4px_0px_rgba(255,209,71,1)] hover:shadow-[6px_6px_0px_rgba(255,209,71,1)]"
          >
            Return to Earth
          </Button>
        </motion.div>

      </div>
    </div>
  );
};
