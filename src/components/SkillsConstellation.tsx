import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/content';
import { Cpu, Terminal, Code2, Wrench, Sparkles, Layers } from 'lucide-react';

interface SkillsConstellationProps {
  onHoverSkillProject: (projectId: string | null) => void;
}

export const SkillsConstellation: React.FC<SkillsConstellationProps> = ({ onHoverSkillProject }) => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const categoryIcons: Record<string, React.ReactNode> = {
    'Languages & Core': <Code2 className="w-5 h-5 text-cyan-accent" />,
    'AI, ML & Math': <Cpu className="w-5 h-5 text-lime-accent" />,
    'Frameworks & Web': <Terminal className="w-5 h-5 text-amber-solar" />,
    'Tools & Infrastructure': <Wrench className="w-5 h-5 text-cyan-accent" />,
  };

  const handleMouseEnter = (skillName: string, projectIds: string[]) => {
    setActiveSkill(skillName);
    if (projectIds.length > 0) {
      onHoverSkillProject(projectIds[0]); // highlight primary matching project card
    }
  };

  const handleMouseLeave = () => {
    setActiveSkill(null);
    onHoverSkillProject(null);
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
          <div>
            <span className="font-mono text-xs text-cyan-accent tracking-widest uppercase font-bold">
              04 // TECHNICAL CONSTELLATION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-space-text mt-2 tracking-tight">
              Skills & Tech Stack
            </h2>
          </div>
          <p className="font-mono text-xs text-space-muted mt-4 md:mt-0">
            [ HOVER ANY SKILL TO HIGHLIGHT ASSOCIATED CASE STUDIES ]
          </p>
        </div>

        {/* Skills Grouped Clusters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-panel rounded-3xl p-8 border-cyan-accent/20 hover:border-cyan-accent/40 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 pb-4 mb-6 border-b border-space-border">
                {categoryIcons[category.title] || <Layers className="w-5 h-5 text-cyan-accent" />}
                <h3 className="font-display text-xl font-bold text-space-text">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => {
                  const isHovered = activeSkill === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() => handleMouseEnter(skill.name, skill.projectIds)}
                      onMouseLeave={handleMouseLeave}
                      className={`group relative px-4 py-2.5 rounded-2xl font-mono text-xs font-medium transition-all duration-300 border flex items-center space-x-2 ${
                        isHovered
                          ? 'bg-cyan-accent text-space-950 border-cyan-accent scale-105 shadow-lg shadow-cyan-accent/30 font-bold'
                          : 'bg-space-900/80 border-space-border text-space-text hover:border-cyan-accent/60 hover:text-cyan-accent'
                      }`}
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${isHovered ? 'text-space-950' : 'text-lime-accent'}`} />
                      <span>{skill.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isHovered ? 'bg-space-950/20 text-space-950 font-bold' : 'bg-space-850 text-space-muted'
                      }`}>
                        {skill.level}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
