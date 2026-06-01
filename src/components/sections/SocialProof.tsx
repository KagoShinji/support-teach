import { STATS } from '../../data/content';

export const SocialProof = () => {
  return (
    <section className="relative py-24 bg-brand-light border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="text-4xl lg:text-5xl font-dm font-bold text-brand-indigo mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
