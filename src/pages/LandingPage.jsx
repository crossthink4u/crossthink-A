import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import WhatIsCrossThink from '../components/landing/WhatIsCrossThink';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturesSection from '../components/landing/FeaturesSection';
import DashboardPreview from '../components/landing/DashboardPreview';
import WhyDifferent from '../components/landing/WhyDifferent';
import AIShowcase from '../components/landing/AIShowcase';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar />
      <main>
        <HeroSection />
        <WhatIsCrossThink />
        <HowItWorks />
        <FeaturesSection />
        <DashboardPreview />
        <WhyDifferent />
        <AIShowcase />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
