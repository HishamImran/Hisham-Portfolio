import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Download, Menu, X, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/content';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'timeline', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, activeSection, setSectionOrbit } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section scrollspy logic
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setSectionOrbit(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setSectionOrbit]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between w-full max-w-5xl ${
          scrolled ? 'glass-pill shadow-2xl border-cyan-accent/20' : 'bg-space-900/60 backdrop-blur-md border border-white/5'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand / Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 font-display font-bold text-sm tracking-tight text-space-text hover:text-cyan-accent transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center group-hover:border-cyan-accent transition-all">
            <Rocket className="w-4 h-4 text-cyan-accent group-hover:rotate-12 transition-transform" />
          </div>
          <span className="hidden sm:inline font-mono">
            {personalInfo.name.toUpperCase()} <span className="text-cyan-accent font-bold">.IST</span>
          </span>
        </button>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex items-center space-x-1 font-mono text-xs">
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-accent font-semibold'
                      : 'text-space-muted hover:text-space-text hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-cyan-accent/10 border border-cyan-accent/40"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action Controls: Theme Toggle & Resume CTA */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Light and Dark Mode"
            className="p-2 rounded-full border border-space-border bg-space-850/80 hover:border-cyan-accent text-space-text hover:text-cyan-accent transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-solar" /> : <Moon className="w-4 h-4 text-cyan-accent" />}
          </button>



          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-space-border text-space-text"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-accent" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pointer-events-auto fixed top-20 left-4 right-4 glass-panel rounded-2xl p-6 md:hidden z-40 border-cyan-accent/30"
          >
            <div className="flex flex-col space-y-4 font-mono text-sm">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-2.5 rounded-xl border ${
                    activeSection === item.id
                      ? 'border-cyan-accent bg-cyan-accent/10 text-cyan-accent font-semibold'
                      : 'border-white/5 text-space-muted hover:text-space-text'
                  }`}
                >
                  {item.label}
                </button>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
