import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0C0A09] pt-32 pb-12 text-white relative overflow-hidden border-t-8 border-[#FFD147]">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <div className="h-10 w-10 bg-[#FFD147] border-[2px] border-[#FFD147] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] flex items-center justify-center -rotate-3 transition-transform group-hover:rotate-0 group-hover:scale-110">
                <BookOpen className="w-6 h-6 text-[#0C0A09]" strokeWidth={2.5} />
              </div>
              <span className="font-dm text-3xl font-black tracking-tight text-white ml-1">Support<span className="text-[#21C57D]">Teach</span></span>
            </div>
            <p className="text-gray-300 text-[15px] leading-relaxed max-w-xs font-medium">
              High-quality assessments and academic content — built by real educators, ready to deploy.
            </p>
          </div>

          <div>
            <div className="inline-block mb-6">
              <h4 className="font-dm text-[18px] font-black uppercase tracking-wider text-black bg-[#FFD147] px-3 py-1 border-[1.5px] border-[#FFD147]">Services</h4>
            </div>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Assessment Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Curriculum Structuring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Instructional Materials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Content Production</a></li>
            </ul>
          </div>

          <div>
            <div className="inline-block mb-6">
              <h4 className="font-dm text-[18px] font-black uppercase tracking-wider text-black bg-[#21C57D] px-3 py-1 border-[1.5px] border-[#21C57D]">Company</h4>
            </div>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Educator Network</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="inline-block mb-6">
              <h4 className="font-dm text-[18px] font-black uppercase tracking-wider text-black bg-white px-3 py-1 border-[1.5px] border-white">Legal</h4>
            </div>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-bold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t-[3px] border-[#FFD147] flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <p className="text-[#FFD147] font-bold text-[16px] uppercase tracking-wider">
            © {new Date().getFullYear()} TeachTeam. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-white font-bold text-[16px]">
            <span className="uppercase tracking-wider">Created by:</span>
            <a
              href="https://www.facebook.com/profile.php?id=61587269647950"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#21C57D] text-black px-4 py-1.5 border-[2px] border-black shadow-[4px_4px_0px_rgba(255,209,71,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(255,209,71,1)] transition-all uppercase tracking-wider"
            >
              Odyssey
            </a>
            <span className="text-[#FFD147] mx-2 font-black text-xl">•</span>
            <a
              href="https://odysseyph.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFD147] underline underline-offset-4 decoration-2 transition-all uppercase tracking-wider"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
