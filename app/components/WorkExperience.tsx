import { experiences } from '@/data/experience';

export function WorkExperience() {
  return (
    <div className="relative">
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <div className="flex items-start gap-4 mb-3">
                <span className="text-lg font-mono text-white/70 font-bold">{exp.number}</span>
                <div>
                  <h3 className="text-2xl font-heading text-white mb-1">{exp.position}</h3>
                  <p className="text-base text-white">{exp.company}</p>
                  <p className="text-sm text-white/70 mt-1">{exp.location}</p>
                  <p className="text-sm font-mono text-white/70 mt-2">{exp.duration}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 md:border-l-3 md:border-white/10 md:pl-8">
              <ul className="space-y-3">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-base text-white leading-relaxed">
                    • {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
