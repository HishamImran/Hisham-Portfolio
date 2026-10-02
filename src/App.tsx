import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SelectedWork } from './components/SelectedWork';
import { Timeline } from './components/Timeline';
import { SkillsConstellation } from './components/SkillsConstellation';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';

export const AppContent: React.FC = () => {
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-cyan-accent/30 selection:text-cyan-accent bg-space-950">
      <SEOHead />
      <CustomCursor />
      <BackgroundCanvas />

      {/* Film Grain & Vignette cinematic overlays */}
      <div className="film-grain" />
      <div className="vignette-overlay" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <SelectedWork highlightedProjectId={highlightedProjectId} />
          <Timeline />
          <SkillsConstellation onHoverSkillProject={setHighlightedProjectId} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
