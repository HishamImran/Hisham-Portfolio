import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Rocket } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-space-950/80 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-10 border-cyan-accent/30 z-10 my-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between pb-6 mb-6 border-b border-space-border">
            <div>
              <span className="font-mono text-xs text-lime-accent uppercase tracking-widest font-bold">
                CASE STUDY // {project.category}
              </span>
              <h3 id="modal-title" className="font-display text-3xl sm:text-4xl font-bold text-space-text mt-1">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-cyan-accent mt-2 font-medium">
                Role: {project.role}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close case study modal"
              className="p-2.5 rounded-full border border-space-border hover:border-cyan-accent text-space-muted hover:text-cyan-accent transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Metric Banner */}
          <div className="p-4 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent font-mono text-xs font-semibold flex items-center space-x-3 mb-8">
            <Rocket className="w-4 h-4 shrink-0 text-lime-accent" />
            <span>Impact Metric: {project.metrics}</span>
          </div>

          {/* Content Sections: Problem -> Approach -> Result */}
          <div className="space-y-8 font-body">
            {/* 1. Problem Statement */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-amber-solar font-bold flex items-center space-x-2">
                <span>01. THE PROBLEM</span>
              </h4>
              <p className="text-space-text text-base leading-relaxed bg-space-900/50 p-4 rounded-xl border border-white/5">
                {project.problem}
              </p>
            </div>

            {/* 2. Technical Approach */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-accent font-bold flex items-center space-x-2">
                <span>02. THE TECHNICAL APPROACH</span>
              </h4>
              <p className="text-space-text text-base leading-relaxed bg-space-900/50 p-4 rounded-xl border border-white/5">
                {project.approach}
              </p>
            </div>

            {/* 3. Measured Result */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-lime-accent font-bold flex items-center space-x-2">
                <span>03. THE MEASURED RESULT</span>
              </h4>
              <p className="text-space-text text-base leading-relaxed bg-space-900/50 p-4 rounded-xl border border-white/5">
                {project.result}
              </p>
            </div>

            {/* Architecture Highlights */}
            {project.architectureHighlights && (
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-space-muted font-bold flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-cyan-accent" />
                  <span>ARCHITECTURE HIGHLIGHTS</span>
                </h4>
                <ul className="space-y-2 font-mono text-xs">
                  {project.architectureHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-space-text">
                      <CheckCircle2 className="w-4 h-4 text-lime-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Tags */}
            <div className="pt-4 border-t border-space-border">
              <span className="font-mono text-xs text-space-muted block mb-3">Technologies Deployed:</span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-space-850 border border-cyan-accent/30 text-cyan-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Link Buttons */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-space-border">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-space-850 border border-cyan-accent/50 text-cyan-accent font-mono text-xs font-semibold hover:bg-cyan-accent hover:text-space-950 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-lime-accent text-space-950 font-mono text-xs font-bold hover:bg-cyan-accent transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production System</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
