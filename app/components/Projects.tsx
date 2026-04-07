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
                <span className="pt-0.5 text-xs font-semibold tracking-[0.08em] text-[#8d98a8]">{project.number}</span>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-lg leading-tight text-black group-hover:text-[#13253b]">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      {project.github.trim() && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7a889d] transition-colors hover:text-[#23344b]"
                          title="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo.trim() && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7a889d] transition-colors hover:text-[#23344b]"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-light text-[#44566e] sm:text-sm">
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
