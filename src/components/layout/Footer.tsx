export const Footer = () => {
  return (
    <footer className="bg-brand-indigo pt-32 pb-12 text-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 rounded-full bg-brand-coral" />
              <span className="font-dm text-xl font-bold tracking-tight">TeachTeam</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              High-quality assessments and academic content — built by real educators, ready to deploy.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Assessment Development</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Curriculum Structuring</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Instructional Materials</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Content Production</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Educator Network</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} TeachTeam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
