import React from 'react';
import { ArrowUp, Rocket } from 'lucide-react';
import { personalInfo } from '../data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 hairline-t bg-space-950/80 backdrop-blur-md font-mono text-xs text-space-muted">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Brand info */}
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-full bg-cyan-accent/10 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent">
            <Rocket className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-space-text font-bold tracking-tight">
              {personalInfo.name.toUpperCase()}
            </span>
            <span className="text-space-muted font-normal block text-[11px]">
              Computer Science @ Institute of Space Technology (IST), Islamabad
            </span>
          </div>
        </div>

        {/* Center System Status */}
        <div className="flex items-center space-x-2 text-[11px] px-4 py-1.5 rounded-full bg-space-900 border border-white/5">
          <span className="w-2 h-2 rounded-full bg-lime-accent animate-pulse" />
          <span>ORBITAL FIELD: 100% NOMINAL</span>
        </div>

        {/* Right Back to Top Button */}
        <div className="flex items-center space-x-4">
          <span className="text-[11px]">© {new Date().getFullYear()} Hisham Imran.</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="p-2.5 rounded-full border border-space-border bg-space-850 hover:border-cyan-accent text-space-text hover:text-cyan-accent transition-all group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
