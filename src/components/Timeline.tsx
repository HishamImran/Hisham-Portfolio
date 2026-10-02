import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '../data/content';
import { GraduationCap, Award, Briefcase, Microscope, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Timeline: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-5 h-5 text-cyan-accent" />;
      case 'Research':
        return <Microscope className="w-5 h-5 text-lime-accent" />;
      case 'Achievement':
        return <Award className="w-5 h-5 text-amber-solar" />;
      default:
        return <Briefcase className="w-5 h-5 text-cyan-accent" />;
    }
  };

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 hairline-t hairline-b">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
          <div>
            <span className="font-mono text-xs text-amber-solar tracking-widest uppercase font-bold">
              03 // ACADEMIC & PROFESSIONAL HISTORY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-space-text mt-2 tracking-tight">
              Trajectory & Milestones
            </h2>
          </div>
          <p className="font-mono text-xs text-space-muted mt-4 md:mt-0">
            [ CHRONOLOGICAL LOGS • 2022 TO PRESENT ]
          </p>
        </div>

        {/* Vertical Timeline Spine */}
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-accent before:via-lime-accent before:to-amber-solar">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-9 sm:-left-11 top-1.5 w-6 h-6 rounded-full bg-space-950 border-2 border-cyan-accent flex items-center justify-center shadow-lg shadow-cyan-accent/20">
                <div className="w-2 h-2 rounded-full bg-lime-accent animate-pulse" />
              </div>

              {/* Timeline Card */}
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border-cyan-accent/20 hover:border-cyan-accent/50 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono bg-space-850 border border-white/10 text-space-text">
                    {getIcon(item.type)}
                    <span>{item.type}</span>
                  </span>

                  {item.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-lime-accent/10 border border-lime-accent/40 text-lime-accent">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-space-text mt-2">
                  {item.title}
                </h3>

                <div className="font-mono text-xs text-cyan-accent font-medium mt-1 flex flex-wrap items-center gap-4">
                  <span className="font-semibold">{item.organization}</span>
                  <span className="flex items-center space-x-1 text-space-muted">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-amber-solar">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </span>
                </div>

                <p className="text-space-muted text-sm sm:text-base mt-4 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Bullet Highlights */}
                <div className="mt-4 pt-4 border-t border-space-border space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2.5 font-mono text-xs text-space-text">
                      <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
