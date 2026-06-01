import type { FC } from 'react';
import { MARQUEE_TAGS } from '../../data/content';

export const PoweredByEducators: FC = () => {
  return (
    <section className="relative py-24 bg-brand-indigo overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative z-10">
        <h2 className="text-3xl font-dm font-bold text-white mb-6 tracking-tight">Powered by Educators</h2>
        <p className="text-white/70 text-lg font-normal leading-relaxed max-w-2xl mx-auto">
          A growing global network of subject matter experts — bringing real teaching experience to every project.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group mt-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-indigo to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-indigo to-transparent z-10"></div>
        
        <div className="py-8 animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused]">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, idx) => (
            <span key={idx} className="mx-6 text-5xl lg:text-7xl font-dm font-bold text-white/[0.05] uppercase tracking-wider transition-colors duration-300 hover:text-white/20 cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
