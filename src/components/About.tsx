import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/content';
import { Stat } from '../types';

const AnimatedCounter: React.FC<{ stat: Stat }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  const formattedValue = Math.floor(count);

  return (
    <div ref={ref} className="glass-panel p-6 rounded-2xl hairline-all relative overflow-hidden group hover:border-cyan-accent/50 transition-all duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-accent/5 rounded-full blur-2xl group-hover:bg-cyan-accent/15 transition-colors" />

      <div className="font-display font-bold text-4xl sm:text-5xl text-space-text tracking-tight flex items-baseline space-x-1">
        <span>{stat.prefix}</span>
        <span className="text-cyan-accent">{formattedValue}</span>
        <span className="text-lime-accent">{stat.suffix}</span>
      </div>

      <div className="font-mono text-sm font-semibold text-space-text mt-3">
        {stat.label}
      </div>

      <div className="font-mono text-xs text-space-muted mt-1 leading-relaxed">
        {stat.description}
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 hairline-t hairline-b">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Oversized Number */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
          <div>
            <span className="font-mono text-xs text-cyan-accent tracking-widest uppercase font-bold">
              01 // MISSION OVERVIEW
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-space-text mt-2 tracking-tight">
              About & Background
            </h2>
          </div>
          <p className="font-mono text-xs text-space-muted mt-4 md:mt-0">
            [ LOC: IST ISLAMABAD • CAMPUS CODE: 44000 ]
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl text-space-text leading-relaxed font-normal">
              {personalInfo.fullBio}
            </p>
            <div className="p-4 rounded-xl bg-space-900/80 border border-cyan-accent/20 font-mono text-xs text-space-muted flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-accent animate-pulse" />
              <span>Developing web applications, algorithm visualizers, and software tools at IST Islamabad.</span>
            </div>
          </div>

          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border-cyan-accent/20 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-accent font-bold">
              Academic Snapshot
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-space-border">
                <span className="text-space-muted">University:</span>
                <span className="text-space-text font-medium">IST Islamabad</span>
              </div>
              <div className="flex justify-between py-2 border-b border-space-border">
                <span className="text-space-muted">Major:</span>
                <span className="text-space-text font-medium">BS Computer Science</span>
              </div>
              <div className="flex justify-between py-2 border-b border-space-border">
                <span className="text-space-muted">Focus Areas:</span>
                <span className="text-lime-accent font-semibold">Software & Full-Stack Web</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-space-muted">Degree Status:</span>
                <span className="text-amber-solar font-semibold">In Progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Stat Counters (No CGPA, no fake data) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {personalInfo.stats.map((stat, index) => (
            <AnimatedCounter key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
