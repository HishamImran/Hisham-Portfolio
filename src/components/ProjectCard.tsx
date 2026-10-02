import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Rocket, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  isHighlighted?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, isHighlighted }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y, opacity: 1 });

    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = (y - centerY) / 25;
    const rY = -(x - centerX) / 25;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setSpotlightPos(prev => ({ ...prev, opacity: 0 }));
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`group relative glass-panel rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-300 ${
        isHighlighted
          ? 'border-cyan-accent ring-2 ring-cyan-accent/50 shadow-2xl scale-[1.02]'
          : 'border-cyan-accent/20 hover:border-cyan-accent/60'
      }`}
    >
      {/* Dynamic Cursor-Following Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 240, 255, 0.12), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
            <Layers className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </span>

          <div className="w-10 h-10 rounded-full border border-space-border group-hover:border-cyan-accent bg-space-850 flex items-center justify-center text-space-muted group-hover:text-cyan-accent group-hover:rotate-45 transition-all">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Project Title & One-Liner */}
        <div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-space-text group-hover:text-cyan-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-space-muted text-sm sm:text-base mt-2 font-normal leading-relaxed">
            {project.oneLiner}
          </p>
        </div>

        {/* Role & Key Metric */}
        <div className="p-3.5 rounded-xl bg-space-900/80 border border-white/5 font-mono text-xs text-space-muted flex flex-col space-y-1">
          <span className="text-space-text font-medium flex items-center space-x-2">
            <Rocket className="w-3.5 h-3.5 text-lime-accent" />
            <span>{project.role}</span>
          </span>
          <span className="text-cyan-accent font-semibold">{project.metrics}</span>
        </div>

        {/* Tech Tags & GitHub Link */}
        <div className="flex items-center justify-between pt-2 border-t border-space-border">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map(t => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-space-900 text-space-muted border border-space-border"
              >
                {t}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-cyan-accent">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="p-2 text-space-muted hover:text-cyan-accent transition-colors"
            title="View Code on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
