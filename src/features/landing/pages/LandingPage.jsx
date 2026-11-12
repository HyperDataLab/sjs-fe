/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\pages\LandingPage.jsx
 */
import Header from '../components/Header';
import Hero from '../components/Hero';
import Sandbox from '../components/Sandbox';
import Features from '../components/Features';
import HowToUse from '../components/HowToUse';
import FooterCTA from '../components/FooterCTA';
import Footer from '../components/Footer';
import useScrollReveal from '../../../shared/hooks/useScrollReveal';


import MuiBox from '@mui/material/Box';


export default function LandingPage() {
  useScrollReveal('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale');

  return (
    <MuiBox component="div" sx={{ minHeight: "100vh", overflowX: "hidden" }}  style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* Sticky Header */}
      <Header />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Try Now Sandbox Section */}
        <Sandbox />

        {/* Why use ResearchPulse Section */}
        <Features />

        {/* How to use Section */}
        <HowToUse />

        {/* Bottom Call to Action Section */}
        <FooterCTA />
      </main>

      {/* Footer */}
      <Footer />
    </MuiBox>
  );
}
