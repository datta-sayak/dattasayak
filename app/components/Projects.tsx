import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/projects';

export function Projects() {
  const validProjects = projects.filter(
    (project) =>
      project.name.trim() ||
      project.description.trim() ||
      project.tech.length > 0 ||
      project.github.trim() ||
      project.demo.trim()
  );

  return (
    <div className="pb-10">
      <p className="section-kicker">Projects</p>

      <div className="space-y-11">
        {validProjects.map((project, index) => (
          <div key={index} className="group grid grid-cols-1 gap-6">
            <div>
              <div className="flex items-start gap-3">
                <span className="pt-0.5 text-xs font-semibold text-black opacity-40">{project.number}</span>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-lg text-black">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      {project.github.trim() && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="GitHub"
                        >
                          <Github className="w-4 h-4 opacity-60 transition-colors hover:opacity-100" />
                        </a>
                      )}
                      {project.demo.trim() && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4 opacity-60 transition-colors hover:opacity-100" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-light text-black/60 sm:text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
