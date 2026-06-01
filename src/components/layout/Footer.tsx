export const Footer = () => {
  return (
    <footer className="bg-[#0C0A09] pt-32 pb-12 text-white relative overflow-hidden border-t-8 border-[#FFD147]">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-dm text-2xl font-bold tracking-tight text-[#FFD147]">TeachTeam</span>
            </div>
            <p className="text-gray-300 text-[15px] leading-relaxed max-w-xs font-medium">
              High-quality assessments and academic content — built by real educators, ready to deploy.
            </p>
          </div>
          
          <div>
            <h4 className="font-dm text-[15px] font-bold uppercase tracking-[0.1em] text-[#FFD147] mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Assessment Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Curriculum Structuring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Instructional Materials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Content Production</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-dm text-[15px] font-bold uppercase tracking-[0.1em] text-[#FFD147] mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Educator Network</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-dm text-[15px] font-bold uppercase tracking-[0.1em] text-[#FFD147] mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white font-semibold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-32 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 font-medium text-[15px]">© {new Date().getFullYear()} TeachTeam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
