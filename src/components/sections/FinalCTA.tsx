import type { FC } from 'react';
import { Button } from '../ui/Button';

export const FinalCTA: FC = () => {
  return (
    <section className="relative py-32 lg:py-48 bg-brand-light">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl lg:text-7xl font-dm font-bold text-brand-indigo leading-[1.1] tracking-tight mb-10">
          Let's Build Better <br /> Learning, <span className="text-brand-coral italic">Together</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="primary" showIcon>Book a Call</Button>
          <Button variant="outline" className="h-[52px]">Request a Sample</Button>
        </div>
      </div>
    </section>
  );
};
