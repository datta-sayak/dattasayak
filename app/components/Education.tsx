import { education } from '@/data/education';

export function Education() {
  return (
    <div className="relative">
      <div className="space-y-12">
        {education.map((edu, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5">
              <div className="flex items-start gap-4 mb-3">
                <span className="text-lg font-mono text-white/70 font-bold">{edu.number}</span>
                <div>
                  <h3 className="text-2xl font-heading text-white mb-2">{edu.degree}</h3>
                  <p className="text-base text-white/70">{edu.institution}</p>
                  <p className="text-sm font-mono text-white/70 mt-2">{edu.duration}</p>
                  <p className="text-sm text-white/70 mt-1">GPA: {edu.gpa}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 md:border-l md:border-white/10 md:pl-8">
              <h4 className="text-sm font-mono text-white/70 mb-3 uppercase">Coursework</h4>
              <div className="flex flex-wrap gap-3">
                {edu.coursework.map((course, i) => (
                  <span key={i} className="text-sm text-white/70 font-mono">
                    {course}
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
