import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/content';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % personalInfo.roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const nameWords = personalInfo.name.split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Kinetic Name & Value Statement */}
        <div className="lg:col-span-7 flex flex-col space-y-6 z-10 text-left">
          {/* Institution Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full glass-panel border-cyan-accent/30 self-start"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-accent"></span>
            </span>
            <span className="font-mono text-xs text-space-text tracking-wide font-medium">
              Computer Science @ IST Islamabad
            </span>
          </motion.div>

          {/* Large Kinetic Typography Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight text-space-text leading-none select-none flex flex-wrap gap-x-4 sm:gap-x-6"
          >
            {nameWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-flex">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    className="inline-block transition-colors duration-200 hover:text-cyan-accent hover:-translate-y-2 transform"
                    whileHover={{ scale: 1.15, rotate: (charIndex % 2 === 0 ? 3 : -3) }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Dynamic Rotating Role Badge */}
          <div className="h-10 flex items-center">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 font-mono text-base sm:text-lg font-semibold text-lime-accent"
            >
              <Terminal className="w-5 h-5 text-cyan-accent" />
              <span>{personalInfo.roles[roleIndex]}</span>
            </motion.div>
          </div>

          {/* Concise Value Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-space-muted text-base sm:text-lg leading-relaxed max-w-xl font-normal"
          >
            {personalInfo.oneSentenceBio}
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={scrollToWork}
              className="group relative inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-cyan-accent text-space-950 font-mono font-bold text-sm hover:bg-lime-accent transition-all duration-300 shadow-lg shadow-cyan-accent/20 hover:shadow-lime-accent/30 hover:scale-105 active:scale-95"
            >
              <span>View Work</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </button>

          </motion.div>

          {/* Micro Telemetry Tags */}
          <div className="pt-6 flex items-center space-x-6 text-xs font-mono text-space-muted/80">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-lime-accent" />
              <span>Open for Technical Roles</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-solar" />
              <span>Islamabad, PK</span>
            </span>
          </div>
        </div>

        {/* Right Column: Hexagon Profile Picture Frame with Rotating Gradient */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group"
          >
            {/* Outer Conic Gradient Glow Ring */}
            <div className="absolute -inset-1.5 rounded-[2.5rem] bg-conic-accent opacity-75 blur-xl group-hover:opacity-100 animate-orbit-spin transition-opacity" />

            {/* Profile Frame Container */}
            <div className="relative w-full h-full rounded-[2.5rem] bg-space-900 border-2 border-cyan-accent/40 overflow-hidden p-2 shadow-2xl glass-panel">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-space-950 flex items-center justify-center">
                {!imgError ? (
                  <img
                    src="https://unavatar.io/linkedin/hisham-imran-69aa053a4"
                    alt={`${personalInfo.name} - CS Student at IST Islamabad`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                ) : (
                  // Distinctive High-Tech Fallback Vector Avatar
                  <div className="w-full h-full bg-gradient-to-br from-space-900 via-space-850 to-space-950 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-cyan-accent/60 bg-cyan-accent/10 flex items-center justify-center mb-4">
                      <span className="font-display font-bold text-4xl text-cyan-accent">HI</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-lime-accent tracking-widest uppercase">
                      HISHAM IMRAN
                    </span>
                    <span className="font-mono text-[11px] text-space-muted mt-1">
                      CS @ IST Islamabad
                    </span>
                  </div>
                )}

                {/* Overlaid Mission Control Corner Crosshairs */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-cyan-accent/60">
                  + IST.SAT-01
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[10px] text-lime-accent/60">
                  LAT: 33.7182° N
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
