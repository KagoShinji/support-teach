import { useEffect, useState } from 'react';
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
import { SplashScreen } from './components/ui/SplashScreen';

import { AdminLogin } from './components/pages/AdminLogin';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { CallRoom } from './components/pages/CallRoom';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route Handling
  if (currentPath === '/admin') {
    return <AdminDashboard navigateTo={navigateTo} />;
  }

  if (currentPath === '/admin/login') {
    return <AdminLogin navigateTo={navigateTo} />;
  }



  if (currentPath.startsWith('/call/')) {
    const bookingId = currentPath.split('/call/')[1] || '';
    return <CallRoom bookingId={bookingId} navigateTo={navigateTo} />;
  }

  if (currentPath !== '/') {
    return <AlienPage />;
  }

  return (
    <div className="min-h-screen bg-brand-light font-dm">
      <SplashScreen />
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
