import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full pt-8 pb-4">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <span className="font-dm text-2xl font-bold tracking-tight text-black">TeachTeam</span>
        </div>
        
        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-[15px] font-semibold text-black/80 hover:text-black transition-colors">Services</a>
          <a href="#bundles" className="text-[15px] font-semibold text-gray-500 hover:text-black transition-colors">Bundles</a>
          <a href="#about" className="text-[15px] font-semibold text-gray-500 hover:text-black transition-colors">About</a>
          <a href="#partners" className="text-[15px] font-semibold text-gray-500 hover:text-black transition-colors">Partners</a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-[15px] font-semibold text-black hover:text-black/80 transition-colors">
            Book a Call
          </button>
          <button className="bg-[#21C57D] text-black text-[15px] font-semibold px-6 py-2 rounded-full border-[1.5px] border-black shadow-[2px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all">
            Submit Request
          </button>
        </div>

        {/* Mobile toggle */}
        <button 
          className="md:hidden relative h-10 w-10 ml-auto focus:outline-none flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`h-0.5 w-6 bg-black transition-transform duration-200 ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-black transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-0.5 w-6 bg-black transition-transform duration-200 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex h-full flex-col items-center justify-center gap-8 pt-20">
          <a href="#services" className="text-3xl font-dm font-bold text-black" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#bundles" className="text-3xl font-dm font-bold text-black" onClick={() => setIsOpen(false)}>Bundles</a>
          <a href="#about" className="text-3xl font-dm font-bold text-black" onClick={() => setIsOpen(false)}>About</a>
          <a href="#partners" className="text-3xl font-dm font-bold text-black" onClick={() => setIsOpen(false)}>Partners</a>
          
          <div className="mt-8 flex flex-col items-center gap-6">
            <button className="text-xl font-semibold text-black">
              Book a Call
            </button>
            <button className="bg-[#21C57D] text-black text-xl font-bold px-8 py-3 rounded-full border-2 border-black shadow-[3px_4px_0px_0px_rgba(0,0,0,1)]">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
