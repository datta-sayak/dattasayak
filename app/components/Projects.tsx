import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/projects';

export function Projects() {
  return (
    <div className="relative">
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6 group transition-transform hover:translate-x-2">
            <div className="md:col-span-7">
              <div className="flex items-start gap-4 mb-3">
                <span className="text-lg font-mono text-white/70 font-bold">{project.number}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-heading text-white">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white transition-colors"
                          title="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-base text-white leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 md:border-l-3 md:border-white/10 md:pl-8">
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-sm text-white/70 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
