import React, { useState, useEffect } from 'react';
import { featuredProjects, secondaryProjects } from '../data/content';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface SelectedWorkProps {
  highlightedProjectId?: string | null;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ highlightedProjectId }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/HishamImran/repos?type=all')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        
        // Filter out projects that are already featured or manually added to avoid duplication
        const excludeNames = [
          ...featuredProjects.map(p => p.githubUrl.split('/').pop()?.toLowerCase()),
          ...secondaryProjects.map(p => p.githubUrl.split('/').pop()?.toLowerCase())
        ].filter(Boolean);
        
        const mapped = data
          .filter((repo: any) => {
            const repoName = repo.name.toLowerCase();
            if (excludeNames.includes(repoName)) return false;
            if (repoName.includes('suparco')) return false; // Explicitly prevent duplicate suparco repos
            return true;
          })
          .map((repo: any) => ({
            id: repo.id.toString(),
            title: repo.name,
            oneLiner: repo.description || "GitHub Repository",
            role: "Contributor / Collaborator",
            featured: false,
            category: repo.language || "Open Source",
            tags: repo.topics || [],
            githubUrl: repo.html_url,
            metrics: repo.stargazers_count ? `${repo.stargazers_count} Stars` : "Code Repository",
            problem: "Open source contribution or collaboration.",
            approach: "Available on GitHub.",
            result: "See repository for details.",
            architectureHighlights: []
        }));
        setGithubProjects(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  const allSecondary = [...secondaryProjects, ...githubProjects];

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
          <div>
            <span className="font-mono text-xs text-lime-accent tracking-widest uppercase font-bold">
              02 // PROJECTS & CODE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-space-text mt-2 tracking-tight">
              Featured Work
            </h2>
          </div>
          <p className="font-mono text-xs text-space-muted mt-4 md:mt-0">
            [ CLICK ANY CARD FOR PROJECT DETAILS ]
          </p>
        </div>

        {/* Featured Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
              isHighlighted={highlightedProjectId === project.id}
            />
          ))}
        </div>

        {/* Secondary Projects Grid (rendered only if secondary projects exist) */}
        {allSecondary.length > 0 && (
          <>
            <div className="pt-12 border-t border-space-border mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-solar" />
                <h3 className="font-display text-2xl font-bold text-space-text">
                  More Projects
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allSecondary.map(proj => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`glass-panel rounded-2xl p-6 cursor-pointer border transition-all duration-300 hover:border-cyan-accent ${
                    highlightedProjectId === proj.id
                      ? 'border-cyan-accent ring-2 ring-cyan-accent/50'
                      : 'border-white/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-mono text-cyan-accent font-medium">
                      {proj.category}
                    </span>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-space-muted hover:text-cyan-accent"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                  <h4 className="font-display text-lg font-bold text-space-text hover:text-cyan-accent transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-space-muted text-xs mt-2 line-clamp-2 leading-relaxed">
                    {proj.oneLiner}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-space-border font-mono text-[11px]">
                    <span className="text-lime-accent">{proj.metrics}</span>
                    <span className="text-cyan-accent flex items-center space-x-1">
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
