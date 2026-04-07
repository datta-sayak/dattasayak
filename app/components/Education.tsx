import { education } from '@/data/education';

export function Education() {
  const validEducation = education.filter(
    (edu) =>
      edu.degree.trim() ||
      edu.institution.trim() ||
      edu.duration.trim() ||
      edu.gpa.trim() ||
      edu.coursework.length > 0
  );

  return (
    <div className="pb-10">
      <p className="section-kicker">Education</p>

      <div className="space-y-11">
        {validEducation.map((edu, index) => (
          <div key={index} className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex items-start gap-3">
                <span className="pt-0.5 text-xs text-black opacity-40">{edu.number}</span>
                <div>
                  <h3 className="text-lg leading-tight text-black">{edu.degree}</h3>
                  <p className="mt-1 text-sm text-black/60">{edu.institution}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-black/60">{edu.duration}</p>
                  <p className="mt-1 text-xs text-black/60">GPA: {edu.gpa}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
