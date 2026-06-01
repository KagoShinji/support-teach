import type { FC } from 'react';
import { Button } from '../ui/Button';

export const FinalCTA: FC = () => {
  return (
    <section className="relative py-32 lg:py-48 bg-[#21C57D] border-b-2 border-black overflow-hidden">
      
      {/* Decorative Star */}
      <div className="absolute top-10 right-20 text-[#FFD147] -z-0 opacity-100 rotate-12 hidden lg:block">
        <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <path d="M50 0 L55 35 L90 20 L65 50 L90 80 L55 65 L50 100 L45 65 L10 80 L35 50 L10 20 L45 35 Z" fill="currentColor" stroke="black" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl lg:text-7xl font-dm font-bold text-black leading-[1.1] tracking-tight mb-10">
          Let's Build Better <br /> Learning, <span className="italic">Together</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="secondary" showIcon>Book a Call</Button>
          <Button variant="outline" className="h-[52px]">Request a Sample</Button>
        </div>
      </div>
    </section>
  );
};
