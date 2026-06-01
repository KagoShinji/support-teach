
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { PartnerSection } from './components/sections/PartnerSection';
import { WhatWeDeliver } from './components/sections/WhatWeDeliver';
import { BundlePackages } from './components/sections/BundlePackages';
import { WhatMakesDifferent } from './components/sections/WhatMakesDifferent';
import { SocialProof } from './components/sections/SocialProof';
import { Testimonials } from './components/sections/Testimonials';
import { TeamSection } from './components/sections/TeamSection';
import { WhoWeSupport } from './components/sections/WhoWeSupport';
import { PoweredByEducators } from './components/sections/PoweredByEducators';
import { ContactForm } from './components/sections/ContactForm';
import { FinalCTA } from './components/sections/FinalCTA';
import { AlienPage } from './components/pages/AlienPage';
import { useEffect, useState } from 'react';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath !== '/') {
    return <AlienPage />;
  }

  return (
    <div className="min-h-screen bg-brand-light font-dm">
      <Navbar />
      <main>
        <Hero />
        <PartnerSection />
        <WhatWeDeliver />
        <BundlePackages />
        <WhatMakesDifferent />
        <SocialProof />
        <Testimonials />
        <TeamSection />
        <WhoWeSupport />
        <PoweredByEducators />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
