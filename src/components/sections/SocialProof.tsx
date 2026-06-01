import { STATS } from '../../data/content';
import { Card } from '../ui/Card';

export const SocialProof = () => {
  return (
    <section className="relative py-24 bg-white bg-diagonal-stripes border-b-2 border-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, idx) => {
            const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'];
            const rotationClass = rotations[idx % rotations.length];
            return (
              <div key={idx} className={`h-full transition-transform hover:scale-110 ${rotationClass}`}>
                <Card className="flex flex-col items-center text-center p-8 bg-white h-full justify-center">
                  <div className="text-5xl lg:text-6xl font-dm font-extrabold text-black mb-3 drop-shadow-[2px_2px_0px_rgba(33,197,125,1)]">{stat.value}</div>
                  <div className="text-[13px] font-bold text-gray-800 uppercase tracking-[0.1em]">{stat.label}</div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
