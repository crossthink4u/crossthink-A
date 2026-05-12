import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import AIMatching from '../components/AIMatching';
import DashboardPreview from '../components/DashboardPreview';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen antialiased selection:bg-blue-500/30 selection:text-blue-900 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-100">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <AIMatching />
        <DashboardPreview />
        <StatsSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
